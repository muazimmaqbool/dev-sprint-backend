import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true, //removes extra spaces from the beginning and end of the string.
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

/*
->timeStamps:true
Mongoose automatically adds two fields to every document:
    {
    createdAt: Date
    updatedAt: Date
    }

    createdAt → set once when document is created
    updatedAt → updates every time you update the document
*/


const User=mongoose.model("User",userSchema)
export default User
//or
// export default mongoose.models.User || mongoose.model("User",userSchema)