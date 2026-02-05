import Result from "../models/resultModel";

export async function createResult(req,res){
    try{
        //it will come via token
        //check jwt.js file and see what token is returning after verifying its req.user=user
        if(req.user || req.user.id){
            return res.status(401).json({message:"Not authorized"})
        }

        const{title,techonology,level,totalQuestions,correct,wrong}=req.body;
        if(!techonology || !level || !totalQuestions || !correct){
            return res.status(400).json({message:"Some fields are missing"})
        }

        //calculating wrong answers, if not calculated from resultModel
        const computeWrong=wrong!==undefined ? Number(wrong): Math.max(0,Number(totalQuestions) - Number(correct)); 
        if(!title){
            return res.status(400).json({message:"Title is missing"})
        }

        const payload={
            title:String(title).trim(),
            techonology,
            level,
            totalQuestions:Number(totalQuestions),
            correct:Number(correct),
            wrong:Number(wrong),
            user:req.user.id
        }
        const created=await Result.create(payload)
        return res.status(201).json({message:"Result Created",result:created})
    } catch (error) {
    console.error("Error while creating result:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}