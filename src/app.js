const express = require("express");
const app = express();
/*app.use((req, res) => {
    res.send("hello from server");
});*/
app.use("/hello", (req, res) => {
    res.send("hello hello  hello from server");
});
app.use("/test", (req, res) => {
    res.send("test test ");
});
app.listen(7777, () => {
    console.log("server is succesfully listening on port 7777");
});
