import * as odometerModel from '../models/odometerModel.js';

export const getAllOdometerReadings = async (req, res) => {
  try {
    const odometerReadings = await odometerModel.getAllOdometerReadings();
    res.status(200).json(odometerReadings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOdometerReadingById = async (req, res) => {
  const { id } = req.params;
  try {
    const odometerReading = await odometerModel.getOdometerReadingById(id);
    if (odometerReading) {
      res.status(200).json(odometerReading);
    } else {
      res.status(404).json({ error: 'Odometer reading not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createOdometerReading = async (req, res) => {
  const odometer = req.body;
  try {
    const newOdometerReading = await odometerModel.createOdometerReading(odometer);
    res.status(201).json(newOdometerReading);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOdometerReading = async (req, res) => {
  const {id : attendance_id } = req.params;
  const odometer = req.body;
  try {
    const updatedOdometerReading = await odometerModel.updateOdometerReading(attendance_id, odometer);
    res.status(200).json(updatedOdometerReading);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOdometerReading = async (req, res) => {
  const { id } = req.params;
  try {
    await odometerModel.deleteOdometerReading(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
