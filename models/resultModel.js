import mongoose from "mongoose";

const performanceEnum = ["Excellent", "Good", "Average", "Needs Work"];

const resultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "userSchema",
    required: true,
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
    ],
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
});
