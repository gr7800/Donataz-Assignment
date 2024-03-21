const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const verifyToken = async function (req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(403).send({ messege: "Unauthorized" });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(401).send({ messege: "Invalid token"});
        }
        const user = await UserModel.findById({ _id: decodedToken?._id });

        if (!user) {
            return res.status(401).send({ messege: "User not found"});
        }
        if (user.role === 'admin') {
            req.user = user; 
            next();
        } else {
            return res.status(403).send({ messege: "Admin permission required."});
        }
    } catch (error) {
        return res.status(401).send({error:error});
    }
};

module.exports = verifyToken;
