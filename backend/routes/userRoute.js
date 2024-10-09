import express from "express";
import { create, deleteUser, getAllUsers, getOneUser, updateUser } from "../controllers/userController.js";

const route = express.Router();
route.post('/create', create);
route.get('/getAllUsers', getAllUsers);
route.get('/getOneUser/:id', getOneUser);
route.put('/updateUser/:id', updateUser);
route.delete('/deleteUser/:id', deleteUser);

export default route;