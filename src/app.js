const express = require("express");
const connect_db = require("./config/database");
const app = express();
const User = require("./Models/user");
app.use(express.json());
app.get("/user", async (req, res) => {
    try {
        const email = req.body.email;
        console.log(email);
        res.send("user data recieved succesfully");
    }
    catch (err) {
        res.status(400).send("Error recieving user data" + err.message);
    }
});
app.post("/signup", async (req, res) => {
    try {
        const user = new User({
            firstName: "Nishitha",
            lastName: "Rajesh",
            email: "nishitharajesh25@gmail.com",
            password: "N@123",
        });
        await user.save();
        res.send("User Added successfully");
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});
connect_db()
    .then(() => {
        console.log("Database connected succesfully");
        app.listen(7777, () => {
            console.log("Server running on port 7777");
        });
    })
    .catch((err) => {
        console.error("Error" + err.message);
    });
