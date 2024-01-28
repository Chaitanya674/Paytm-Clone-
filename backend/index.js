require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');
const PORT = 3000;
const app = express();

//Local imports
const { Login_Register } =  require('./zod_configure/login_Register_conf');
const { User } = require('./db_schema/user');

//middlewares
app.use(express.json());
app.use(cors());

app.post('/signin' , async function(req , res) {
    const userCredential = req.body;
    const parseduserCredential = Login_Register.safeParse(userCredential);
    if(!parseduserCredential.success){
        res.status(411).json({
            msg : 'something wrong with input',
        });
        return;
    }

    const user = await User.findOne({
        name : userCredential.name,
        lastname : userCredential.lastname,
        password : userCredential.password,
    }).then(() => {
        if(user){
            return res.status(200).json({
                msg : 'user can login',
            })
        }else{
            return res.status(411).json({
                msg: 'invalid user credentials'
            })
        }
    }).catch((error) => {
        console.log(error);
    })
})

app.post('/signup' , async function(req , res) {
    const userCredential = req.body;
    const parseduserCredential = Login_Register.safeParse(userCredential);
    if(!parseduserCredential.success){
        res.status(411).json({
            msg : 'something wrong with input',
        });
        return;
    }
    const user = await User.create({
            name : userCredential.name,
            lastname : userCredential.lastname,
            password : userCredential.password,
        }).then((res) => {
            if(user && res.status == 200){
                return res.status(200).json({
                    msg : 'user created',
                })
            }else{
                return res.status(411).json({
                    msg: 'invalid Input'
                })
            }
        }).catch((error) => {
            console.log(error);
    })
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