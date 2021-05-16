import admin from "./admin";
import { Request, Response , NextFunction} from "express";


export const isAuth = async (req: Request, res : Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (authorization) {
        try {
            const token = authorization.slice(7, authorization.length); // Bearer XXXXX
            req.body.user = await admin.auth().verifyIdToken(token);
            // Buscar el user id en db
            return  next();
        } catch (e) {

                console.error("Error while verifying token ", e);
                res.status(403).json(e);
                return

        }

    } else {
          res.status(401).send({message: "No Token"});
          return
    }

};
