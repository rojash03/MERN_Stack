import bcrypt from "bcryptjs";
import { user } from "../Modles/user.js";


export const createUser = async (req, res) => {

  console.log(req.file);
  const image =req.file.filename;
  console.log("Image file name:", image);

  try {
    const { firstName, lastName, email, password,role,image } = req.body;
    if (firstName == "" || lastName == "" || email == "" || password == ""|| image == ""|| role == "") {
      return res.status(400).send("please fill all the fields");
    }

    const alreadyExists = await user.findOne({ email });
    if (alreadyExists) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new user({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      image
    });

    await newUser.save();

    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "User created successfully",
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await user.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const putUserById = async (req, res) => {
  try {
        const { id } = req.params;
        const updates = req.body;
        if(updates.password) {
            delete updates.password; 
        }

        const user = await user.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.status(200).json({
            message: "User updated successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const deleteUserById = async (req, res) => {
  try{
    const userId = req.params.id;
    const user = await user.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } 
catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    }); 
  }}