const mongoose = require("mongoose");
const validator = require("validator");
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
const user = mongoose.model("user", userschema);
module.exports = user;