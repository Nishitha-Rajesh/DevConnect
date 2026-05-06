const express = require("express");
const connect_db = require("./config/database");
const app = express();
const User = require("./Models/user");
const { validateSignUp } = require("./Utils/Validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userauth } = require("./Middlewares/auth");
app.use(express.json());
app.use(cookieParser());

// find by data
/*
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
*/
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
app.delete("/user", async (req, res) => {
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
app.patch("/update", async (req, res) => {
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
        validateSignUp(req);
        const { firstName, lastName, email, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, email, password: passwordHash });
        await user.save();
        res.send("User Added successfully");
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});
app.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid credentials ");
        }
        const isPassword = await user.validatepassword(password);
        if (isPassword) {

            // create jwt token 
            const token = await user.getjwt();
            res.cookie("token", token, { expires: new Date(Date.now() + 60 * 60 * 1000), });
            res.send("login succesful");
            //create a cookie and send back 

        }
        else {
            throw new Error(" invalid credentials ");
        }
    }
    catch (err) {
        res.status(400).send("Error at login" + err.message);
    }
});
app.get("/profile", userauth, async (req, res) => {
    try {

        const user = req.user;
        res.send(user);
    }
    catch (err) {
        res.status(400).send("Error at login" + err.message);
    }

})

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
