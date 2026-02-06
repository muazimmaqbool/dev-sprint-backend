import Result from "../models/resultModel";

export async function createResult(req, res) {
  try {
    //it will come via token
    //check jwt.js file and see what token is returning after verifying its req.user=user
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { title, techonology, level, totalQuestions, correct, wrong } =
      req.body;
    if (!techonology || !level || !totalQuestions || !correct) {
      return res.status(400).json({ message: "Some fields are missing" });
    }

    //calculating wrong answers, if not calculated from resultModel
    const computeWrong =
      wrong !== undefined
        ? Number(wrong)
        : Math.max(0, Number(totalQuestions) - Number(correct));
    if (!title) {
      return res.status(400).json({ message: "Title is missing" });
    }

    const payload = {
      title: String(title).trim(),
      techonology,
      level,
      totalQuestions: Number(totalQuestions),
      correct: Number(correct),
      wrong: Number(wrong),
      user: req.user.id,
    };
    const created = await Result.create(payload);
    return res.status(201).json({ message: "Result Created", result: created });
  } catch (error) {
    console.error("Error while creating result:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

//used to list the result/ fetching results
//This function fetches all quiz results of the logged-in user, with optional filtering by technology
export const listResult = async (req, res) => {
  try {
    //it will come via token
    //check jwt.js file and see what token is returning after verifying its req.user=user
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    // This reads from URL like: api/results?technology=react, so technology === "react"
    const {technology}=req.query;

    //Only fetch results belonging to this user
    const query={user:req.user.id};

    if(technology && technology.toLowerCase()!=="all"){
        //If user requests: ?technology=react
        //Then query becomes:
        // {
        // user: "65ab12...",
        // technology: "react"
        // }
        query.technology=technology
    }
   // If user requests: ?technology=all, then no filter is applied, returns all results

    const items=await Result.find(query).sort({createdAt:-1}).lean()
    //find(query): Get matching results
    //sort({createdAt:-1}): Newest first
    //.lean(): Return plain JS objects (faster)

    return res.status(201).json({result:items})
  } catch (error) {
    console.error("Error while fetching result:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
