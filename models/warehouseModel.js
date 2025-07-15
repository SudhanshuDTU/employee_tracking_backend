import pool from '../config/db.js';

export const getAllWarehouses = async () => {
  const query = 'SELECT * FROM "warehouse"';
  const result = await pool.query(query);
  return result.rows;
};

export const getWarehouseById = async (id) => {
  const query = 'SELECT * FROM "warehouse" WHERE id = $1';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const createWarehouse = async (warehouse) => {
  const query =
    'INSERT INTO "warehouse" (location_name, latitude, longitude, radius, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [
    warehouse.location_name,
    warehouse.latitude,
    warehouse.longitude,
    warehouse.radius,
    warehouse.created_at,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const updateWarehouse = async (id, warehouse) => {
  const query =
    'UPDATE "warehouse" SET location_name = $1, latitude = $2, longitude = $3, radius = $4, created_at = $5 WHERE id = $6 RETURNING *';
  const values = [
    warehouse.location_name,
    warehouse.latitude,
    warehouse.longitude,
    warehouse.radius,
    warehouse.created_at,
    id,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteWarehouse = async (id) => {
  const query = 'DELETE FROM "warehouse" WHERE id = $1';
  const values = [id];
  await pool.query(query, values);
};
