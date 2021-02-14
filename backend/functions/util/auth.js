const {admin} = require("./admin");


exports.isAuth = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (authorization) {
        // eslint-disable-next-line max-len
        try {
            const token = authorization.slice(7, authorization.length); // Bearer XXXXX
            req.user = await admin.auth().verifyIdToken(token);
            // Buscar el user id en db
            next();
        } catch (e) {

                console.error("Error while verifying token ", e);
                return res.status(403).json(e);


        }

    } else {
        res.status(401).send({message: "No Token"});
    }

};
