import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {orderDeleteAction, orderListAction} from "../actions/orderActions";
import './styles/Orders.css'
import {ORDER_DELETE_RESET} from "../constants/orderConstants";
import {Link} from "react-router-dom";

//Todo: al eliminar refrescar la pagina

export default function OrderListScreen(props) {
    const dispatch = useDispatch();

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;
    const orderDelete = useSelector((state) => state.orderDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = orderDelete;


    const deleteHandler = (order) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(orderDeleteAction(order._id));
        }
    };
    useEffect(() => {
        dispatch({ type: ORDER_DELETE_RESET });
        dispatch(orderListAction());
    }, [dispatch, successDelete]);

    return (
        <div>
            <h1>Orders</h1>
            {loadingDelete && <h1>Eliminando...</h1>}
            {errorDelete && <h1>{errorDelete}</h1>}
            {loading ? (
                <h1>Cargando..</h1>
            ) : error ? (
                <h1>{error}</h1>
            ) : (
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
                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                            <td>
                                {order.isDelivered
                                    ? order.deliveredAt.substring(0, 10)
                                    : 'No'}
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="small"
                                >
                                    <Link to={`/order/${order._id}`}>Detalles</Link>
                                </button>
                                <button
                                    type="button"
                                    className="small"
                                    onClick={() => deleteHandler(order)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
