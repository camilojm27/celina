import React, {useState, useEffect} from "react";

import stilos from './styles/ProductScreen.css'

import SimpleImageSlider from "react-simple-image-slider";
//import ButtonAction from "../components/ButtonAction";

const ProductScreen = (props) => {


    const size = sliderSize();
    const product = props.products.find(x => x._id === Number(props.match.params.id))
    console.log(this.state.count)
    return(

        <section className="details">

            <figure className="details__product">
            <h4>{product.name}</h4>
                <SimpleImageSlider
                width={size}
                height={size}
                images={product.images.map(img => ({url: img} ))}
                style={stilos}
                />

            </figure>
            <div className="details__buy">
                <h2>{`$ ${product.price}`}</h2>
                    <select id="size" name="select">
                        <option value="value1" defaultValue>Talla M</option>
                        <option value="value2" >Talla S</option>
                        <option value="value3">Talla XL</option>
                    </select>


                <select id="quantity" name="quantity">
                    <option value="value1" defaultValue>1</option>
                    <option value="value2" >2</option>
                    <option value="value3">3</option>
                </select>
                <button id="cart">
                    Añadir al carrito
                </button>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias architecto blanditiis, corporis debitis deleniti dignissimos dolore, error ex illo, inventore ipsam laboriosam maxime mollitia nemo neque nisi odio optio praesentium sint soluta suscipit temporibus totam. Iste sunt tempora tenetur unde. Assumenda consequuntur distinctio enim eos error est impedit, iste laborum libero magnam obcaecati reiciendis sapiente sunt veritatis?</p>

            </div>
        </section>
    )
}

function sliderSize (){
    let size, width = window.screen.availWidth;
    if (width <= 500){
        size = 300;
    }

    else if (width <= 720){
        size = 400;
    }
    else{
        size = 430;
    }

    return size;

}

// alert(window.screen.availHeight);
// alert(window.screen.availWidth);


export default ProductScreen

