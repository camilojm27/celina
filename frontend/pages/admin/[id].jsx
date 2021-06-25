import {useState} from 'react'
import {useForm} from "react-hook-form";
import Categories from "../categories/[id]";
import Persistence from "../../firebase/persistence";
import {AiOutlineHome} from 'react-icons/ai'
import {VscGraph} from 'react-icons/vsc'
import {GiClothes} from 'react-icons/gi'
import OrderListScreen from "../orders";
import {useAuth} from "../../firebase/authHooks";
import nookies from "nookies";
import Axios from "axios";
import {API} from "../../redux/constants/backend";


const persistence = new Persistence()


export default function Admin({orders, categories, products}) {

    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    };

    const { user } = useAuth();
    const {register, handleSubmit, reset} = useForm()



    const onSubmit = async (data) => {

        console.log((data))
        let {name, description, category, colors, stock, images, price} = data
        stock = stock.toString().split(',').map(x => Number.parseInt(x))
        colors = colors.toString().split(',')
        console.info(name, description, category, colors, stock, images, price)
        await persistence.uploadProduct(name, description, category, colors, stock, images, price)
            .then(() => {
                reset()
            })

    }


    return (
        <section className="admin">
            <section className="glass">
                <aside className="dashboard">
                    {
                        user ? (  <div className="user">
                            <img src={user.photoURL} alt=""/>
                            <h3>{user.displayName.toUpperCase()}</h3>
                            <p>Administrador 😎</p>
                        </div> ) :
                            ''
                    }

                    <div className="links">
                        <button
                            className="admin-tabs"
                            onClick={() => toggleTab(1)}
                        >

                            <AiOutlineHome/> Inicio
                        </button>
                        <button  className="admin-tabs"
                                 onClick={() => toggleTab(2)}>
                            <VscGraph/> Ordenes
                        </button>
                        <button  className="admin-tabs"
                                 onClick={() => toggleTab(3)}>
                            <GiClothes/> Productos
                        </button>

                    </div>
                    {/*<div className="pro">*/}
                    {/*    <h2>Join pro for free games.</h2>*/}
                    {/*</div>*/}
                </aside>
                <div className={toggleState === 1 ? "admin-content  active-content-active" : "admin-content"}>
                    <div className="status">
                        <h1>En construcción</h1>
                    </div>
                </div>
                <div className={toggleState === 2 ? "admin-content  active-content-active" : "admin-content"}>
                    <OrderListScreen orders={orders}/>
                </div>
                <div className={toggleState === 3 ? "admin-content  active-content-active" : "admin-content"}>
                        <Categories products={products} categories={categories} fatherURL="admin"/>

                </div>
            </section>
            <div className="modal" id="modal">
                <div className="modal-content">
                                <span className="close"
                                      onClick={() => document.getElementById('modal').style.display = 'none'}>&times;</span>
                    <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <h2>Nuevo Producto</h2>
                        </div>

                        <div>
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre"
                                required
                                ref={register}
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Descripción</label>
                            <textarea className="description"
                                      name="description"
                                      placeholder="Ingrese la Descripción"
                                      required maxLength={1000}
                                      ref={register}

                            />
                        </div>
                        <div>
                            <label htmlFor="category">Categoría</label>
                            <input
                                type="text"
                                name="category"
                                placeholder="category"
                                ref={register}

                            />
                        </div>
                        <div>
                            <label htmlFor="description">Colores - Talla</label>
                            <small>Por favor separar por comas , </small>
                            <textarea
                                name="colors"
                                placeholder="Ingrese la Descripción"
                                required maxLength={500}
                                ref={register}

                            />
                            <label htmlFor="description">Cantidad de los colores - talla</label>
                            <small>Por favor separar por comas , </small>
                            <textarea
                                name="stock"
                                placeholder="Ingrese la Descripción"
                                required maxLength={500}
                                ref={register}

                            />
                            <input
                                type="file"
                                accept="image/*"
                                name="images"
                                id="images"
                                placeholder="category"
                                multiple
                                ref={register}

                            />
                        </div>
                        <div>
                            <label htmlFor="price">Precio</label>
                            <input
                                type="number"
                                name="price"
                                placeholder="Precio"
                                ref={register}

                            />
                        </div>

                        <div>
                            <label/>
                            <button className="button-action" type="submit">
                                Ingresar
                            </button>
                        </div>

                    </form>
                </div>
            </div>
            <button id="add-item"
                    onClick={() => document.getElementById('modal').style.display = 'block'}>+
            </button>
            <div className="circle1"/>
            <div className="circle2"/>
        </section>
    )

}
export async function getServerSideProps(context) {
    try {
        const cookies = nookies.get(context);

        let categoriesRes = await Axios.get(
            `https://us-central1-celina-tienda.cloudfunctions.net/app/api/products/categories`
        );

        let product = await Axios.get(
            `https://us-central1-celina-tienda.cloudfunctions.net/app/api/products/`
        );

        const {data} = await Axios.get(`${API}/orders/`, {
                headers: {Authorization: `Bearer ${cookies.token}`}
            }
        )


        const categories = categoriesRes.data
        const products = product.data

        return {
            props: {
                orders: data,
                categories,
                products
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
                destination: "/login?redirect=admin/dashboard",
            },
            // `as never` is required for correct type inference
            // by InferGetServerSidePropsType below
            props: {},
        };
    }

}
