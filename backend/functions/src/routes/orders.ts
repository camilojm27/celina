import { Request, Response, Router } from "express";
const orderApi = Router();
import admin, {db} from "../util/admin"
import {isAuth, isAdmin} from "../util/auth";
import Mail from "../libs/nodemailer";
const mail = new Mail();
// Create a product with Auto ID

orderApi.post("/", isAuth, async (req: Request, res: Response) =>{
    if (req.body.orderItems.length === 0) {
        res.status(400).json({message: "El carrito esta vacio"});
    } else {
        const {shippingAddress, orderItems, itemsPrice, shippingPrice, taxPrice, totalPrice, paymentMethod} = req.body;
        const time = admin.firestore.FieldValue.serverTimestamp()
        const newOrder: any = {
            shippingAddress, orderItems, itemsPrice, shippingPrice, taxPrice, totalPrice, paymentMethod,
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



// Todo: Acordame de agregar autenticación a todas las rutas
// TODO: Verificar los codigos de error
orderApi.get("/", isAuth, isAdmin, async (req: Request, res: Response) => {
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
                paymentMethod: queryDocumentSnapshot.data().paymentMethod,
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

orderApi.get("/mine", isAuth, async (req: Request, res: Response) => {
    const result: FirebaseFirestore.DocumentData[] = []
    try {
        const orders = await db.collection("orders").where("user", "==", `${req.body.user.uid}`).get()
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
                paymentMethod: queryDocumentSnapshot.data().paymentMethod,
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



// Todo: Implementar el modo transacional de firebase
orderApi.put("/:id/pay", isAuth, isAdmin, async (req: Request, res: Response) => {
    const userMail = req.body.user.email;
    const orderRef = db.collection("orders").doc(req.params.id);
    const productRef = db.collection("products");
    try {
        const tres = await db.runTransaction(async t => {
            const doc = await t.get(orderRef);
            // Verificar que haya stock
            for (const item of doc?.data()?.orderItems) {
                // Obtiene los productos de la orden
                const orderItemProductID = item.product;
                const orderItemProductQTY = item.qty;
                const orderItemProductCOLORTYPE: string = item.color;

                // Restar estos productos del inventario

               const product = await t.get(productRef.doc(orderItemProductID));
               const productCOLORTYPE : Array<string> = product?.data()?.colors;
               const pos: number =  productCOLORTYPE.findIndex(fruit => fruit === orderItemProductCOLORTYPE);
               const newStock = product?.data()?.stock;
                newStock[pos] -= orderItemProductQTY;


                if (newStock[pos] < 0 && pos === -1){
                    throw `No hay stock disponible en el item ${orderItemProductID}`
                }
                else{
                    console.log(newStock)
                    await t.update(productRef.doc(orderItemProductID), {stock : newStock});
                }

            }

            // Acreditar el pago
           await t.update(orderRef, {isPaid: true, paidAt: admin.firestore.FieldValue.serverTimestamp()})


            return "Productos comprados correctamente"

        });
         mail.sendPayment(userMail)
        res.send("Pago actualizado correctamente")
        console.log("Transaction success", tres);
    } catch (e) {
        console.log("Transaction failure:", e);
        res.status(500).send(e.message);
    }
})

orderApi.put("/:id/deliver",  isAuth, isAdmin, async (req: Request, res: Response) => {
    const userMail = req.body.user.email;
    try {
        const put = await db.collection("orders").doc(req.params.id)
            .update({
                isDelivered: true,
                deliveredAt: admin.firestore.FieldValue.serverTimestamp()
            })
        console.log("delivered", put);

        mail.sendDeliver(userMail)
        res.sendStatus(200);
    } catch (e) {
        res.status(404).send("La orden no existe")
        console.error(e)
    }
})
orderApi.delete("/:id", isAuth, isAdmin, async (req: Request, res: Response) => {
    try {
        await db.collection("orders").doc(req.params.id).delete();
        res.send("Orden eliminada correctamente")
    } catch (e) {
        res.status(404).send("La orden ya fue eliminada")
    }
})

orderApi.get("/:id",isAuth,  async (req: Request, res: Response) =>{
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
                paymentMethod: order?.data()?.paymentMethod,
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

export default orderApi
