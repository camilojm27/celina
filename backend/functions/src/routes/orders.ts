import { Request, Response, Router } from 'express';
const orderApi = Router();
import admin, {db} from '../util/admin'
const {isAuth} = require("../util/auth");
// Create a product with Auto ID

orderApi.post("/", isAuth, async (req: Request, res: Response) =>{
    if (req.body.orderItems.length === 0) {
        res.status(400).json({message: "El carrito esta vacio"});
    } else {
        const {shippingAddress, orderItems, itemsPrice, shippingPrice, taxPrice, totalPrice} = req.body;
        const newOrder: any = {
            shippingAddress, orderItems, itemsPrice, shippingPrice, taxPrice, totalPrice,
            user: req.body.user.uid,
            isPaid: false,
            paidAt: "0",
            isDelivered: false,
            deliveredAt: "0",
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };
        const documentReference = await db.collection("orders").add(newOrder);
        newOrder.orderId = documentReference.id
        res.status(201).json(newOrder);
    }
});

orderApi.get("/:id",  async (req: Request, res: Response) =>{
    try {
        let order = await db.collection("orders").doc(req.params.id).get()
        if (order.exists) {
            res.status(200).send(order.data())
        } else {
            res.status(404).send("La orden no existe")
            console.log("No such document!");
        }


    }catch (e) {
        console.log(e)
        res.status(404).send("la orden no existe o no está disponible en el momento")
    }
})

export default orderApi