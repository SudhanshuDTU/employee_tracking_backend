import pool from "./config/db.js";

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Connection successful:', result.rows[0]);
  } catch (error) {
    console.error('Connection failed:', error.message);
  } finally {
    pool.end();
  }
}

testConnection();
