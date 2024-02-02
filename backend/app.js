const express = require("express");
const studentsRoute = require("./routes");
const adminroutes =require("./adminroutes")

const cors = require("cors");

const app = express();

app.use(cors());


app.use(express.json()); 



app.use("/api/v1/students", studentsRoute);
app.use("/api/v1/admin",adminroutes)


module.exports = app;