import express from 'express';
import {createUser, getAllUser, getUserById} from '../controller/user.controller.js';
import { get } from 'mongoose';

const router = express.Router();

// router. get ('/user', createUser);

router.post("/adduser", createUser);
router.get("/getalluser", getAllUser);
router.get("/userbyid/:id", getUserById);

export default router;