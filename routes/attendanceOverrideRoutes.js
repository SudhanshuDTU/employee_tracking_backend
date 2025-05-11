import express from 'express';
import * as attendanceOverrideController from '../controllers/attendanceOverrideController.js';

const router = express.Router();

router.post('/', attendanceOverrideController.createAttendanceOverride);
router.get('/', attendanceOverrideController.getAllAttendanceOverride);
router.get('/:id', attendanceOverrideController.getAttendanceOverrideById);
router.get('/:user_id', attendanceOverrideController.getAttendanceOverrideByUserId);

router.put('/:id', attendanceOverrideController.updateAttendanceOverride);

router.delete('/:id', attendanceOverrideController.deleteAttendanceOverride);

export default router;
