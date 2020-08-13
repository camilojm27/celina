import React from "react";
import './styles/Home.css';
import Product from "./Product";

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
            <Product/>
            <Product/>
            <Product/>
            <Product/>

        </section>
        </>
    )
}
