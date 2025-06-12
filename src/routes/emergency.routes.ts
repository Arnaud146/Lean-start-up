import { Router } from 'express';
import { EmergencyController } from '../controllers/emergency.controller';
const router = Router();
const controller = new EmergencyController();

router.post('/', controller.addContact);
router.delete('/:id', controller.removeContact);
router.get('/', controller.getContacts);

export default router; 