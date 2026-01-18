import express from "express"
import cors from "cors"
import "dotenv/config"

const app=express()
const PORT=process.env.PORT

//-> middlewares:
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//-> db:

//-> routes:

//just for testing: http://localhost:3000/
app.get("/",(req,res)=>{
    res.send("Welcome to dev sprint....")
})


//->running server:
app.listen(PORT,()=>{
    console.log("Server is running on: http://localhost:3000")
})