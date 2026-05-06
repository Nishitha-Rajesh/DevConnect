const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const userauth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Token is not valid");
        }
        const decodedmsg = await jwt.verify(token, "aabb@#23");
        const { _id } = decodedmsg;
        const user = await User.findById({ _id });
        if (!user) {
            throw new Error("user not found");
        }
        req.user = user;
        next();
    }
    catch (err) {
        res.status(400).send("ERROR" + err.message);
    }
}
module.exports = { userauth };