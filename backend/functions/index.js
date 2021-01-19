const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({origin: true}));

const serviceAccount = require("./credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.post("/api/products", (req, res) => {
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

app.get("/", (req, res) => {
  console.log("Products Sent");
  res.send("Server is ready");
});

app.get("/api/products", (req, res) => {
  db.collection("products").get()
      .then((querySnapchot) => {
        const docs = querySnapchot.docs;
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
        console.table(response);
        res.json(response);
      }).catch((error) => res.status(500).send(error));
});

app.get("/api/products/:product_id", (req, res) => {
  db.collection("products").doc(req.params.product_id).get()
      .then((doc) => {
        if (doc.exists) {
          res.json(doc.data());
        } else {
          res.status(404).send("El documento no existe");
        }
      }).catch((error) => res.status(500).send(error));
});

exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
