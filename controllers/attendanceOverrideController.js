import * as AttendanceOverride from '../models/attendance_overrideModel.js'

export const createAttendanceOverride = async (req, res) => {
    const { userId, date, time, reason } = req.body;
    try {
        const newOverride = await AttendanceOverride.createAttendanceOverride(userId,date,time,reason)
        res.status(201).json(newOverride);
    } catch (error) { 
        res.status(500).json({ error: 'Failed to create attendance override', details: error.message });
    }
}

export const updateAttendanceOverride = async (req, res) => {
    const { id } = req.params;
    const { date, time, reason, status } = req.body;
    try {
        const updatedOverride = await AttendanceOverride.updateAttendanceOverride(id, date, time, reason, status);
        if (!updatedOverride) {
            return res.status(404).json({ error: 'Attendance override not found' });
        }
        res.status(200).json(updatedOverride);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update attendance override', details: error.message });
    }
}
export const getAttendanceOverrideById =  async (req, res) => {
    const { id } = req.params;
    try {
        const override = await AttendanceOverride.getAttendanceOverrideById(id);
        if (!override) {
            return res.status(404).json({ error: 'Attendance override not found' });
        }
        res.status(200).json(override);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get attendance override', details: error.message });
    }
}


export const getAttendanceOverrideByUserId =  async (req, res) => {
    const { user_id } = req.params;
    try {
        const override = await AttendanceOverride.getAttendanceOverrideByUserId(user_id);
        if (!override) {
            return res.status(404).json({ error: 'Attendance override not found' });
        }
        res.status(200).json(override);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get attendance override', details: error.message });
    }
}
export const getAllAttendanceOverride = async (req, res) => {
    try {
        const overrides = await AttendanceOverride.getAllAttendanceOverride();
        res.status(200).json(overrides);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get all attendance overrides', details: error.message });
    }
}
export const deleteAttendanceOverride = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedOverride = await AttendanceOverride.deleteAttendanceOverride(id);
         if (!deletedOverride) {
            return res.status(404).json({ error: 'Attendance override not found' });
        }
        res.status(200).json({ message: 'Attendance override deleted successfully', deletedOverride });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete attendance override', details: error.message });
    }}