import express from 'express'
import data from "./data";

const app = express();


var path = require('path');

var dir = path.join(__dirname, 'public');
console.log(dir)
app.use(express.static(dir));
app.get('/api/products', (req, res) => {
    res.send(data.products)
})

app.listen(5000, () => {
    console.log('Running at http://localhost:5000')})
