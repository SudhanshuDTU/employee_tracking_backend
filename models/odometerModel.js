import pool from '../config/db.js';

export const getAllOdometerReadings = async () => {
  const query = 'SELECT * FROM "Odometer_Readings"';
  const result = await pool.query(query);
  return result.rows;
};

export const getOdometerReadingById = async (id) => {
  const query = 'SELECT * FROM "Odometer_Readings" WHERE id = $1';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const createOdometerReading = async (odometer) => {
  const query =
    'INSERT INTO "Odometer_Readings" (user_id, attendance_id, start_odometer_km, start_at,start_odometer_url) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [
    odometer.user_id,
    odometer.attendance_id,
    odometer.start_odometer_km,
    odometer.start_at,
    odometer.start_odometer_url,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// update based on attendance id
export const updateOdometerReading = async (attendance_id, odometer) => {
  const query =
    'UPDATE "Odometer_Readings" SET end_odometer_km = $1, end_odometer_url = $2, end_at = $3 WHERE attendance_id = $4 RETURNING *';
  const values = [
    odometer.end_odometer_km,
    odometer.end_odometer_url,
    odometer.end_at,
    attendance_id,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteOdometerReading = async (id) => {
  const query = 'DELETE FROM "Odometer_Readings" WHERE id = $1';
  const values = [id];
  await pool.query(query, values);
};
