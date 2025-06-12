import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
const router = Router();
const controller = new UserController();

router.get('/profile', controller.getProfile);
router.put('/profile', controller.updateProfile);
router.get('/handicaps', controller.getHandicaps);
router.put('/handicaps', controller.updateHandicaps);
router.get('/autonomy', controller.getAutonomy);
router.put('/autonomy', controller.updateAutonomy);

export default router; 