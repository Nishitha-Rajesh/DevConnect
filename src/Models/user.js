const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userschema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2
    },
    lastName: {
        type: String,
        minlength: 2
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(values) {
            if (!validator.isEmail(values)) {
                throw new Error("invalid email");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        unique: true,
        validate(values) {
            if (!validator.isStrongPassword(values)) {
                throw new Error("Enter a Strong Password");
            }
        }
    },
    gender: {
        type: String,
        validate(values) {
            if (!["Male", "Female", "Other"].includes(values)) {
                throw new Error("Gender invalid");
            }
        }
    },
    Skills: {
        type: [String]
    }
});
// should not use arror functions-it break things up 
userschema.methods.getjwt = async function () {
    const user = this;// refers to particular instance of user and this works differently  in arrow function
    const token = await jwt.sign({ _id: user._id }, "aabb@#23", { expiresIn: "7d" });
    return token;
}
userschema.methods.validatepassword = async function (passwordinput) {
    const user = this;
    const passwordhash = user.password;
    const ispassword = await bcrypt.compare(passwordinput, passwordhash);
    return ispassword;
}

const user = mongoose.model("user", userschema);
module.exports = user;