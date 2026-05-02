const express = require("express");
const app = express();
app.use("/admin", (req, res, next) => {
    const token = "xyz";
    const isAdminauthorized = token === "xyz";
    console.log("authentication process");
    if (!isAdminauthorized) {
        res.status(401).send("unauthorized request");
    }
    else {
        next();
    }
});
app.get("/admin/getdata", (req, res) => {
    res.send("admin added");
});
app.get("/admin/deldata", (req, res) => {
    res.send("admin deleted");
});
app.use("/", (err, req, res, next) => {
    if (err) {
        console.log("Error occured");
        res.status(401).send("unauthorized request");
    }

});
app.use("/user", (req, res) => {
    throw new Error("invalid user request");
});


app.listen(7777, () => {
    console.log("Server running on port 7777");
});