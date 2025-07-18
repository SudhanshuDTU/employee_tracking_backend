import pool from '../config/db.js';

export const getAllExpenses = async () => {
  const query = 'SELECT * FROM "expenses"';
  const result = await pool.query(query);
  return result.rows;
};

export const getExpenseById = async (id) => {
  const query = 'SELECT * FROM "expenses" WHERE id = $1';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const createExpense = async (expense) => {
  const query =
    'INSERT INTO "expenses" (user_id, amount, description, bill_url,status,expense_date) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *';
  const values = [
    expense.user_id,
    expense.amount,
    expense.description,
    expense.bill_url,
    expense.status,
    expense.expense_date
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const updateExpense = async (id, expense) => {
  const query =
    'UPDATE "expenses" SET user_id = $1, amount = $2, description = $3, bill_url = $4, status = $5, approved_by = $6, approved_at = $7, created_at = $8,expense_date = $9, rejection_reason = $10 WHERE id = $11 RETURNING *';
  const values = [
    expense.user_id,
    expense.amount,
    expense.description,
    expense.bill_url,
    expense.status,
    expense.approved_by,
    expense.approved_at,
    expense.created_at,
    expense.expense_date,
    expense.rejection_reason,
    id,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteExpense = async (id) => {
  const query = 'DELETE FROM "expenses" WHERE id = $1';
  const values = [id];
  await pool.query(query, values);
};