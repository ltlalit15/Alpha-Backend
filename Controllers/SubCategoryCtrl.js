import SubCategory from "../Models/SubCategoryModel.js";

// ---- Create ----
export const createSubCategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    if (!name) return res.status(400).json({ message: "SubCategory name is required" });
    if (!categoryId) return res.status(400).json({ message: "categoryId is required" });
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    const newSubCategory = await SubCategory.create({
      name,
      categoryId,
      image: req.file.path,
    });

    res.status(201).json(newSubCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---- Get All (with Category populated) ----
export const getSubCategories = async (req, res) => {
  const { categoryId } = req.query;
  try {
    let subCategories;

    if (categoryId) {
      subCategories = await SubCategory.find({ categoryId })
        .populate("categoryId", "name");
    } else {
      subCategories = await SubCategory.find()
        .populate("categoryId", "name");
    }

    // format response
    const formatted = subCategories.map((sub) => ({
      id: sub?._id,                           // _id → id
      name: sub?.name,
      image: sub?.image,
      categoryId: sub?.categoryId?._id || null,
      categoryName: sub?.categoryId?.name || null,
      createdAt: sub?.createdAt,
      updatedAt: sub?.updatedAt,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ---- Delete ----
export const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subCategory = await SubCategory.findById(id);
    if (!subCategory) return res.status(404).json({ message: "SubCategory not found" });

    await SubCategory.findByIdAndDelete(id);

    res.status(200).json({ message: "SubCategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
