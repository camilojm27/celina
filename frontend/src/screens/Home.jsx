import React, {useEffect} from "react";
import {Link} from "react-router-dom";

import SearchBar from "../components/SearchBar";


import './styles/Home.css';
import '../components/styles/Product.css'
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";


export default function Home() {

    const dispatch  = useDispatch()
    const productList = useSelector((state) => state.productList)
    const {loading, error, products} = productList


    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <>
            {loading ? <h1>Cargando</h1>
                :
                error ? <h1>{error}</h1>
                    :
                    <>
                        <SearchBar/>
                        <section className="hero">
                            <div className="hero--hotproduct">P1</div>
                            <div className="hero--hotproduct">P2</div>
                            <div className="hero--hotproduct">P3</div>
                            <div className="hero--hotproduct">P4</div>
                            <div className="hero--hotproduct">P5</div>
                            <div className="hero--hotproduct">P6</div>
                        </section>
                        <section className="products">
                            {
                                products.map(product =>
                                    <div className="product" key={product._id}>
                                        <Link to={"/product/" + product._id}>
                                            <img className="product-image" src={product.images[0]} alt=""/>
                                            <div className="product-detail">
                                                <h3>{product.name}</h3>
                                                <strong>{product.price}</strong>
                                            </div>
                                        </Link>

                                    </div>
                                )

                            }


                        </section>
                    </>

            }

        </>
    )
}
