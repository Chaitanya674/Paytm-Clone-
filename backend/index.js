require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');
const zod = require('zod');
const PORT = 3000;
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

app.post('/signin' , async function(req , res) {

})

app.post('/signup' , async function(req , res) {
    
})

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("connected to the database")
        app.listen(PORT , function(err){
            if(err){
                console.log(err);
            }else{
                console.log('Server listening on Port' , PORT);
            }
        });
    })
    .catch((error) =>{ 
        console.log(error);
    })