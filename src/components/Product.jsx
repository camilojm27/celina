import React from "react";

import './styles/Product.css'
//ASSETS
import PRODUCTO_IMG from '../assets/img/product_1.jpg'
const Product = () => (
    <div className="product">
        <img className="product-image" src={PRODUCTO_IMG} alt=""/>
        <div className="product-detail">
            <h3>Nombre</h3>
            <strong>30.000</strong>
        </div>

    </div>
)

export default Product
