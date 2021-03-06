import {useRouter} from 'next/router'
import Link from 'next/link';
import nookies from "nookies";
import Axios from "axios";
import {API} from "../../redux/constants/backend";
import {PayPalButton} from "react-paypal-button-v2";
import {orderModifyAction} from "../../redux/actions/orderActions";
import {useDispatch, useSelector} from "react-redux";

const paypalClientID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
const TMR = 3700


export default function OrderScreen({order}) {
    const dispatch = useDispatch();
    const router = useRouter();
    const orderId = router.query.id;
    const priceUSD = parseFloat(((Number(order.totalPrice) / TMR) * 1.05).toFixed(2))
    console.log(order)

    const orderDelete = useSelector((state) => state.orderDelete);
    const { loading, error, success } = orderDelete;

    return (


        <section>

            <h1>Orden </h1>
            <p>código {orderId}</p>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Envío</h2>
                                <p>
                                    <strong>Nombre:</strong> {order.shippingAddress.fullName} <br/>
                                    <strong>Dirección: </strong> {order.shippingAddress.address},
                                    {order.shippingAddress.city},{' '}
                                    {order.shippingAddress.postalCode},
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? (
                                    <h1>
                                        Entregado el {order.deliveredAt}
                                    </h1>
                                ) : (
                                    <h1>No entregado</h1>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Pago</h2>
                                <p>
                                    <strong>Método:</strong> {order.paymentMethod}
                                </p>
                                {order.isPaid ? (
                                    <h1>
                                        Pagado el {order.paidAt}
                                    </h1>
                                ) : (
                                    <h1>No pagado</h1>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Artículos pedidos</h2>
                                <ul>
                                    {order.orderItems.map((item) => (
                                        <li key={item.product}>
                                            <div className="row">
                                                <div>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="small"
                                                    />
                                                </div>
                                                <div className="min-30">
                                                    <Link href={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </div>

                                                <div>
                                                    {item.qty} x ${Number(item.price).toLocaleString('es-CO')} =
                                                    ${(item.qty * item.price)
                                                    .toLocaleString('es-CO')}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Resumen de Orden</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Artículos</div>
                                    <div>${order.itemsPrice.toLocaleString('es-CO')}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Envío</div>
                                    <div>${order.shippingPrice.toLocaleString('es-CO')}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Impuestos</div>
                                    <div>${order.taxPrice.toLocaleString('es-CO')}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        <strong> Precio Total</strong>
                                    </div>
                                    <div>
                                        <strong>${Number.parseInt(order.totalPrice).toLocaleString('es-CO')}</strong>
                                    </div>
                                </div>
                            </li>

                            {order.paymentMethod === 'paypal' ?
                                (<li>
                                    <div className="row">
                                        <div>
                                            <strong> Precio En dolares </strong>
                                        </div>
                                        <div>
                                            <strong>${priceUSD.toLocaleString('en-US')}</strong>
                                        </div>
                                    </div>
                                </li>)

                                : ''
                            }
                        </ul>
                    </div>
                    {/*<p>El precio en dolares utiza un TMR de {TMR.toLocaleString('es-CO')} + 5% </p>*/}

                </div>
            </div>
            {order.paymentMethod === 'paypal' && order.isPaid === false ? <div className="card card-body">
                <PayPalButton
                    amount={priceUSD}
                    onSuccess={(details, data) => {
                        alert("Transaction completed by " + details.payer.name.given_name);
                        dispatch(orderModifyAction(order._id, 1, details));
                        console.log(details)
                        console.log(data)

                    }}
                    options={{
                        clientId: paypalClientID
                    }}

                />
            </div> :
                ''}

        </section>

    );
}

export async function getServerSideProps(context) {
    try {
        const cookies = nookies.get(context);
        console.log(JSON.stringify(cookies, null, 2));

        const {id} = context.params;

        const {data} = await Axios.get(`${API}/orders/${id}`, {
            headers: {Authorization: `Bearer ${cookies.token}`},
        });

        return {
            props: {
                order: data
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
