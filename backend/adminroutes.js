const express = require("express");


const router = express.Router();

const authController = require("./controller/authController");
router.post("/login", authController.login)
router.patch("/:email", authController.update)
router.delete("/:email", authController.deleteEntry)
router.get("/assignScholarship", authController.assignScholarships)



module.exports = router