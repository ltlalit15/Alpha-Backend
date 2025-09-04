import User from "../Models/AuthModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../Config/JwtToken.js"

export const logins = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email aur Password required hai" });
        }

        // user find karo
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // password check karo
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }


        const token = await generateToken(existingUser._id)

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        // token se user mil gaya (authMiddleware ne `req.user` set kiya hoga)
        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile fetched successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const editProfile = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const { id } = req.params;

    // user find karo
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // fields update karo
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

