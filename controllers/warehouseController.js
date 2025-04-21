import * as warehouseModel from '../models/warehouseModel.js';

export const getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await warehouseModel.getAllWarehouses();
    res.status(200).json(warehouses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getWarehouseById = async (req, res) => {
  const { id } = req.params;
  try {
    const warehouse = await warehouseModel.getWarehouseById(id);
    if (warehouse) {
      res.status(200).json(warehouse);
    } else {
      res.status(404).json({ error: 'Warehouse not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createWarehouse = async (req, res) => {
  const warehouse = req.body;
  try {
    const newWarehouse = await warehouseModel.createWarehouse(warehouse);
    res.status(201).json(newWarehouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateWarehouse = async (req, res) => {
  const { id } = req.params;
  const warehouse = req.body;
  try {
    const updatedWarehouse = await warehouseModel.updateWarehouse(id, warehouse);
    res.status(200).json(updatedWarehouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteWarehouse = async (req, res) => {
  const { id } = req.params;
  try {
    await warehouseModel.deleteWarehouse(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
