import express, { Request, Response } from "express";
import cors from "cors";
import productsApi from "./routes/products";
import orderApi from "./routes/orders";
import usersApi from "./routes/users"
import { onRequest } from "firebase-functions/lib/providers/https";

const app = express();
app.use(cors({origin: true}));


app.use("/api/products", productsApi );
app.use("/api/orders", orderApi);
app.use("/api/users", usersApi);

app.get("/", (req: Request, res: Response) => {
  res.send("Celina server is running");
});



exports.app = onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
