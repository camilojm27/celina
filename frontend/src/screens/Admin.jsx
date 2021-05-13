import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useForm} from "react-hook-form";
import {listProducts} from '../actions/productActions';
import Categories from "./Categories";
import Persistence from "../firebase/persistence";
import './styles/Admin.css'
import {AiOutlineHome} from 'react-icons/ai'
import {VscGraph} from 'react-icons/vsc'
import {FiUsers} from 'react-icons/fi'
import {GiClothes} from 'react-icons/gi'


const persistence = new Persistence()


export default function Admin() {
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    };

    const userSigning = useSelector((state) => state.userSigning);
    const {userInfo} = userSigning;

    const {register, handleSubmit, reset} = useForm()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

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

    console.log(userSigning)

    return (
        <section className="admin">
            <section className="glass">
                <aside className="dashboard">
                    <div className="user">
                        <img src={userInfo.picture} alt=""/>
                        <h3>{userInfo.name.toUpperCase()}</h3>
                        <p>Administrador 😎</p>
                    </div>
                    <div className="links">
                        <button
                            className="admin-tabs"
                            onClick={() => toggleTab(1)}
                        >

                            <AiOutlineHome/> Inicio
                        </button>
                        <button  className="admin-tabs"
                                 onClick={() => toggleTab(2)}>
                            <VscGraph/> Reportes
                        </button>
                        <button  className="admin-tabs"
                                 onClick={() => toggleTab(3)}>
                            <GiClothes/> Productos
                        </button>
                        <button  className="admin-tabs"
                                 onClick={() => toggleTab(4)}>
                            <FiUsers/> Usuarios

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
                    <div className="status">
                        <h1>En construcción</h1>
                    </div>
                </div>
                <div className={toggleState === 3 ? "admin-content  active-content-active" : "admin-content"}>
                        <Categories fatherURL="admin"/>

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
