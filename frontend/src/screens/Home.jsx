import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";
import SearchBar from "../components/SearchBar";


import './styles/Home.css';
import '../components/styles/Product.css'
import ProductsList from "../components/ProductsList";



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
                    <><br/>
                        <SearchBar/>
                        <section className="hero">
                            <div className="hero--hotproduct"/>
                            <div className="hero--hotproduct"/>
                            <div className="hero--hotproduct"/>
                            <div className="hero--hotproduct"/>
                            <div className="hero--hotproduct"/>
                            <div className="hero--hotproduct"/>

                        </section>
                        <h2 className="center">Nuestros productos favoritos🔥</h2>
                        <ProductsList products={products}/>
                    </>

            }

        </>
    )
}
