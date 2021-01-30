import React, {useEffect} from 'react'
import '../screens/styles/Admin.css'
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {detailsProduct} from "../actions/productActions";
import Persistence from "../firebase/persistence";
const persistence = new Persistence()


function ProductEdit (props) {
    const {register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const productID = props.match.params.id
    const {loading, error, product} = useSelector(state => state.productDetails)

    useEffect(() => {
        dispatch(detailsProduct(productID))
    }, [dispatch, productID])

    async function onSubmit(data) {
        let {name, description, category, colors, stock, price} = data
        stock = stock.toString().split(',').map(x => Number.parseInt(x))
        colors = colors.toString().split(',')
        console.info(name, description, category, colors, stock, price)
        await persistence.updateProduct(productID, name, description, category, colors, stock, price)
        props.history.push('/admin')
    }

    return(
        <>
            {
                loading ? <h1>Cargando</h1>
                    :
                    error ? <h1>{error}</h1>
                        :

                        <section className="edit">
                            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <h1>{`Edición de ${product.name}`}</h1>
                                </div>

                                <div>
                                    <label htmlFor="name">Nombre</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Nombre"
                                        required
                                        defaultValue={product.name}
                                        ref={register}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description">Descripción</label>
                                    <textarea className="description"
                                              name="description"
                                              placeholder="Ingrese la Descripción"
                                              required maxLength={1000}
                                              defaultValue={product.description}
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
                                        defaultValue={product.category}

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
                                        defaultValue={product.colors}

                                    />
                                    <label htmlFor="description">Cantidad de los colores - talla</label>
                                    <small>Por favor separar por comas , </small>
                                    <textarea
                                        name="stock"
                                        placeholder="Ingrese la Descripción"
                                        required maxLength={500}
                                        defaultValue={product.stock}
                                        ref={register}

                                    />
                                </div>
                                <div>
                                    <label htmlFor="price">Precio</label>
                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="Precio"
                                        defaultValue={product.price}
                                        ref={register}

                                    />
                                </div>

                                <div>
                                    <label/>
                                    <button className="button-action danger-color" type="submit" >
                                        Actualizar :D
                                    </button>
                                </div>

                            </form>
                        </section>

            }

        </>
    )
}

export default ProductEdit
