import SearchBar from "../components/SearchBar";
import './styles/Home.css';
import '../components/styles/Product.css'
import ProductsList from "../components/ProductsList";


export default function Home(props) {


    return (
        <>
            {
                <><br/>
                    <SearchBar/>
                    <section onClick={() => props.history.push('/categories/todas ')} className="hero">
                        <div className="hero--hotproduct"/>
                        <div className="hero--hotproduct"/>
                        <div className="hero--hotproduct"/>
                        <div className="hero--hotproduct"/>
                        <div className="hero--hotproduct"/>
                        <div className="hero--hotproduct"/>
                    </section>
                    <h2 className="center">Nuestros productos favoritos🔥</h2>
                    <ProductsList/>
                </>

            }

        </>
    )
}
