import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Link from 'next/link';
import CheckoutSteps from '../components/CheckoutSteps';
import {ORDER_CREATE_RESET} from "../redux/constants/orderConstants";
import {createOrderAction} from "../redux/actions/orderActions";
import { signOut } from '../redux/actions/userActions'
import { toast } from 'react-toastify';
import {useRouter} from "next/router";


export default function Placeorder(props) {
    const router = useRouter()
    const cart = useSelector((state) => state.cart);
    const obj = cart.shippingAddress
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
        router.push('/payment');
    }
    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;

    const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        dispatch(createOrderAction({ ...cart, orderItems: cart.cartItems }));
    };
    // TODO: Implementar el cambio de pantalla, cerrado de sesión
    useEffect(() => {
        if (success) {
            router.push(`/order/${order.orderId}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, props.history, success]);
    return (
        <section className="place-order">
            <aside>
                <img  src="https://firebasestorage.googleapis.com/v0/b/celina-tienda.appspot.com/o/assets%2Fdesktop%2Fplaceorder.jpg?alt=media&token=b61c0b42-2121-4f27-9e58-ae1deb1944ac"  alt=""/>
            </aside>
        <div>
            <CheckoutSteps step1 step2 step3 step4/>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Envió</h2>
                                <p>
                                    <strong>Nombre:</strong> {cart.shippingAddress.fullName} <br/>
                                    <strong>Dirección: </strong> {cart.shippingAddress.address}
                                    , {cart.shippingAddress.postalCode}
                                    , {cart.shippingAddress.city}
                                    , {cart.shippingAddress.state}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Pago</h2>
                                <p>
                                    <strong>Método:</strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Productos</h2>
                                <ul>
                                    {cart.cartItems.map((item) => (
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
                                                    {item.qty} x ${Number.parseInt(item.price).toLocaleString('es-CO') } = ${(item.qty * item.price).toLocaleString('es-CO')}
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
                                <h2>Resumen de Compra</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Productos</div>
                                    <div>${cart.itemsPrice.toLocaleString('es-CO')}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Envío</div>
                                    <div>${cart.shippingPrice.toLocaleString('es-CO')}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Impuestos</div>
                                    <div>${cart.taxPrice.toLocaleString('es-CO')}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        <strong>Total de la orden</strong>
                                    </div>
                                    <div>
                                        <strong>${cart.totalPrice.toLocaleString('es-CO')}</strong>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={placeOrderHandler}
                                    className="primary block"
                                >
                                    Crear orden
                                </button>
                            </li>
                                {loading && <h2>Cargando</h2>}
                                {error === 'auth/id-token-expired' &&
                                    dispatch(signOut())
                                    &&
                                    router.push('/login#placeorder')
                                    &&
                                    toast.warn('La sesión ha expido, debers iniciar sesion de nuevo')
                                }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </section>
    );
}