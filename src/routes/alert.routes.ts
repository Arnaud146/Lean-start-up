import { Router } from 'express';
import { AlertController } from '../controllers/alert.controller';
const router = Router();
const controller = new AlertController();

router.post('/', controller.sendAlert);
router.get('/', controller.getAlerts);

export default router; 