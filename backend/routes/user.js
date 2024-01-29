const express = require('express');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const  JWT_SECRET =  require('../config');
const { User } = require('../db');
const router = express.Router();

const signupSchema = zod.object({
    username : zod.string(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string(),

})

router.post('/singup' , async(req , res) => {
    const body = req.body;
    const {success}  = signupSchema.safeParse(body);
    if(!success){
        return res.json({
            msg: 'Email already taken / Incorrect inputs'
        })
    }

    const user = User.findOne({
        username : body.username
    })

    if(user._id){
        return res.json({
            msg: "Email already taken / Incorrect inputs"
        })
    }

    const dbuser = await User.create(body);
    const token = jwt.sign({
        userId : dbuser._id,
    }, JWT_SECRET);
    req.json({
        msg : "user created successfully",
        token : token,
    })
})


const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

module.exports = router;