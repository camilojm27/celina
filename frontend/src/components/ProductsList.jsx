import React from 'react'
import { Link } from 'react-router-dom'
import '../screens/styles/Home.css'
import { useHistory } from 'react-router-dom';
export default function ProductsList(props) {
    let history = useHistory();
    return (
       <section className="products">
                            {
                                props.admin ?
                                    (
                                Array.from(props.products).map(product =>
                                    <div className="product" key={product._id} onClick={ () =>
                                        history.push(`/edit/${product._id}`)
                                    } >
                                            <img className="product-image" src={product.images[0]} alt=""/>
                                            <div className="product-detail">
                                                <h3>{product.name}</h3>
                                                <strong>{product.price}</strong>
                                            </div>


                                    </div>
                                )) :
                                    (
                                        Array.from(props.products).map(product =>
                                            <div className="product" key={product._id}>
                                                <Link to={{
                                                    pathname: `/product/${product._id}`,
                                                    state: {
                                                        qty: product.qty,
                                                        color: product.colors[0]
                                                    }
                                                }}>
                                                    <img className="product-image" src={product.images[0]} alt=""/>
                                                    <div className="product-detail">
                                                        <h3>{product.name}</h3>
                                                        <strong>{product.price}</strong>
                                                    </div>
                                                </Link>

                                            </div>
                                        ))

                            }


                        </section>
    )
}
