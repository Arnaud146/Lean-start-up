import { Router } from 'express';
import { FavoriteController } from '../controllers/favorite.controller';
const router = Router();
const controller = new FavoriteController();

router.post('/', controller.addFavorite);
router.delete('/:id', controller.removeFavorite);
router.get('/', controller.getFavorites);

export default router; 