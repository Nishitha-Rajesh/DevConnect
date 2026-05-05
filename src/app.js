const express = require("express");
const connect_db = require("./config/database");
const app = express();
const User = require("./Models/user");
app.use(express.json());
// find by data
app.get("/user", async (req, res) => {
    try {
        const useremail = req.body.email;
        const users = await User.find({ email: useremail });
        res.send(users);
    }
    catch (err) {
        res.status(400).send("Error recieving user data" + err.message);
    }
});
//find one by data
app.get("/user", async (req, res) => {
    try {
        const useremail = req.body.email;
        const users = await User.findOne({ email: useremail });
        res.send(users);
    }
    catch (err) {
        res.status(400).send("Error recieving user data" + err.message);
    }
});
// find by id and delete 
app.get("/user", async (req, res) => {
    try {
        const userid = req.body._id;
        const users = await User.findByIdAndDelete({ _id: userid });
        res.send(users);
    }
    catch (err) {
        res.status(400).send("Error recieving user data" + err.message);
    }
});
//find by id and update 
app.get("/user", async (req, res) => {
    try {
        const userid = req.body._id;
        const users = await User.findByIdAndUpdate({ _id: userid }, {
            email: "rajeshnichu@24gmail.com"
        });
        res.send(users);
    }
    catch (err) {
        res.status(400).send("Error recieving user data" + err.message);
    }
});
app.post("/signup", async (req, res) => {
    try {
        const user = new User({
            firstName: "Rajesh",
            lastName: "Krishnan",
            email: "rajeshkrishnan25@gmail.com",
            password: "R@123",
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
