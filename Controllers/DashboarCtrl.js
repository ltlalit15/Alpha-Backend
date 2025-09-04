import Contact from "../Models/ContactModel.js";
import Booking from "../Models/BookingModel.js";
import Category from "../Models/CategoryModel.js";
import ProblemDetails from "../Models/ProblemDetailsModel.js"
// ---- Get All (populate with Model → SubCategory → Category) ----
export const getDashbaordData = async (req, res) => {
  try {
    const booking = await Booking.countDocuments();
    const contact = await Contact.countDocuments();
    const category = await Category.countDocuments();

    const ProblemDetailsData = await ProblemDetails.find();

    // sab prices ko add karo
    const totalPrice = ProblemDetailsData.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0; // agar price string hai
      return sum + price;
    }, 0);

    return res.status(200).json({
      booking,
      contact,
      category,
      totalPrice,
      problemCount: ProblemDetailsData.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

