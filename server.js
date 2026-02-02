// Using ES Modules (import/export) because "type": "module" is set in package.json
// This replaces the older CommonJS require() syntax

import express from "express"
import cors from "cors"
import "dotenv/config"
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoutes.js"

const app=express()
const PORT=process.env.PORT

//-> middlewares:
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
//Read about these middlewares in bottom

//-> connecting db:
connectDB()

//-> routes:
app.use('/user',userRouter)

//just for testing: http://localhost:3000/
app.get("/",(req,res)=>{
    res.send("Welcome to dev sprint....")
})


//->running server:
app.listen(PORT,()=>{
    console.log("Server is running on: http://localhost:3000")
})

/*
->About middlewares:

1)app.use(cors());  used to enable CORS

2)app.use(express.json());
->used to 'Parse' incoming requests with 'JSON' payloads.
with this we can do this: req.body.name
Used for: POST requests, PUT/PATCH requests, APIs sending JSON data

3)app.use(express.urlencoded({extended:true}))
->Parses URL-encoded data (form submissions).
extended: true means: Allows nested objects and complex data structures
->Uses the qs library internally
Example: user[name]=Muazim&user[age]=23
        becomes:
        {
            user: {
                name: "Muazim",
                age: 23
            }
        }

*/