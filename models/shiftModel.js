import pool from '../config/db.js';

export const getAllShifts = async () => {
  const query = 'SELECT * FROM "Shifts"';
  const result = await pool.query(query);
  return result.rows;
};

export const getShiftById = async (id) => {
  const query = 'SELECT * FROM "Shifts" WHERE id = $1';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const createShift = async (shift) => {
  const query =
    'INSERT INTO "Shifts" (warehouse_id, shift_start_time, shift_end_time) VALUES ($1, $2, $3) RETURNING *';
  const values = [
    shift.warehouse_id,
    shift.shift_start_time,
    shift.shift_end_time,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const updateShift = async (id, shift) => {
  const query =
    'UPDATE "Shifts" SET  warehouse_id = $1, shift_start_time = $2, shift_end_time = $3, WHERE id = $4 RETURNING *';
  const values = [
    shift.warehouse_id,
    shift.shift_start_time,
    shift.shift_end_time,
    id,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteShift = async (id) => {
  const query = 'DELETE FROM "Shifts" WHERE id = $1';
  const values = [id];
  await pool.query(query, values);
};
