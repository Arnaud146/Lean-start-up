import { Router } from 'express';
import { ExerciseController } from '../controllers/exercise.controller';
const router = Router();
const controller = new ExerciseController();

router.post('/', controller.createExercise);
router.get('/', controller.getExercises);
router.put('/:id', controller.updateExercise);
router.delete('/:id', controller.deleteExercise);

export default router; 