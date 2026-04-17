const express = require("express");
const app = express();
/*app.use((req, res) => {
    res.send("hello from server");
});*/
app.get("/user", (req, res) => {
    res.send({ firstname: "Nishitha" });
});
app.post("/user", (req, res) => {
    res.send("saved data to database succesfully");
})
app.use("/hello", (req, res) => {
    res.send("hello hello  hello from server");
});
// use method will  all the http methods api call 
app.use("/test", (req, res) => {
    res.send("test test ");
});
app.use("/test/exam", (req, res) => {
    res.send("test exam ");
});
app.use("/", (req, res) => {
    res.send("any path ");
});
app.listen(7777, () => {
    console.log("server is succesfully listening on port 7777");
});
