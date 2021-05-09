import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../components/styles/Product.css'
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";




export default function ProductsList(props) {

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    const productList = useSelector((state) => state.productList)
    const {loading, error, products} = productList

    let history = useHistory();
    function filtrarLista() {

    }
    return (
        <section className="products">
            {
                loading ? <h1>Cargando</h1>
                    :
                    error ? <h1>{error}</h1>
                        :
                        props.admin ?
                            (
                                Array.from(products).map(product =>
                                    <div className="product" key={product._id} onClick={() =>
                                        history.push(`/edit/${product._id}`)
                                    }>
                                        <img className="product-image" src={product.images[0]} alt=""/>
                                        <div className="product-detail">
                                            <h3>{product.name}</h3>
                                            <strong>{product.price}</strong>
                                        </div>


                                    </div>
                                )) :
                            (
                                Array.from(products).filter(function (product) {
                                    if (props.categoriesID){
                                        return  product.category === props.categoriesID
                                    }
                                    return product
                                }).map( product =>

                                    <div className="product" key={product._id}>
                                        <Link to={{
                                            pathname: `/product/${product._id}`,
                                        }}>
                                            <img className="product-image" src={product.images[0]} alt=""/>
                                            <div className="product-detail">
                                                <h3>{product.name}</h3>
                                                <strong>{product.price}</strong>
                                            </div>
                                        </Link>

                                    </div>
                                ))

            }


        </section>
    )
}
