import {useEffect, useState} from "react";
import { useRouter } from 'next/router'
import {useDispatch, useSelector} from "react-redux";
import {detailsProduct} from "../../actions/productActions";
import {addToCart} from "../../actions/cartActions";

//import ButtonAction from "../components/ButtonAction";

const ProductScreen = () => {
    const router = useRouter()
    const { id } = router.query

    const size = sliderSize();
    const dispatch = useDispatch()
    const productID = id
    const productDetails = useSelector(state => state.productDetails)

    let [colorState, setColor] = useState("generic");
    const [qtyState, setQty] = useState(1);
    const {loading, error, product} = productDetails

    const colors = [], stock = []

    useEffect(() => {
        dispatch(detailsProduct(productID))
    }, [dispatch, productID])

    const addToCartHandler = () => {
        if (colorState === 'generic'){
            alert('Por favor elige un producto')
            return
        }
        dispatch(addToCart(productID, qtyState, colorState))
        router.push(`/cart`)
    }

    function verifyStock() {
        if (product.colors.length === product.stock.length) {
            for (let i = 0; i < product.stock.length; i++) {
                if (product.stock[i] !== 0) {
                    colors.push(product.colors[i])
                    stock.push(product.stock[i])
                }
            }
            //console.log(colors)
            return true
        }
        return false
    }


    return (
        <>
            {
                loading ? <h1>Cargando</h1>
                    :
                    error ? <h1>{error}</h1>
                        :

                        <section className="details">

                            <figure className="details__product">
                                <h4>{product.name}</h4>
                                

                            </figure>
                            <div className="details__buy">
                                <h2>{`$ ${product.price}`}</h2>

                                {
                                    verifyStock() && (
                                        <>
                                            <select  value={colorState}
                                                     onChange={(e) => setColor(e.target.value)}>
                                                {
                                                    colors.map(x => (
                                                      <option key={x} value={x}>{x}</option>
                                                    ))

                                                }
                                            </select>


                                            <select value={qtyState}
                                                    onChange={(e) => setQty(e.target.value)}
                                                    onClick={(e) => setQty(e.target.value)}
                                            >
                                                {
                                                    [...Array(stock[colors.indexOf(colorState)]).keys()].map(x => (
                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                    ))

                                                }
                                            </select>

                                            <button className="button-action" onClick={
                                                function () {
                                                    addToCartHandler()
                                                }
                                            }
                                            >
                                                Añadir al carrito
                                            </button>
                                        </>

                                        )
                                }
                                <p>{product.description}</p>

                            </div>
                        </section>

            }

        </>
    )
}

function sliderSize() {
    let size;
    if (typeof window !== 'undefined') {
        let width = window.screen.availWidth;
        if (width <= 500) {
            size = 300;
        } else if (width <= 720) {
            size = 400;
        } else {
            size = 430;
        }

    }
   
    return size;

}

// alert(window.screen.availHeight);
// alert(window.screen.availWidth);


export default ProductScreen
