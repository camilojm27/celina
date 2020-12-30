const IMAGEN = 'http://127.0.0.1:5000/p1.jpg'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    products: [
        {
            _id: 1,
            name: 'Blusa Basica',
            category: 'Blusa',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias',
            colors: ['Negro', 'Amarillo', 'Rojo'],
            stock: [10, 5, 1],
            images: [IMAGEN, IMAGEN, IMAGEN],
            price: 25000,
            discount: 10,
            rating: 4.5,
            numReviews: 10,
        },
        {
            _id: 2,
            name: 'Vestido Basico',
            category: 'Vestido',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias',
            colors: ['Negro'],
            stock: [10],
            images: [IMAGEN, IMAGEN, IMAGEN],
            price: 30000,
            discount: 0,
            rating: 4.0,
            numReviews: 10,
        },
        {
            _id: 3,
            name: 'Vestido premium',
            category: 'Vestido',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias',
            colors: ['Negro', 'Amarillo'],
            stock: [0, 5],
            images: [IMAGEN, IMAGEN, IMAGEN],
            price: 70000,
            discount: 49,
            rating: 4.5,
            numReviews: 10,
        }, {
            _id: 4,
            name: 'Vestido premium',
            category: 'Vestido',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias',
            colors: ['Negro', 'Azul', 'Rosado'],
            stock: [1, 0, 3],
            images: [IMAGEN, IMAGEN, IMAGEN],
            price: 70000,
            discount: 49,
            rating: 4.5,
            numReviews: 10,
        },
        {
            _id: 5,
            name: 'Vestido premium',
            category: 'Vestido',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias',
            colors: ['Negro', 'Azul', 'Rosado'],
            stock: [0, 0, 0],
            images: [IMAGEN, IMAGEN, IMAGEN],
            price: 70000,
            discount: 49,
            rating: 4.5,
            numReviews: 10,
        },


    ]
}
