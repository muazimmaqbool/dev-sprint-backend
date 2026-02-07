import mongoose from "mongoose";

const performanceEnum = ["Excellent", "Good", "Average", "Needs Work"];

const resultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId, // stores the ID of another mongodb document here its userSchema
      //i.e each result belongs to one user
      ref: "userSchema", //This ObjectId points to the User collection
      //here type and ref is a reference relationship (like foreign key).
      required: false,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    technology: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "html",
        "css",
        "js",
        "react",
        "node",
        "mongodb",
        "java",
        "python",
        "cpp",
        "bootstrap"
      ]
    },
    level: {
      type: String,
      required: true,
      enum: ["basic", "intermediate", "advanced"],
    },
    totalQuestions: {
      type: Number,
      required: true,
      min: 0,
    },
    correct: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    wrong: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    score: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    performace: {
      type: String,
      enum: performanceEnum,
      default: "Needs Work",
    },
  },
  {
    timestamps: true,
  },
);

//Note: resultSchema.pre(...) : means before saving this document, run this function

//calculating result percentage and wrong answers
resultSchema.pre('save',function(next){
    const total=Number(this.totalQuestions) || 0;
    const correct=Number(this.correct) || 0

    this.score=total ? Math.round((correct/total)*100) : 0

    if(this.scrore>=85) this.performace="Excellent";
    if(this.scrore>=65) this.performace="Good";
    if(this.scrore>=45) this.performace="Average";
    else this.performace="Needs Work"

    if((this.wrong!==undefined || this.wrong!==null) && total){
        this.wrong=Math.max(0,total - correct)
    }

    next() // Tells Mongoose: I’m done, now continue saving.
})

const Result=mongoose.model('Result',resultSchema)
export default Result
