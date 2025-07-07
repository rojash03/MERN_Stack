import {employee} from '../modles/employee.js';
export const createEmployee = async (req, res) => {
    try{
        console.log("Request body:", req.body);
        const{ Name, id, department, salary } = req.body;
        if (Name == "" || id == "" || department == "" || salary == "") {
            return res.status(400).send("Please fill all the fields");
        }
        const alreadyExists = await employee.findOne({ id });
        if (alreadyExists) {
            return res.status(400).json({ message: "Employee with this ID already exists" });
        }
        const newemployee = new employee({
            Name,
            id,
            department,
            salary
        })
        await newemployee.save();

        const employeeResponse = newemployee.toObject();
        
        res.status(201).json({
            message: "Employee created successfully",
            employee: employeeResponse,
        });
    }
        catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            });
        }
    }

    export const getAllEmployees = async (req, res) =>{
        try{
            const employees = await employee.find();
            res.status(200).json({
                message: "Employees fetched successfully",
                employees,
            });
        } catch (error){
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            });
        }
        };

export const updateEmployeeById = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const updatedEmployee = await employee.findByIdAndUpdate(
            employeeId,
            req.body,
            { new: true }
        );
        if (!updatedEmployee) {
            return res.status(404).json({ 
                message: "Employee not found"
            });
        }
        res.status(200).json({
            message: "Employee updated successfully",
            employee: updatedEmployee,
        });
    }
        catch (error){
                res.status(500).json({
                    message: "Internal Server Error",
                    error: error.message,
                });
        }
    };
export const deleteEmployeeById = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const deletedEmployee = await employee.findByIdAndDelete(employeeId);
        if (!deletedEmployee) {
            return res.status(404).json({ 
                message: "Employee not found"
            });
        }
        res.status(200).json({
            message: "Employee deleted successfully",
            employee: deletedEmployee,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};