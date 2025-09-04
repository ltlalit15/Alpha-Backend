import ProblemDetails from "../Models/ProblemDetailsModel.js";

// ---- Create ----
export const createProblemDetails = async (req, res) => {
  try {
    const { name, modelId , price , warrenty , description } = req.body;

    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!modelId) return res.status(400).json({ message: "modelId is required" });
    if (!price) return res.status(400).json({ message: "price is required" });
    if (!warrenty) return res.status(400).json({ message: "warrenty is required" });
    if (!description) return res.status(400).json({ message: "description is required" });
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    const newProblemDetail = await ProblemDetails.create({
      name,
      modelId,
      price,
      description,
      warrenty,
      image: req.file.path, // Cloudinary URL
    });

    res.status(201).json(newProblemDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---- Get All (populate with Model → SubCategory → Category) ----
export const getProblemDetails = async (req, res) => {
  try {
    const problems = await ProblemDetails.find()
     .sort({ createdAt: -1 });

    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---- Delete ----
export const deleteProblemDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const problem = await ProblemDetails.findById(id);
    if (!problem) return res.status(404).json({ message: "Problem detail not found" });

    await ProblemDetails.findByIdAndDelete(id);

    res.status(200).json({ message: "Problem detail deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
