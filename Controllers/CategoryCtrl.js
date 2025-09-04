import Category from "../Models/CategoryModel.js";

// ---- Create ----
export const createCategory = async (req, res) => {
  try {
    const { name, problemId } = req.body;

    if (!name || !problemId) {
      return res.status(400).json({ message: "Category name is required" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newCategory = await Category.create({
      name,
      image: req.file.path,
      problemId
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---- Get All ----
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
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
