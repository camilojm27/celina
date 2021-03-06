import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FiSettings } from 'react-icons/fi';
import { BsClipboard } from 'react-icons/bs'
import { RiSpyLine } from 'react-icons/ri'
import axios from 'axios';
import localidades1 from '../public/localidades1.json'
import {useDispatch, useSelector} from "react-redux";
import { orderListMineAction,} from "../redux/actions/orderActions";
import {useRouter} from "next/router";
import {useAuth} from "../firebase/authHooks";
import nookies from "nookies";
import Axios from "axios";
import {API} from "../redux/constants/backend";
import styles from "./styles/Profile.module.css"

const Profile = () => {
    //const router = useRouter();
    //const memuID = router.query.id;
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    };
    const { user } = useAuth();


    const dispatch = useDispatch();

    const orderList = useSelector((state) => state.orderListMine);
    const { loading, error, orders } = orderList;

    useEffect(() => {
        if (user == null) {
            router.push('/');
        }
        dispatch(orderListMineAction());
    }, [dispatch, router, user]);

    function deleteAccount(e) {

       if (confirm('¿Quieres eliminar la cuenta?')) {
           console.log('Deleted')

       } else{
           console.log('canceled')

       }
        e.preventDefault()
    }

    function changePromotion() {
        console.log('Changed')

    }

    const onSubmit = data => console.log(data);
    // const [localidades1, setData] = useState([]);
    //
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await axios(
    //             'https://servicios.interrapidisimo.com/ApiServInter/api/Parametros/ObtenerLocalidadesColombia',
    //         );
    //
    //         setData(result.data);
    //     };
    //
    //     fetchData().then();
    // }, []);


    return (
        <section className='ProfileSection'>
            <aside className='ProfileMenu'>

                <ul>
                    <li className={toggleState === 1 ? 'steps-active' : '' } onClick={() => toggleTab(1)}>
                        <FiSettings size='30' />
                        <p>Ajustes de cuenta</p>
                    </li>
                    <li className={toggleState === 2 ? 'steps-active' : '' } onClick={() => toggleTab(2)}>
                        <BsClipboard size='30' />
                        <p>Pedidos</p>
                    </li>
                    <li className={toggleState === 3 ? 'steps-active' : '' } onClick={() => toggleTab(3)}>
                        <RiSpyLine size='30' />
                        <p>Privacidad</p>
                    </li>
                </ul>

            </aside>
            <section className='ProfileOptions'>
                <div className={toggleState === 1 ? "admin-content  active-content-active" : "admin-content"}>
                    <h2>Información de cuenta</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className='PForm'>
                        <fieldset>
                            <label htmlFor='name'> Nombre Completo
                            </label>
                            <input type="text" id='name'  {...register("name", {
                                required: true,
                                maxLength: 80
                            })} />
                        </fieldset>
                        <fieldset>
                            <label htmlFor='email'> Correo
                            </label>
                            <input type="email" id='email'  {...register("Email", {
                                required: true,
                                pattern: /^\S+@\S+$/i
                            })} />

                        </fieldset>
                        <fieldset>
                            <label htmlFor="tel">Celular</label>
                            <input type="tel" id='tel'  {...register("Mobile number", {
                                required: true,
                                minLength: 6,
                                maxLength: 12
                            })} />

                        </fieldset>

                        <fieldset>
                            <label htmlFor='name'> Dirección
                            </label>
                            <input type="text" id='name'  {...register("name", {
                                required: true,
                                maxLength: 80
                            })} />
                        </fieldset>
                        <fieldset>
                            <label htmlFor='name'> Codigo Postal
                            </label>
                            <input type="text" id='postalcode' {...register("name", {
                                required: true,
                                maxLength: 80
                            })} />
                        </fieldset>
                        <fieldset className="PForm-city">
                            <label htmlFor="">Ciudad</label>
                            <select name="" id="">
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
                        </fieldset>


                        <button className="button-action" type='submit'>Guardar Cambios</button>
                    </form>
                </div>
                <div className={toggleState === 2 ? "admin-content  active-content-active" : "admin-content"}>
                    <h2>Ordenes</h2>
                    <div>
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


                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                <div className={toggleState === 3 ? "admin-content  active-content-active" : "admin-content"}>
                    <h2>Ajustes de privacidad</h2>
                    <form  className='PForm PForm-delete'>

                        <fieldset>
                            <label htmlFor="cbox1">Deseo recibir promociones</label>
                            <input onChange={() => changePromotion()} type="checkbox" id="cbox1" value="first_checkbox"/>

                        </fieldset>
                        <button onClick={(e) => deleteAccount(e)}  className="button-action danger-color" type='submit'>Eliminar Cuenta</button>

                    </form>
                </div>

            </section>


        </section>
    )

}

// export async function getServerSideProps(context) {
//     try {
//         const cookies = nookies.get(context);
//
//
//         const {data} = await Axios.get(`${API}/orders/`, {
//                 headers: {Authorization: `Bearer ${cookies.token}`}
//             }
//         )
//
//         return {
//             props: {
//                 orders: data,
//
//             }, // will be passed to the page component as props
//         }
//     } catch (err) {
//         // either the `token` cookie didn't exist
//         // or token verification failed
//         // either way: redirect to the login page
//         // either the `token` cookie didn't exist
//         // or token verification failed
//         // either way: redirect to the login page
//         return {
//             redirect: {
//                 permanent: false,
//                 destination: "/login?redirect=profile",
//             },
//             // `as never` is required for correct type inference
//             // by InferGetServerSidePropsType below
//             props: {},
//         };
//     }
//
// }

export default Profile
