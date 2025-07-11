import pg from "pg"
const { Pool } = pg
import dotenv from "dotenv"
dotenv.config()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false // This is crucial for Render's default self-signed certificates
  }
})
export default pool;
