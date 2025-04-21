import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4) RETURNING id, name, email, role",
      [name,email,hashedPassword,role]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1",[email]);
    if(user.rows.length === 0){
        return res.status(404).json({error: "User not found"})
    }
    const isValid = await bcrypt.compare(password,user.rows[0].password)
    if(!isValid){
        return res.status(400).json({error: "Invalid Credentials"})
    }
    const token = jwt.sign({ userId: user.rows[0].id, role: user.rows[0].role }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    return res.json({ token, user: { id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email, role: user.rows[0].role } });

} catch (error) {
    res.status(500).json({ error: error.message });
}
};
