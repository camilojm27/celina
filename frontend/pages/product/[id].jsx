import {useState} from "react";
import {useRouter} from 'next/router'
import {useDispatch} from "react-redux";
import {addToCart} from "../../redux/actions/cartActions";
import Axios from "axios";
import Slider from "../../components/Slider";
import {API} from "../../redux/constants/backend";

const ProductScreen = ({product}) => {
    const {colors, stock} = product;
    const router = useRouter()
    const {id} = router.query
    const imagesSlides = product.images.map((img) => (
        {image: img}
    ))
    const dispatch = useDispatch()
    const productID = id
    let [colorState, setColor] = useState(colors[0]);
    const [qtyState, setQty] = useState(1);
    const [qtyStateRay, setQtyRay] = useState([...Array(stock[0]).keys()]);


    const addToCartHandler = () => {
        if (colorState === 'generic') {
            alert('Por favor elige un producto')
            return
        }
        dispatch(addToCart(productID, qtyState, colorState))
        router.push(`/cart`)
    }


    function correctStock() {
        if (product.colors.length === product.stock.length) {
            for (let i = 0; i < product.stock.length; i++) {
                if (product.stock[i] < 0) {
                    product.stock[i] = 0;
                }
            }
            return true
        }
        return false
    }


    return (
        <section className="details">

            <figure className="details__product">
                <h4>{product.name}</h4>
                <Slider slides={imagesSlides}/>
            </figure>
            <div className="details__buy">
                <h2>{`$ ${product.price}`}</h2>

                {
                    correctStock() && (
                        <>
                            <select value={colorState}
                                    onChange={(e) => {
                                        setColor(e.target.value)
                                        setQtyRay([...Array(stock[e.target.selectedIndex]).keys()])
                                    }
                                    }>
                                {
                                    colors.map(x => (
                                        <option key={x} value={x}>{x}</option>
                                    ))

                                }
                            </select>


                            <select value={qtyState}
                                    onChange={(e) => setQty(e.target.value)}
                            >
                                {
                                    qtyStateRay.map(x => (
                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                    ))

                                }
                            </select>

                            <button className="button-action" onClick={
                                function () {
                                    if (qtyStateRay.length === 0) {
                                        return
                                    }
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
    )
}

export async function getServerSideProps(context) {
    const {id} = context.params;
    let product = await Axios.get(
        `${API}/products/${id}`
    );

    product = product.data

    return {
        props: {
            product
        }, // will be passed to the page component as props
    }

}

export default ProductScreen
