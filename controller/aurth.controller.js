import { user } from "../Modles/user.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await user
      .findOne({
        email,
      })
      .select("+password");
    if (!userData) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const Check = bcrypt.compareSync(password, userData.password);
    if (!Check) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const { password: pass, ...rest } = userData._doc;

    const token = jwt.sign(
      {
        id: rest._id,
        role: rest.role
      },
      process.env.JWT,
    );

    return res.status(200).json({token, data: rest});
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
