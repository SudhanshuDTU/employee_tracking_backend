import pool from '../config/db.js';

export const getAllAttendanceOverride = async () => {
    const query = 'SELECT * FROM "attendance_overrides"';
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error in attendanceOverrideModel.getAll:", error);
        throw error;
    }
}
export const getAttendanceOverrideById = async (id) => {
    const query = 'SELECT * FROM "attendance_overrides" WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
};
export const getAttendanceOverrideByUserId = async (user_id) => {
    const query = 'SELECT * FROM "attendance_overrides" WHERE user_id = $1';
    const values = [user_id];
    const result = await pool.query(query, values);
    return result.rows;
};

export const createAttendanceOverride = async (userId, date, time, reason) => {
    const query = 'INSERT INTO "attendance_overrides" (user_id, date, time, reason) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [userId, date, time, reason];
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error in attendanceOverrideModel.create:", error); 
        throw error; 
    }
}
export const updateAttendanceOverride = async (id, date, time, reason, status) => {
    const query = 'UPDATE "attendance_overrides" SET date = $1, time = $2, reason = $3, status = $4 WHERE id = $5 RETURNING *';
    const values = [date, time, reason, status, id];
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error in attendanceOverrideModel.update:", error);
        throw error;
    }
}
export const deleteAttendanceOverride =  async (id) => {
    const query = 'DELETE FROM "attendance_overrides" WHERE id = $1 RETURNING *';
    const values = [id];
    try {
       await pool.query(query, values);
       
    } catch (error) {
        console.error("Error in attendanceOverrideModel.delete:", error);
        throw error;
    }
}