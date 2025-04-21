import * as shiftModel from '../models/shiftModel.js';

export const getAllShifts = async (req, res) => {
  try {
    const shifts = await shiftModel.getAllShifts();
    res.status(200).json(shifts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getShiftById = async (req, res) => {
  const { id } = req.params;
  try {
    const shift = await shiftModel.getShiftById(id);
    if (shift) {
      res.status(200).json(shift);
    } else {
      res.status(404).json({ error: 'Shift not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createShift = async (req, res) => {
  const shift = req.body;
  try {
    const newShift = await shiftModel.createShift(shift);
    res.status(201).json(newShift);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateShift = async (req, res) => {
  const { id } = req.params;
  const shift = req.body;
  try {
    const updatedShift = await shiftModel.updateShift(id, shift);
    res.status(200).json(updatedShift);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteShift = async (req, res) => {
  const { id } = req.params;
  try {
    await shiftModel.deleteShift(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
