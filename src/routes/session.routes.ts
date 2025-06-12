import { Router } from 'express';
import { SessionController } from '../controllers/session.controller';
const router = Router();
const controller = new SessionController();

router.post('/', controller.createSession);
router.get('/', controller.getSessions);
router.post('/:id/validate', controller.validateSession);

export default router; 