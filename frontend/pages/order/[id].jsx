import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router'
import Link from 'next/link';
import {orderDetailsAction} from '../../redux/actions/orderActions';

// Todo: Fix null token error
export default function OrderScreen() {
    const router = useRouter();
    const orderId = router.query.id;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(orderDetailsAction(orderId));
    }, [dispatch, orderId]);

    const orderDetails = useSelector((state) => state.orderDetails);
    const {order, loading, error} = orderDetails;

    return (
        <>{
            loading ? <h1>Cargando</h1>
                :
                error ? <h1>{error}</h1>
                    :

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
                                                                {item.qty} x ${Number(item.price).toLocaleString('es-CO')} = ${(item.qty * item.price)
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
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
        }</>
    );
}
