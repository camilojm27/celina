import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

import SearchBar from "../components/SearchBar";


import './styles/Home.css';
import '../components/styles/Product.css'


export default function Home() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const {data} = await axios.get('/api/products')
                setLoading(false)
                setProducts(data)
            } catch (e) {
                setLoading(false)
                setError(e.message)
            }

        }
        fetchData()
    }, [])

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
