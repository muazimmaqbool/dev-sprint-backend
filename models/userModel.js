import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unqiue:true,
        trim:true,
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
const User=mongoose.model("User",userSchema)
export default User
//or
// export default mongoose.models.User || mongoose.model("User",userSchema)