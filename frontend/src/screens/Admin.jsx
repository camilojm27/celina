import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions';
import ProductsList from '../components/ProductsList';
import './styles/Admin.css'
import './styles/Register.css'

export default function Admin() {


    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList


    return (
        <>
            {loading ? <h1>Cargando</h1>
                : error ? <h1>{error}</h1>
                    : <>
                        <div className="modal" id="modal">
                            <div className="modal-content">
                                <span className="close" onClick={() => document.getElementById('modal').style.display = 'none'}>&times;</span>
                                <form className="register-form">
                                    <div>
                                        <h2>Nuevo Producto</h2>
                                    </div>

                                    <div>
                                        <label htmlFor="name">Nombre</label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Nombre"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="description">Descripción</label>
                                        <textarea className="description"
                                            id="description"
                                            placeholder="Ingrese la Descripción"
                                            required maxLength={1000}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="category">Categoría</label>
                                        <input
                                            type="text"
                                            id="category"
                                            placeholder="category"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="description">Colores - Talla</label>
                                        <small>Por favor separar por comas ,   </small>
                                        <textarea
                                                  id="description"
                                                  placeholder="Ingrese la Descripción"
                                                  required maxLength={500}
                                        />
                                        <label htmlFor="description">Cantidad de los colores - talla</label>
                                        <small>Por favor separar por comas ,   </small>
                                        <textarea
                                            id="description"
                                            placeholder="Ingrese la Descripción"
                                            required maxLength={500}
                                        />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="category"
                                            placeholder="category"
                                            multiple
                                        />
                                    </div>

                                    <div>
                                        <label />
                                        <button className="button-action" type="submit">
                                            Ingresar
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                        <button id="add-item" onClick={() => document.getElementById('modal').style.display = 'block'}>+</button>
                        <ProductsList products={products} />
                    </>
            }
        </>
    )
}
