import IMAGEN from './assets/img/p1.jpg'

export default  {
    products: [
        {
            _id: 1,
            name: 'Blusa Basica',
            category: 'Blusa',
            images: [{url: IMAGEN},{url: IMAGEN},{url: IMAGEN}],
            price: 25000,
            discount: 10,
            colors: ['Negro', 'Amarillo', 'Rojo'],
            rating: 4.5,
            numReviews: 10,
        },
        {
            _id: 2,
            name: 'Vestido Basico',
            category: 'Vestido',
            images: [IMAGEN, IMAGEN, IMAGEN],
            price: 30000,
            discount: 0,
            colors: ['Negro'],
            rating: 4.0,
            numReviews: 10,
        },
        {
            _id: 3,
            name: 'Vestido premium',
            category: 'Vestido',
            images: [IMAGEN, IMAGEN, IMAGEN],
            price: 70000,
            discount: 49,
            colors: ['Negro', 'Amarillo', 'Rojo'],
            rating: 4.5,
            numReviews: 10,
        }


    ]
}
