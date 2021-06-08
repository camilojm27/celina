import React, {useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";




export default function ProductsList(props) {
    const router = useRouter()
    const dispatch = useDispatch()

    
    const productList = useSelector((state) => state.productList)
    const {loading, error, products} = productList

    useEffect(() => {
        if (!productList.lenght > 0) {
            
            dispatch(listProducts())
        }
    }, [dispatch, productList.lenght])


    return (
        <section className="products">
            {
                loading ? <h1>Cargando</h1>
                    :
                    error ? <h1>{error}</h1>
                        :
                        props.admin ?
                            (
                                Array.from(products).filter(function (product) {
                                    if (props.categoriesID){
                                        return  product.category === props.categoriesID
                                    }
                                    return product
                                }).map(product =>
                                    <div className="product-admin" key={product._id} onClick={() =>
                                        router.push(`/edit/${product._id}`)
                                    }>
                                        <img className="product-image-small" src={product.images[0]} alt=""/>
                                        <div className="product-detail">
                                            <h3>{product.name}</h3>
                                            <strong>{Number.parseInt(product.price).toLocaleString('es-CO')}</strong>
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
                                        <Link href={`/product/${product._id}`}>
                                            <a>
                                                <img className="product-image" src={product.images[0]} alt="" />
                                                <div className="product-detail">
                                                    <h3>{product.name}</h3>
                                                    <strong>{Number.parseInt(product.price).toLocaleString('es-CO')}</strong>
                                                </div>
                                            </a>
                                            
                                        </Link>

                                    </div>
                                ))

            }


        </section>
    )
}
