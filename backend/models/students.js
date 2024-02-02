const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please provide your name"]
    },
    email:{
        type:String,
        required:[true,"Please provide your email"],
        unique:true
    },
    rollNumber:{
        type: String,
        unique:true
    },
    mobileNumber:{
        type:String
    },
    city:{
        type:String,
        default:"Gorakhpur"
    },
    state:{
        type:String,
        default:"Uttar Pradesh"
    },
    graduationYear:{
        type:String
    },
    branch:{
        type:String,
        enum:["IT","CS","MECH","CIVIL"]
    },
    currentYear:{
        type:String
    },
    CGPA:{
        type:String
    },
    attendence:{
        type:String
    },
    scholarshipSent:{
        type:Boolean,
        default:false
    }
})

const Students = mongoose.model("Students", studentsSchema);
module.exports= Students;