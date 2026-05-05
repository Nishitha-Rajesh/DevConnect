const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
});
const user = mongoose.model("user", userschema);
module.exports = user;