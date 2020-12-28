import express from 'express'
import data from "./data";

const app = express();

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find(x => x._id === Number( req.params.id))
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({message: 'Product not Found'})
    }
})

app.get('/api/products', (req, res) => {
    res.send(data.products)
})
app.get('/', (req, res) => {
    res.send('Server is ready')
})


//Servidor estatico de imgagenes
var path = require('path');
var dir = path.join(__dirname, 'public');
console.log(dir)
app.use(express.static(dir));

app.listen(5000, () => {
    console.log('Running at http://localhost:5000')
})
