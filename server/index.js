// import libraries
const bcrypt = require('bcryptjs')
const express =  require('express')
const joi = require('joi')
const app = express()
const cors = require('cors')
require('./db')
app.use(cors());
app.use(express.json());
const user = require('./schema/RegisterSchema')

// validation using joi

const Schema = joi.object({
    username:joi.string().required().min(4),
    email:joi.string().required().min(6).email(),
    password:joi.string().min(6).max(20).required()
})


const LoginScehma = joi.object({
    username:joi.string().required().min(4),
    password:joi.string().min(6).max(20).required()
})

// middleware 



// routing 

app.post("/register",async(req,res)=>{

    

const {error} = Schema.validate(req.body)
if(error) return res.send(error.details[0].message).status(400)

const emailChecked = await user.findOne({email:req.body.email});
    if(emailChecked) return res.send("EMAIL ALREADY EXIST").status(409)

try {

    const salt = 10
    const HashPassword =  await bcrypt.hash(req.body.password,salt)
    let data = new user({
        username:req.body.username,
        email:req.body.email,
        password:HashPassword
    })
    
    let result = await data.save();
    res.send("sucessfully register")
} catch (error) {
    res.send({message:"SERVER ERROR"}).status(500)
}

})


// LOGIN POST REQUEST 


app.post("/login",async(req,res)=>{

    
const {error} = LoginScehma.validate(req.body);
if(error) return res.send(error).status(420);


    const userChecked = await user.findOne({username:req.body.username})
    if(!userChecked) return res.send({message:"USERNAME IS INCORRECT"}).status(400)



    // checking if password is Correct or not

const ValidPassword = await bcrypt.compare(req.body.password,userChecked.password)
if(!ValidPassword) return res.send({message:"PASSWORD IS INCORRECT"}).status(400)


    try {
        res.send({message:"SUCCESSFULLY LOGIN"}).status(200)
    } catch (error) {
        res.send(error).status(500);
    }
})

app.get("/",async(req,res)=>{
    let data = await user.find()
    res.send(data) 
})

// APP PORT 
app.listen(5000,()=>{
    console.log("SERVER UP AND RUNNING ");
})