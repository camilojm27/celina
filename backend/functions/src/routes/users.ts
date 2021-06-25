import { Request, Response, Router } from "express";
const userApi = Router();
import  {db} from "../util/admin"


userApi.post("/", async (req: Request, res: Response) => {

    try {
        await db.collection("users").doc(req.body.uid).set(req.body)
        res.sendStatus(200)

    } catch (error) {
        res.sendStatus(500)

    }


})

export default userApi
