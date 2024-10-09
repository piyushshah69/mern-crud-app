import User from "../models/userModel.js";

export const create = async (req, res) => {
    try {
        const userData = new User(req.body);
        if (!userData) {
            return res.status(404).json({msg: "Invalid data"})
        }
        const savedData = await userData.save();
        res.status(200).json(savedData);
        // console.log(savedData);
        
    } catch (error) {
        console.log(error);
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const usersData = await User.find();
        if (!usersData) {
            res.status(404).json({msg: "Users not found"})
        }
        res.status(200).json({ usersData });
    } catch (error) {
        console.log(error);
    }
}

export const getOneUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userData = await User.findById(id);
        if (!userData) {
            return res.status(401).json({ msg: "User not found" });
        }
        res.status(200).json(userData);
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userData = await User.findById(id);
        if (!userData) {
            return res.status(401).json({ msg: "User not found" });
        }
        const updatedData = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedData);
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userData = await User.findById(id);
        if (!userData) {
            return res.status(401).json({ msg: "User not found" });
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({msg: "User deleted"});
    } catch (error) {
        console.log(error);
    }
}