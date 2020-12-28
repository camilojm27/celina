const IMAGEN =  'http://127.0.0.1:5000/p1.jpg'

// eslint-disable-next-line import/no-anonymous-default-export
export default  {
    products: [
        {
            _id: 1,
            name: 'Blusa Basica',
            category: 'Blusa',
            images:[IMAGEN, IMAGEN, IMAGEN],
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
        }, {
            _id: 4,
            name: 'Vestido premium',
            category: 'Vestido',
            images: [IMAGEN, IMAGEN, IMAGEN],
            price: 70000,
            discount: 49,
            colors: ['Negro', 'Amarillo', 'Rojo'],
            rating: 4.5,
            numReviews: 10,
        }, {
            _id: 5,
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
