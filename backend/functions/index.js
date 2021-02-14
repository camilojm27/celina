const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");
const productsApi = require("./routes/products");
const ordersApi = require("./routes/orders");

app.use(cors({origin: true}));


app.use("/api/products", productsApi );
app.use("/api/orders", ordersApi);

app.get("/", (req, res) => {
  res.send("Celina server is running");
});



exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
