import express from 'express';
import * as attendanceController from '../controllers/attendanceController.js';

const router = express.Router();

router.get('/', attendanceController.getAllAttendance);
router.post('/check-in', attendanceController.checkIn);
router.post('/check-out', attendanceController.checkOut);
router.put('/location/update-location',attendanceController.handleLocationUpdate)
router.get('/:id', attendanceController.getAttendanceById);
router.get('/user/:id', attendanceController.getAttendanceByUserId);
router.post('/', attendanceController.createAttendance);
router.put('/:id', attendanceController.updateAttendance);
router.put('/break/:id', attendanceController.updateBreakInAttendance);
router.delete('/:id', attendanceController.deleteAttendance);
router.put('/update-location',attendanceController.handleLocationUpdate)

export default router;
