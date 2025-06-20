import express from 'express';
import * as breakController from '../controllers/breakController.js';

const router = express.Router();

router.get('/', breakController.getAllBreaks);
router.get('/:id', breakController.getBreakById);
router.get('/user/:id', breakController.getBreakByAttendanceId);
router.post('/', breakController.createBreak);
router.put('/:id', breakController.updateBreak);
router.delete('/:id', breakController.deleteBreak);

export default router;
