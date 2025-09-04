import ProblemDetails from "../Models/ProblemDetailsModel.js";

// ---- Create ----
export const createProblemDetails = async (req, res) => {
  try {
    const { name, problemId, price, warrenty, description } = req.body;

    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!problemId) return res.status(400).json({ message: "problemId is required" });
    if (!price) return res.status(400).json({ message: "price is required" });
    if (!warrenty) return res.status(400).json({ message: "warrenty is required" });
    if (!description) return res.status(400).json({ message: "description is required" });
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    const newProblemDetail = await ProblemDetails.create({
      name,
      problemId,
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
    const { problemId } = req.query;

    let query = {};
    if (problemId) {
      query.problemId = problemId;
    }

    const problems = await ProblemDetails.find(query)
      .populate("problemId", "problem")
      .sort({ createdAt: -1 });

    const formatted = problems.map((p) => ({
      id: p._id,
      name: p.name,                   // agar schema me hai
      warrenty: p.warrenty,                   // agar schema me hai
      description: p.description,     // agar schema me hai
      price: p.price,                 // agar schema me hai
      image: p.image,                 // agar schema me hai
      problemId: p.problemId?._id || null,
      Problem: p.problemId?.problem || null,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editProblemDetails = async (req, res) => {
  try {
    const { id } = req.params; // problem ka id URL se aayega
    const { name, problemId, price, warrenty, description } = req.body;

    // check id
    if (!id) return res.status(400).json({ message: "ProblemDetails id is required" });

    // prepare update data
    const updateData = {};
    if (name) updateData.name = name;
    if (problemId) updateData.problemId = problemId;
    if (price) updateData.price = price;
    if (warrenty) updateData.warrenty = warrenty;
    if (description) updateData.description = description;
    if (req.file) updateData.image = req.file.path; // new image from cloudinary

    const updatedProblem = await ProblemDetails.findByIdAndUpdate(id, updateData, {
      new: true, // return updated doc
      runValidators: true,
    });

    if (!updatedProblem) {
      return res.status(404).json({ message: "ProblemDetails not found" });
    }

    res.status(200).json(updatedProblem);
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
