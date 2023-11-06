const mongoose=require("mongoose")

mongoose.connect("mongodb://0.0.0.0:27017/userdb")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
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

const dblogin=new mongoose.model('LogInCollection',logInSchema)

module.exports=dblogin