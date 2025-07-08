import mongoose from "mongoose";
const employeeSchema = new mongoose.Schema(
    {
        Name:{
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        id:{
            type: String,
            required: [true, "ID is required"],
            unique: true,
            trim: true,
        },
        department:{
            type: String,
            required: [true, "Department is required"],
            trim: true,
        },

        role:{
            enum: ["Manager", "Developer", "Designer", "Admin", "HR"],
            type: String,
            default: "Manager",
        },

        salary:{
            type: Number,
            required: [true, "Salary is required"],
            min: [0, "Salary must be a positive number"],
        }
    },
    {
        timestamps:  true,
    },
);
export const employee = mongoose.model("Employee", employeeSchema);