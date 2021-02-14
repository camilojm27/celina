const express = require("express");
// eslint-disable-next-line new-cap
const productsApi = express.Router();
const {db} = require("../util/admin");
const {isAuth} = require("../util/auth");
// Create a product with Auto ID
productsApi.post("/", isAuth, (req, res) => {
  const {
    name,
    description,
    category,
    colors,
    stock,
    images,
    price,
  } = req.body;

  db.collection("products")
      .doc()
      .create({
        name: name,
        description: description,
        category: category,
        colors: colors,
        stock: stock,
        images: images,
        price: price,
      })
      .then(res.status(201).send("Producto creado Correctamente"))
      .catch((error) => res.status(500).send("Error" + error));
});
// Get all products
productsApi.get("/",
    (req, res) => {
      db.collection("products").get()
          .then((querySnapshot) => {
            const docs = querySnapshot.docs;
            const response = docs.map((doc) => ({
              _id: doc.id,
              name: doc.data().name,
              description: doc.data().description,
              category: doc.data().category,
              colors: doc.data().colors,
              stock: doc.data().stock,
              images: doc.data().images,
              price: doc.data().price,
            }));
            res.json(response);
          }).catch((error) => res.status(500).send(error));
    });
// Get a product
productsApi.get("/:product_id", (req, res) => {
  db.collection("products").doc(req.params.product_id).get()
      .then((doc) => {
        if (doc.exists) {
          const jsonResponse = doc.data();
          jsonResponse._id = req.params.product_id;
          res.json(jsonResponse);
        } else {
          res.status(404).send("El documento no existe");
        }
      }).catch((error) => res.status(500).send(error));
});


module.exports = productsApi;
