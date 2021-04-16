import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {orderDetailsAction} from '../actions/orderActions';


export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    const orderDetails = useSelector((state) => state.orderDetails);
    const {order, loading, error} = orderDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(orderDetailsAction(orderId));
    }, [dispatch, orderId]);

    return (
        <>{
            loading ? <h1>Cargando</h1>
                :
                error ? <h1>{error}</h1>
                    :

                    <section>
                        
                        <h1>Order {order._id}</h1>
                        <div className="row top">
                            <div className="col-2">
                                <ul>
                                    <li>
                                        <div className="card card-body">
                                            <h2>Shipping</h2>
                                            <p>
                                                <strong>Name:</strong> {order.shippingAddress.fullName} <br/>
                                                <strong>Address: </strong> {order.shippingAddress.address},
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
                                                <strong>Metodo:</strong> {order.paymentMethod}
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
                                            <h2>Order Items</h2>
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
                                                                <Link to={`/product/${item.product}`}>
                                                                    {item.name}
                                                                </Link>
                                                            </div>

                                                            <div>
                                                                {item.qty} x ${item.price} = ${item.qty * item.price}
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
                                            <h2>Order Summary</h2>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>Items</div>
                                                <div>${order.itemsPrice.toFixed(2)}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>Shipping</div>
                                                <div>${order.shippingPrice.toFixed(2)}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>Tax</div>
                                                <div>${order.taxPrice.toFixed(2)}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>
                                                    <strong> Order Total</strong>
                                                </div>
                                                <div>
                                                    <strong>${order.totalPrice.toFixed(2)}</strong>
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