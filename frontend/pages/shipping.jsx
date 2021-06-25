import { useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {saveShippingAddress} from '../redux/actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import {useRouter} from "next/router";
import {useAuth} from "../firebase/authHooks";
import localidades1 from "../public/localidades1.json";

export default function Shipping() {
    const router = useRouter();
    const cart = useSelector((state) => state.cart);
    const {shippingAddress} = cart;

   // const { user } = useAuth();

    //  Todo: Recibir el usuario en cookies
    // useEffect(()=>{
    //     if (!user) {
    //         router.push('/login');
    //     }
    // })



    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveShippingAddress({fullName, address, city, postalCode})
        );
        router.push('/payment');
    };
    return (
        <section className="shipping">
            <aside>
                <img  src="https://firebasestorage.googleapis.com/v0/b/celina-tienda.appspot.com/o/assets%2Fdesktop%2Fshipping-address.jpg?alt=media&token=9b9f9a34-81d8-4957-b3a4-2b8f959fbcea"  alt=""/>
            </aside>
        <div>
            <CheckoutSteps step1 step2/>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Dirección de Envió</h1>
                    <p>Los campos con * asterisco indican que son obligatorios</p>
                </div>
                <div>
                    <label htmlFor="fullName">Nombre completo *</label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder="Enter full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div >
                    <label htmlFor="city">Ciudad \ Departamento</label>
                    <select name="city" id="city" onChange={(e) => setCity(e.target.value)}>
                        {(localidades1 && localidades1.length > 0) &&
                        localidades1.sort(function (a, b) {
                            if (a.Nombre > b.Nombre) {
                                return 1;
                            }
                            if (a.Nombre < b.Nombre) {
                                return -1;
                            }
                            // a must be equal to b
                            return 0;
                        }).map((item) => {
                            return (
                                <option key={item.IdLocalidad} value={item.IdLocalidad}>{(item.Nombre)}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="address">Dirección *</label>
                    <input
                        type="text"
                        id="address"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="postalCode">
                        <a href="https://codigo-postal.co/colombia/" target="_blank" rel="noreferrer">Código postal</a>
                    </label>
                    <input
                        type="number"
                        id="postalCode"
                        placeholder="Enter postal code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}

                    />
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
