import Problem from "../Models/ProblemModel.js";

export const createProblem = async (req, res) => {
  try {
    const { problem } = req.body;

    if (!problem) {
      return res.status(400).json({ message: "Problem field is required" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newProblem = await Problem.create({
      problem,
      image: req.file.path, // Cloudinary ne direct URL diya hai
    });

    res.status(201).json(newProblem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---- Get All ----
export const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---- Delete ----
export const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;

    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    // delete from DB
    await Problem.findByIdAndDelete(id);

    res.status(200).json({ message: "Problem deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
