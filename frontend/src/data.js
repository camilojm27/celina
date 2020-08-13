import IMAGEN from './assets/img/p1.jpg'

export default  {
    products: [
        {
            name: 'Blusa Basica',
            category: 'Blusa',
            image: IMAGEN,
            price: 25000,
            discount: 10,
            colors: ['Negro', 'Amarillo', 'Rojo'],
            rating: 4.5,
            numReviews: 10,
        },
        {
            name: 'Vestido Basico',
            category: 'Vestido',
            image: IMAGEN,
            price: 30000,
            discount: 0,
            colors: ['Negro'],
            rating: 4.0,
            numReviews: 10,
        },
        {
            name: 'Vestido premium',
            category: 'Vestido',
            image: IMAGEN,
            price: 70000,
            discount: 49,
            colors: ['Negro', 'Amarillo', 'Rojo'],
            rating: 4.5,
            numReviews: 10,
        }


    ]
}
