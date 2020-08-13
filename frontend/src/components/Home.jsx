import React from "react";
import data from "../data";
import './styles/Home.css';
import './styles/Product.css'

export default function Home(){
    return(
        <>
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
                    <div className="product">
                        <img className="product-image" src={product.image} alt=""/>
                        <div className="product-detail">
                            <h3>{product.name}</h3>
                            <strong>{product.price}</strong>
                        </div>

                    </div>

                )

            }


        </section>
        </>
    )
}
