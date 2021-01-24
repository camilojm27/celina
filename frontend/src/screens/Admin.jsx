import React, {useEffect, useReducer} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {listProducts} from '../actions/productActions';
import ProductsList from '../components/ProductsList';
import './styles/Admin.css'
import './styles/Register.css'
import Persistence from "../firebase/persistence";

const persistance = new Persistence()
const formReducer = (state, event) => {
    switch (event.name) {
        case  'images':
        return{
            ...state,
        }
        default:
            return {
                ...state,
                [event.name]: event.value
            }
    }

}


export default function Admin() {

    const [formData, setFormData] = useReducer(formReducer, {
        name: "",
        description: "",
        category: "",
        colors: [],
        stock: [],
        images: [],
        price: 0,
    })

    const handleChange = event => {
        console.log(event)
        if (event.target.name === 'images'){
            setFormData({
                name: event.target.name,
                value: event.target.files,
            });
        }
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }


    const handleSubmit = event => {
        event.preventDefault()
        console.log(formData)
        const {name, description, category, colors, stock, price} = formData
        let images = document.getElementById('images').getAttribute('files')
        console.log(images)
        //persistance.uploadProduct(name, description, category, colors.toString().split(','), stock.toString().split(',').map(x => Number.parseInt(x)), images, price)
    }
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    const productList = useSelector((state) => state.productList)
    const {loading, error, products} = productList


    return (
        <>
            {loading ? <h1>Cargando</h1>
                : error ? <h1>{error}</h1>
                    : <>
                        <div className="modal" id="modal">
                            <div className="modal-content">
                                <span className="close"
                                      onClick={() => document.getElementById('modal').style.display = 'none'}>&times;</span>
                                <form className="register-form" onSubmit={handleSubmit}>
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
                                            value={formData.name}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="description">Descripción</label>
                                        <textarea className="description"
                                                  name="description"
                                                  placeholder="Ingrese la Descripción"
                                                  required maxLength={1000}
                                                  value={formData.description}
                                                  onChange={(e) => handleChange(e)}

                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="category">Categoría</label>
                                        <input
                                            type="text"
                                            name="category"
                                            placeholder="category"
                                            value={formData.category}
                                            onChange={(e) => handleChange(e)}

                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="description">Colores - Talla</label>
                                        <small>Por favor separar por comas , </small>
                                        <textarea
                                            name="colors"
                                            placeholder="Ingrese la Descripción"
                                            required maxLength={500}
                                            value={formData.colors}
                                            onChange={(e) => handleChange(e)}

                                        />
                                        <label htmlFor="description">Cantidad de los colores - talla</label>
                                        <small>Por favor separar por comas , </small>
                                        <textarea
                                            name="stock"
                                            placeholder="Ingrese la Descripción"
                                            required maxLength={500}
                                            value={formData.stock}
                                            onChange={(e) => handleChange(e)}

                                        />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            name="images"
                                            id="images"
                                            placeholder="category"
                                            multiple
                                            value={formData.images}
                                            onChange={(e) => handleChange(e)}

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
                        <ProductsList products={products}/>
                    </>
            }
        </>
    )
}
