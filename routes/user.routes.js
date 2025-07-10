import express from 'express';
import {createUser, getAllUser, getUserById, putUserById, deleteUserById} from '../controller/user.controller.js';
import { get } from 'mongoose';
import { verifyHR, verifyUser } from '../middleWare/verify.token.js';
import upload from '../middleWare/multer.js';

const router = express.Router();

// router. get ('/user', createUser);

router.post("/user",upload.single("image"), createUser);
router.get("/user", verifyHR,getAllUser);
router.get("/user/:id",verifyUser, getUserById);
router.put("/user/:id",verifyUser, putUserById);
router.delete("/user/:id", deleteUserById);

export default router;