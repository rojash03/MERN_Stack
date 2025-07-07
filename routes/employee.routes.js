import express from 'express';
import { createEmployee, getAllEmployees, updateEmployeeById, deleteEmployeeById } from '../controller/employee.controller.js';
import { get } from 'mongoose';


const router = express.Router();

router.post("/employee", createEmployee);
router.get("/employee", getAllEmployees);
router.put("/employee/:id", updateEmployeeById);
router.delete("/employee/:id", deleteEmployeeById);

export default router;