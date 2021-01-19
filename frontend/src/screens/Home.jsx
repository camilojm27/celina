import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";
import SearchBar from "../components/SearchBar";


import './styles/Home.css';
import '../components/styles/Product.css'



export default function Home() {

    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    const productList = useSelector((state) => state.productList)
    const {loading, error, products} = productList
    console.log(productList)
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
                                Array.from(products).map(product =>
                                    <div className="product" key={product._id}>
                                        <Link to={{
                                            pathname: `/product/${product._id}`,
                                            state: {
                                                qty: product.qty,
                                                color: product.colors[0]
                                            }
                                        }}>
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
