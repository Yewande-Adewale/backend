const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://yewaxy:Completedmongo@cluster0.25sl8xe.mongodb.net/")
.then(()=>{
    console.log("connection to the database is successful")
}).catch((error)=>{
        console.log(error.message)
    })