import pool from '../config/db.js';

export const getAllLeaves = async () => {
  const query = 'SELECT * FROM "leaves"';
  const result = await pool.query(query);
  return result.rows;
};

export const getLeaveById = async (id) => {
  const query = 'SELECT * FROM "leaves" WHERE id = $1';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const createLeave = async (leave) => {
  const query =
    'INSERT INTO "leaves" (user_id, leave_date, status, reason) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [
    leave.user_id,
    leave.leave_date,
    leave.status,
    leave.reason,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const updateLeave = async (id, leave) => {
  const query =
    'UPDATE "leaves" SET user_id = $1, leave_date = $2, status = $3, reason = $4, approved_by = $5, approved_at = $6, created_at = $7 WHERE id = $8 RETURNING *';
  const values = [
    leave.user_id,
    leave.leave_date,
    leave.status,
    leave.reason,
    leave.approved_by,
    leave.approved_at,
    leave.created_at,
    id,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteLeave = async (id) => {
  const query = 'DELETE FROM "leaves" WHERE id = $1';
  const values = [id];
  await pool.query(query, values);
};
