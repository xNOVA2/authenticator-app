const mongoose  = require('mongoose')

const RegisterSchema = new mongoose.Schema({

username:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
}
})


const LoginScheama = new mongoose.Schema({
    username:{
        type:String,
        require:true   
    },
    password:{
        type:String,
        require:true
    }
})


module.exports = mongoose.model('auth',RegisterSchema);
