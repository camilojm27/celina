import ProductsList from "../components/ProductsList";


export default function Home(props) {


    return (
        <>
            <figure className="banner">
                <p className="banner--text">Lorem ipsum dolor sit amet <br /> consectetur adipisicing elit. Deleniti, impedit.</p>
            </figure>
            <br />
            <section onClick={() => props.history.push('/categories')} className="home--categories">
                <div className="home--categorie">
                    <p>Tops</p>
                    <img className="home--categories__img" src="https://firebasestorage.googleapis.com/v0/b/celina-tienda.appspot.com/o/assets%2Fcelina.tienda_127184453_201420841433429_462873709041527074_n.jpg?alt=media&token=04ba402b-072b-45fa-93ff-6ecd9b969e6a" alt="" />
                </div>
                <div className="home--categorie">
                    <img className="home--categories__img" src="https://firebasestorage.googleapis.com/v0/b/celina-tienda.appspot.com/o/assets%2Fcategory1%20(1).png?alt=media&token=c340aaac-a920-4674-a854-de08128bb6a5" alt="" />
                    <p>Vestidos</p>
                </div>
                <div className="home--categorie">
                    <p>Enterizos</p>
                    <img className="home--categories__img" src="https://firebasestorage.googleapis.com/v0/b/celina-tienda.appspot.com/o/assets%2Fenterizos.png?alt=media&token=65e576e4-acc1-47fa-b2a4-e3d39549a7b3" alt="" />
                </div>
                
                <div className="home--categorie">
                    <img className="home--categories__img" src="https://firebasestorage.googleapis.com/v0/b/celina-tienda.appspot.com/o/assets%2Fcelina.tienda_145186333_454445505964378_5642612551226593814_n.jpg?alt=media&token=afe8c720-e009-4021-bb7e-f7d562822b11" alt="" />
                    <p>Faldas</p>
                </div>
            </section>

            <h2 className="center">Productos más queridos 💞</h2>
            <div className="products">
                <ProductsList />

            </div>

            <div className="benefits">
                <div className="benefit">
                    <img src="https://firebasestorage.googleapis.com/v0/b/celina-tienda.appspot.com/o/assets%2Fglobe-free-img.png?alt=media&token=4e410e03-805f-4cf0-98ef-0099229b23b7" alt="" />
                    <h2>Envíos a Toda Colombia</h2>
                    <p>No importa en qué parte te encuentres, llevamos tus pedidos a la puerta de tu casa.</p>
                </div>
                <div className="benefit">
                    <img src="https://firebasestorage.googleapis.com/v0/b/celina-tienda.appspot.com/o/assets%2Ftag-free-img.png?alt=media&token=66a87b4c-a61a-468b-b6d3-35c46079a4db" alt="" />
                    <h2>Los mejores precios</h2>
                    <p>No importa en qué parte te encuentres, llevamos tus pedidos a la puerta de tu casa.</p>
                </div>
                <div className="benefit">
                    <img src="https://firebasestorage.googleapis.com/v0/b/celina-tienda.appspot.com/o/assets%2Flock-free-img.png?alt=media&token=e2e16730-14f0-4ec9-a5c9-4e2415f07c65" alt="" />
                    <h2>Pagos Seguros</h2>
                    <p>Garantizamos tu compra con cualquier medio de pago.</p>
                </div>
            </div>
            
        </>
    )
}
