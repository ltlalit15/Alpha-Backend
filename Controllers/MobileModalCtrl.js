import Model from "../Models/MobileModalModel.js";

// ---- Create ----
export const createModel = async (req, res) => {
  try {
    const { modelName, subCategoryId } = req.body;

    if (!modelName) return res.status(400).json({ message: "modelName is required" });
    if (!subCategoryId) return res.status(400).json({ message: "subCategoryId is required" });
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    const newModel = await Model.create({
      modelName,
      subCategoryId,
      image: req.file.path, 
    });

    res.status(201).json(newModel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---- Get All (with populate for SubCategory & Category) ----
export const getModels = async (req, res) => {
  try {
    const models = await Model.find()
      .populate({
        path: "subCategoryId",
        select: "name image categoryId",
        populate: { path: "categoryId", select: "name image" }
      })
      .sort({ createdAt: -1 });

    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---- Delete ----
export const deleteModel = async (req, res) => {
  try {
    const { id } = req.params;

    const model = await Model.findById(id);
    if (!model) return res.status(404).json({ message: "Model not found" });

    await Model.findByIdAndDelete(id);

    res.status(200).json({ message: "Model deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
