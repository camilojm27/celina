import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderModifyAction } from "../redux/actions/orderActions";
import { ORDER_DELETE_RESET } from "../redux/constants/orderConstants";
import nookies from "nookies";
import Axios from "axios";
import {API} from "../redux/constants/backend";


export default function OrderListScreen({orders}) {
    const dispatch = useDispatch();


    const orderDelete = useSelector((state) => state.orderDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = orderDelete;


    const modifyHandler = (order, action) => {
        if (typeof window !== 'undefined'){
            if (window.confirm(`Estas segur@ que quieres modificar la orden de ${order.shippingAddress.fullName}`)) {
                dispatch(orderModifyAction(order._id, action, {}));
            }
        }

    };
    useEffect(() => {
        dispatch({ type: ORDER_DELETE_RESET });

    }, [dispatch, successDelete]);

    return (
        <div>
            <h1>Orders</h1>
            {loadingDelete && <h1>Eliminando...</h1>}
            {errorDelete && <h1>{errorDelete}</h1>}

                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USUARIO</th>
                            <th>FECHA</th>
                            <th>TOTAL</th>
                            <th>PAGADO</th>
                            <th>ENTREGADO</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.shippingAddress.fullName}</td>
                                <td>{order.createdAt}</td>
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid ? order.paidAt : 'No'}</td>
                                <td>
                                    {order.isDelivered
                                        ? order.deliveredAt
                                        : 'No'}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="small"
                                    >
                                        <a href={`/order/${order._id}`} target="_blank" rel="noreferrer">Detalles</a>
                                    </button>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => modifyHandler(order, 0)}
                                    >
                                        Eliminar
                                </button>
                                    {
                                        !order.isPaid && <button
                                            type="button"
                                            className="small"
                                            onClick={() => modifyHandler(order, 1)}>
                                            Pagado
                                            </button>
                                    }
                                    {
                                        !order.isDelivered &&

                                        <button
                                        type="button"
                                        className="small"
                                        onClick={() => modifyHandler(order, 2)}>
                                        Entregado
                                        </button>
                                    }

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    );
}

export async function getServerSideProps(context) {
    try {
        const cookies = nookies.get(context);

        const {data} = await Axios.get(`${API}/orders/`, {
                headers: {Authorization: `Bearer ${cookies.token}`}
            }
        )

        return {
            props: {
                orders: data
            }, // will be passed to the page component as props
        }
    } catch (err) {
        // either the `token` cookie didn't exist
        // or token verification failed
        // either way: redirect to the login page
        // either the `token` cookie didn't exist
        // or token verification failed
        // either way: redirect to the login page
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
            // `as never` is required for correct type inference
            // by InferGetServerSidePropsType below
            props: {},
        };
    }

}
