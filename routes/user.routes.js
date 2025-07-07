import express from 'express';
import {createUser, getAllUser, getUserById, putUserById, deleteUserById} from '../controller/user.controller.js';
import { get } from 'mongoose';

const router = express.Router();

// router. get ('/user', createUser);

router.post("/user", createUser);
router.get("/user", getAllUser);
router.get("/user/:id", getUserById);
router.put("/user/:id", putUserById);
router.delete("/user/:id", deleteUserById);

export default router;