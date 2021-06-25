import ProductsList from "../../components/ProductsList";
import CategoriesPanel from "../../components/CategoriesPanel";
import {useRouter} from 'next/router'
import Axios from "axios";


const Categories = ({products, categories}) => {

    const router = useRouter()
    const categoriesID = router.query.id
    //console.log(router.query)

    const fatherURL = router.pathname === '/admin/[id]' ? 'admin' : 'categories'


    return (
        <>
            <section>
                <CategoriesPanel categories={categories} fatherURL={fatherURL} categoriesID={categoriesID}/>
                {fatherURL === 'admin'
                    ? <ProductsList products={products} categoriesID={categoriesID} admin/>
                    :
                    <ProductsList products={products} categoriesID={categoriesID}/>}
                <style jsx>{`
                  section {
                    padding-top: 30px;
                    display: flex;
                    justify-content: center;
                  }
                `}</style>
            </section>

        </>


    )
}

export async function getServerSideProps() {
    let product = await Axios.get(
        `https://us-central1-celina-tienda.cloudfunctions.net/app/api/products/`
    );

    let categoriesRes = await Axios.get(
        `https://us-central1-celina-tienda.cloudfunctions.net/app/api/products/categories`
    );

    const products = product.data
    const categories = categoriesRes.data

    return {
        props: {
            products,
            categories
        }, // will be passed to the page component as props
    }

}

export default Categories
