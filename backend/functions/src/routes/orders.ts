import { Request, Response, Router } from "express";
const orderApi = Router();
import admin, {db} from "../util/admin"
import {isAuth} from "../util/auth";
// Create a product with Auto ID

orderApi.post("/", isAuth, async (req: Request, res: Response) =>{
    if (req.body.orderItems.length === 0) {
        res.status(400).json({message: "El carrito esta vacio"});
    } else {
        const {shippingAddress, orderItems, itemsPrice, shippingPrice, taxPrice, totalPrice} = req.body;
        const time = admin.firestore.FieldValue.serverTimestamp()
        const newOrder: any = {
            shippingAddress, orderItems, itemsPrice, shippingPrice, taxPrice, totalPrice,
            user: req.body.user.uid,
            isPaid: false,
            paidAt: time,
            isDelivered: false,
            deliveredAt: time,
            createdAt: time,
        };
        const documentReference = await db.collection("orders").add(newOrder);
        newOrder.orderId = documentReference.id
        res.status(201).json(newOrder);
    }
});

orderApi.get("/:id",  async (req: Request, res: Response) =>{
    try {
        
        const order = await db.collection("orders").doc(req.params.id).get()
        if (order.exists) {
            res.status(200).send({
                _id: order?.id,
                shippingAddress: order?.data()?.shippingAddress,
                orderItems: order?.data()?.orderItems,
                itemsPrice: order?.data()?.itemsPrice,
                shippingPrice: order?.data()?.shippingPrice,
                taxPrice: order?.data()?.taxPrice,
                totalPrice: order?.data()?.totalPrice,
                user: order?.data()?.user,
                isPaid: order?.data()?.isPaid,
                paidAt: order?.data()?.paidAt.toDate().toLocaleString("es-CO", { timeZone: "America/Bogota" }),
                isDelivered: order?.data()?.isDelivered,
                deliveredAt: order?.data()?.deliveredAt.toDate().toLocaleString("es-CO", { timeZone: "America/Bogota" }),
                createdAt: order?.data()?.createdAt.toDate(),
            })
        } else {
            res.status(404).send("La orden no existe")
            console.log("No such document!");
        }


    }catch (e) {
        console.log(e)
        res.status(404).send("la orden no existe o no está disponible en el momento")
    }
})

// Todo: Acordame de agregar autenticación a todas las rutas
// TODO: Verificar los codigos de error
orderApi.get("/", async (req: Request, res: Response) => {
    const result: FirebaseFirestore.DocumentData[] = []
    try {
        const orders = await db.collection("orders").get()
        orders.forEach((queryDocumentSnapshot) => {
            result.push({
                _id: queryDocumentSnapshot.id,
                shippingAddress: queryDocumentSnapshot.data().shippingAddress,
                orderItems: queryDocumentSnapshot.data().orderItems,
                itemsPrice: queryDocumentSnapshot.data().itemsPrice,
                shippingPrice: queryDocumentSnapshot.data().shippingPrice,
                taxPrice: queryDocumentSnapshot.data().taxPrice,
                totalPrice: queryDocumentSnapshot.data().totalPrice,
                user: queryDocumentSnapshot.data().user,
                isPaid: queryDocumentSnapshot.data().isPaid,
                paidAt: queryDocumentSnapshot.data().paidAt.toDate().toLocaleString("es-CO", { timeZone: "America/Bogota" }),
                isDelivered: queryDocumentSnapshot.data().isDelivered,
                deliveredAt: queryDocumentSnapshot.data().deliveredAt.toDate().toLocaleString("es-CO", { timeZone: "America/Bogota" }),
                createdAt: queryDocumentSnapshot.data().createdAt.toDate(),
            })
        })
        res.send(result)
    } catch (e) {
        console.error(e);
        
        res.status(500).send(e.message)
    }
})


orderApi.delete("/:id", async (req: Request, res: Response) => {
    try {
        await db.collection("orders").doc(req.params.id).delete();
        res.send("Orden eliminada correctamente")
    } catch (e) {
        res.status(404).send("La orden ya fue eliminada")
    }
})

orderApi.put("/:id/pay", async (req: Request, res: Response) => {
    try {
        const put = await db.collection("orders").doc(req.params.id)
            .update({
                isPaid: true,
                paidAt: admin.firestore.FieldValue.serverTimestamp()
            })
        console.log("paid", put);

        res.sendStatus(200);

    } catch (e) {
        res.status(404).send("La orden no existe")
    }
})

orderApi.put("/:id/deliver", async (req: Request, res: Response) => {
    try {
        const put = await db.collection("orders").doc(req.params.id)
            .update({
                isDelivered: true,
                deliveredAt: admin.firestore.FieldValue.serverTimestamp()
            })
        console.log("delivered", put);

        res.sendStatus(200);

    } catch (e) {
        res.status(404).send("La orden no existe")
    }
})

export default orderApi