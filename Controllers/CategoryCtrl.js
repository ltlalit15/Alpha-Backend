import Category from "../Models/CategoryModel.js";

// ---- Create ----
export const createCategory = async (req, res) => {
  try {
    const { name, problemId } = req.body;

    if (!name || !problemId) {
      return res.status(400).json({ message: "Category name and problemId are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Cloudinary se path le
    const imageUrl = req.file.path || req.file.url;

    const newCategory = await Category.create({
      name,
      image: imageUrl,
      problemId
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
      error: error.errors || error
    });
  }
};

// ---- Get All ----
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate("problemId", "problem");
  

    const formatted = categories.map((cat) => ({
      id: cat?._id,                  // _id → id
      name: cat?.name,
      image: cat?.image,
      problem: cat?.problemId?.problem || null, // sirf problem ka naam
      problemId: cat?.problemId?._id || null,   // agar zarurat ho id bhi
      createdAt: cat?.createdAt,
      updatedAt: cat?.updatedAt,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ---- Delete ----
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await Category.findByIdAndDelete(id);

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
