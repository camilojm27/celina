import React from "react";
import data from "../data";
import SimpleImageSlider from "react-simple-image-slider";

import stilos from './styles/ProductScreen.css'

const ProductScreen = (props) => {
    const product = data.products.find(x => x._id === Number(props.match.params.id))
    return(
        <section className="details">
            <div className="details__product">
            <h1>{product.name}</h1>
                <SimpleImageSlider
                width={800}
                height={500}
                images={product.images}
                style={stilos}
                />
                <h2>{product.price}</h2>


            </div>
            <div className="details__buy">

            </div>
        </section>
    )
}

export default ProductScreen

