import express from 'express';
import * as odometerController from '../controllers/odometerController.js';

const router = express.Router();

router.get('/', odometerController.getAllOdometerReadings);
router.get('/:id', odometerController.getOdometerReadingById);
router.post('/', odometerController.createOdometerReading);
router.put('/:id', odometerController.updateOdometerReading);
router.delete('/:id', odometerController.deleteOdometerReading);

export default router;
