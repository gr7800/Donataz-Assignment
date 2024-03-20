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

        // Fetch user details from the database using the decoded token's _id
        const user = await UserModel.findById({ _id: decodedToken?._id });

        if (!user) {
            return res.status(401).send({ messege: "User not found"});
        }

        // Check if the user is an admin
        if (user.role === 'admin') {
            // Grant access for admin
            req.user = user; // Attach user details to the request for further processing if needed
            next();
        } else {
            // For non-admin users, restrict access
            return res.status(403).send({ messege: "Admin permission required."});
        }
    } catch (error) {
        return res.status(401).send({error:error});
    }
};

module.exports = verifyToken;
