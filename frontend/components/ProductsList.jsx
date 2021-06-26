import {  useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Todo: agregar no hay productos para esta búsqueda si da vacío

export default function ProductsList({products, categoriesID, admin}) {
    const router = useRouter()
    const [search, setSearch] = useState('')


    const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(search.toLowerCase())
    })

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    function filterCategories(product) {
        if (categoriesID) {
            return product.category.toLowerCase() === categoriesID.toLowerCase()
        }
        return product
    }
    return (
        <>


            <section className="products">
                <div className="searchBar">
                    <h2>¿Qué quieres comprar?</h2>
                    <input className="input" type="text" placeholder="Yo quiero..." onChange={handleSearch} />
                </div>
                {
                    admin ?
                        (
                            Array.from(filteredProducts).filter(filterCategories).map(product =>
                                <div className="product-admin" key={product._id} onClick={() =>
                                    router.push(`/product/edit/${product._id}`)
                                }>
                                    <img className="product-image-small" src={product.images[0]} alt="" />
                                    <div className="product-detail">
                                        <h3>{product.name}</h3>
                                        <strong>{Number.parseInt(product.price).toLocaleString('es-CO')}</strong>
                                    </div>


                                </div>
                            )) :
                        (
                            Array.from(filteredProducts).filter(filterCategories).map(product =>

                                <div className="product" key={product._id}>
                                    <Link href={`/product/${product._id}`}>
                                        <a>
                                            <img className="product-image" src={product.images[0]} alt="" />
                                            <div className="product-detail">
                                                <h3>{product.name}</h3>
                                                <strong>{Number.parseInt(product.price).toLocaleString('es-CO')}</strong>
                                            </div>
                                        </a>

                                    </Link>

                                </div>
                            ))

                }


            </section>
        </>
    )
}
