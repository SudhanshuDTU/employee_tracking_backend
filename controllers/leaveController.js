import * as leaveModel from '../models/leaveModel.js';

export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await leaveModel.getAllLeaves();
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLeaveById = async (req, res) => {
  const { id } = req.params;
  try {
    const leave = await leaveModel.getLeaveById(id);
    if (leave) {
      res.status(200).json(leave);
    } else {
      res.status(404).json({ error: 'Leave not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createLeave = async (req, res) => {
  const leave = req.body;
  try {
    const newLeave = await leaveModel.createLeave(leave);
    res.status(201).json(newLeave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLeave = async (req, res) => {
  const { id } = req.params;
  const leave = req.body;
  try {
    const updatedLeave = await leaveModel.updateLeave(id, leave);
    res.status(200).json(updatedLeave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteLeave = async (req, res) => {
  const { id } = req.params;
  try {
    await leaveModel.deleteLeave(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
