const express = require("express");


const router = express.Router();

const studentsController = require("./controller/studentsController")

router.get("/getAllStudents", studentsController.getAllStudents)
router.get("/", studentsController.extractDataFromExcel)



module.exports = router