import pool from '../config/db.js';

export const getAllBreaks = async () => {
  const query = 'SELECT * FROM "Breaks"';
  const result = await pool.query(query);
  return result.rows;
};

export const getBreakById = async (id) => {
  const query = 'SELECT * FROM "Breaks" WHERE id = $1';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};
export const getBreakByAttendanceId = async (id) => {
  const query = 'SELECT * FROM "Breaks" WHERE attendance_id = $1';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows;
};


export const createBreak = async (breakRecord) => {
  const query =
    'INSERT INTO "Breaks" (user_id, attendance_id, break_start_time, break_end_time,created_at) VALUES ($1, $2, $3, $4,$5) RETURNING *';
  const values = [
    breakRecord.user_id,
    breakRecord.attendance_id,
    breakRecord.break_start_time,
    breakRecord.break_end_time,
    breakRecord.created_at
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const updateBreak = async (id, breakRecord) => {
  const query =
    'UPDATE "Breaks" SET break_end_time = $1 WHERE id = $2 RETURNING *';
  const values = [
    breakRecord.break_end_time,
    id,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteBreak = async (id) => {
  const query = 'DELETE FROM "Breaks" WHERE id = $1';
  const values = [id];
  await pool.query(query, values);
};
