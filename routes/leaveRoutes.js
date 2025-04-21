import express from 'express';
import * as leaveController from '../controllers/leaveController.js';

const router = express.Router();

router.get('/', leaveController.getAllLeaves);
router.get('/:id', leaveController.getLeaveById);
router.post('/', leaveController.createLeave);
router.put('/:id', leaveController.updateLeave);
router.delete('/:id', leaveController.deleteLeave);

export default router;
