import * as breakModel from '../models/breakModel.js';

export const getAllBreaks = async (req, res) => {
  try {
    const breaks = await breakModel.getAllBreaks();
    res.status(200).json(breaks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBreakById = async (req, res) => {
  const { id } = req.params;
  try {
    const breakRecord = await breakModel.getBreakById(id);
    if (breakRecord) {
      res.status(200).json(breakRecord);
    } else {
      res.status(404).json({ error: 'Break not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createBreak = async (req, res) => {
  console.log("start");
  const breakRecord = req.body;
  console.log(breakRecord);
  try {
    const newBreak = await breakModel.createBreak(breakRecord);
    res.status(201).json(newBreak);
  } catch (error) {
    console.error('Error in createBreak:', error);
    res.status(500).json({ error: error.message });
  }
};

export const updateBreak = async (req, res) => {
  const { id } = req.params;
  const breakRecord = req.body;
  try {
    const updatedBreak = await breakModel.updateBreak(id, breakRecord);
    res.status(200).json(updatedBreak);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBreak = async (req, res) => {
  const { id } = req.params;
  try {
    await breakModel.deleteBreak(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
