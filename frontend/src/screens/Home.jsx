import React from "react";
import data from "../data";
import './styles/Home.css';
import '../components/styles/Product.css'
import SearchBar from "../components/SearchBar";
import { Link} from "react-router-dom";

export default function Home(){
    return(
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
                data.products.map(product =>
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
    )
}
