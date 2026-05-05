const mongoose = require("mongoose");
const connect_db = async () => {
    return await mongoose.connect("mongodb://nishitharajesh25_db_user:Nishimongo123@ac-dc7znml-shard-00-00.wbaq4fw.mongodb.net:27017,ac-dc7znml-shard-00-01.wbaq4fw.mongodb.net:27017,ac-dc7znml-shard-00-02.wbaq4fw.mongodb.net:27017/?ssl=true&replicaSet=atlas-i0ajv4-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0");
};
module.exports = connect_db;