import { Request, Response } from "express";
import express from "express";
const productsApi = express.Router();
import {db} from "../util/admin"
import {isAuth} from "../util/auth";
import {firestore} from "firebase-admin/lib/firestore";
import DocumentData = firestore.DocumentData;
// Create a product with Auto ID
productsApi.post("/", isAuth, (req: Request, res: Response) => {
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
      .then(() => res.status(201).send("Producto creado Correctamente"))
      .catch((error: Error) => res.status(500).send("Error" + error));
});
// Get all products
productsApi.get("/",
    (req: Request, res: Response) => {
      db.collection("products").get()
          .then((querySnapshot: DocumentData) => {
            const docs = querySnapshot.docs;
            const response = docs.map((doc: any) => ({
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
          }).catch((error : Error) => res.status(500).send(error));
    });

productsApi.get("/categories",
    (req: Request, res: Response) => {
      db.collection("products").get()
          .then((querySnapshot: DocumentData) => {
            const docs = querySnapshot.docs;
            const response: Array<any> = [...new Set( docs.map((doc: any) => (
                doc.data().category
            )))];

            res.send(response);
          }).catch((error: Error) => res.status(500).send(error));
    });
// Get a product
productsApi.get("/:product_id", (req: Request , res: Response) => {
  db.collection("products").doc(req.params.product_id).get()
      .then((doc: DocumentData) => {
        if (doc.exists) {
          const jsonResponse = doc.data();
            jsonResponse._id = req.params.product_id;
            res.json(jsonResponse);

        } else {
          res.status(404).send("El documento no existe");
        }
      }).catch((error: Error) => res.status(500).send(error));
});


export default productsApi;
