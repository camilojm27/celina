import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {savePaymentMethod} from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PaymentMethodScreen(props) {
    const cart = useSelector((state) => state.cart);
    const {shippingAddress} = cart;
    if (!shippingAddress.address) {
        props.history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    };
    return (
        <section className="shipping">

            <aside>
                <img  src="https://firebasestorage.googleapis.com/v0/b/celina-tienda.appspot.com/o/assets%2Fdesktop%2Fshipping-address.jpg?alt=media&token=9b9f9a34-81d8-4957-b3a4-2b8f959fbcea"  alt=""/>
            </aside>
        <div>
            <CheckoutSteps step1 step2 step3/>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Método de Pago</h1>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id="efectivo"
                            value="Efectivo"
                            name="paymentMethod"
                            required
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                            <label htmlFor="efectivo">Efectivo</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id="transferencia"
                                value="transferencia"
                            name="paymentMethod"
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="transferencia">Transferencia Bancaria / Nequi / Daviplata</label>
                    </div>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">
                        Continuar
                    </button>
                </div>
            </form>
        </div>
        </section>
    );
}
