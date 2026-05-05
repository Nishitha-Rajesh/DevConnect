const validator = require("validator");
const validateSignUp = (req) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("Invalid credintials");
    }
    if (!validator.isEmail(email)) {
        throw new Error("invalid email");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Enter a Strong Password");
    }
}
module.exports = { validateSignUp };