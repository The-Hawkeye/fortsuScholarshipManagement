const app = require("./app");

const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({path:"./config.env"});

const PORT = process.env.PORT||3000;

const MONGODB_URL = process.env.MONGODB_URL


mongoose.connect(MONGODB_URL).then(()=>{
    console.log(`Connected to mongo ${MONGODB_URL}`)
}).catch((err)=>{
    console.log(`Error connecting to mongoDb \ ${err}`)
})


app.listen(PORT,()=>{
    console.log(`Server listening at port ${PORT}`)
})

app.use((err, req,res, next)=>{
    res.status(422).json({error: err.message});
})