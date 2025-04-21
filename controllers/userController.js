import * as userModel from '../models/userModel.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  const user = req.body;
  try {
    const newUser = await userModel.createUser(user);
    console.log("here controller");
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  try {
    console.log("Received update request for ID:", req.params.id);
    console.log("Request body:", req.body);  // Log incoming data

    // Ensure id is valid
    if (!req.params.id) {
      throw new Error("User ID is missing in the request");
    }

    const updatedUser = await userModel.updateUser(req.params.id, req.body);
     
    if (!updatedUser) {
      throw new Error("User not found or update failed");
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userModel.deleteUser(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
