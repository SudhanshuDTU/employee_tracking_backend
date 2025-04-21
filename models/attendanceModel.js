import pool from '../config/db.js';

export const getAllAttendance = async () => {
  const query = 'SELECT * FROM "Attendance"';
  const result = await pool.query(query);
  return result.rows;
};

export const getAttendanceById = async (id) => {
  const query = 'SELECT * FROM "Attendance" WHERE id = $1';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};
export const getAttendanceByUserId = async (id) => {
  const query = 'SELECT * FROM "Attendance" WHERE user_id = $1';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows;
};

export const createAttendance = async (attendance) => {
  console.log("here i m @3");
  const query =
    'INSERT INTO "Attendance" (user_id, warehouse_id, check_in_time, check_in_latitude, check_in_longitude, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [
    attendance.user_id,
    attendance.warehouse_id,
    attendance.check_in_time,
    attendance.check_in_latitude,
    attendance.check_in_longitude,
    attendance.status,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const updateAttendance = async (id, attendance) => {
  const query =
    'UPDATE "Attendance" SET user_id = $1, warehouse_id = $2, check_in_time = $3, check_in_latitude = $4, check_in_longitude = $5, check_out_time = $6, check_out_latitude = $7, check_out_longitude = $8, total_distance = $9, status = $10, break_status = $11,breakids = $12 WHERE id = $13 RETURNING *';
  const values = [
    attendance.user_id,
    attendance.warehouse_id,
    attendance.check_in_time,
    attendance.check_in_latitude,
    attendance.check_in_longitude,
    attendance.check_out_time,
    attendance.check_out_latitude,
    attendance.check_out_longitude,
    attendance.total_distance,
    attendance.status,
    attendance.break_status,
    attendance.breakids,
    id,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};


export const deleteAttendance = async (id) => {
  const query = 'DELETE FROM "Attendance" WHERE id = $1';
  const values = [id];
  await pool.query(query, values);
};
