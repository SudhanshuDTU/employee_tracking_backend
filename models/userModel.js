import pool from "../config/db.js";

export const getAllUsers = async () => {
  const query = 'SELECT * FROM "Users"';
  const result = await pool.query(query);
  return result.rows;
};

export const getUserById = async (id) => {
  const query = 'SELECT * FROM "Users" WHERE id = $1';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const createUser = async (user) => {
  const query =
    'INSERT INTO "Users" (id,name, email, role) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [user.id, user.name, user.email, user.role];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const updateUser = async (id, user) => {
  try {
    const query =
      'UPDATE "Users" SET name = $1, email = $2, role = $3, shiftids = $4 WHERE id = $5 RETURNING *';
    const values = [user.name, user.email, user.role, user.shiftids, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

export const deleteUser = async (id) => {
  const query = 'DELETE FROM "Users" WHERE id = $1';
  const values = [id];
  await pool.query(query, values);
};

export const updateOdometerVisible = async (id,odometer_visible) => {
  try {
    const query =
      'UPDATE "Users" SET odometer_visible = $1 WHERE id = $2 RETURNING *';
    const values = [odometer_visible, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};