import React from 'react'
import {useForm} from "react-hook-form";
import Persistence from "../../../firebase/persistence";
import {GrUpdate} from 'react-icons/gr'
import {AiFillDelete} from 'react-icons/ai'
import axios from 'axios';
import Axios from 'axios';
import {API} from '../../../redux/constants/backend';
import {toast} from 'react-toastify';
import {useRouter} from "next/router";


const persistence = new Persistence()


function ProductEdit({product}) {
    const {register, handleSubmit} = useForm()
    const router = useRouter()

    async function onSubmit(data) {
        let {name, description, category, colors, stock, price} = data
        stock = stock.toString().split(',').map(x => Number.parseInt(x))
        colors = colors.toString().split(',')
        console.info(name, description, category, colors, stock, price)
        await persistence.updateProduct(product._id, name, description, category, colors, stock, price)
        router.push('/admin')
    }

    return (

        <section className="edit">
            <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
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

                <div className="row">
                    <button className="button-action danger-color" type="submit">
                        <GrUpdate/> Actualizar
                    </button>
                    <button className="button-action danger-color" type="button" onClick={() => {
                        axios.delete(`${API}/products/${product._id}`)
                            .then((data) => {
                                if (data.status === 200) {
                                    toast.success('Producto eliminado')
                                    router.push('/admin')

                                }
                            })
                            .catch(() => toast.error('Error eliminando el productos'))
                    }}>
                        <AiFillDelete/> Eliminar
                    </button>

                </div>

            </form>
        </section>
    )

}

export async function getServerSideProps(context) {
    const {id} = context.params;
    let product = await Axios.get(
        `${API}/products/${id}`
    );

    product = product.data

    return {
        props: {
            product
        }, // will be passed to the page component as props
    }

}

export default ProductEdit
