export class FavoriteController {
  async addFavorite(req, res) {
    res.status(201).json({ message: 'Favorite added' });
  }
  async removeFavorite(req, res) {
    res.json({ message: 'Favorite removed' });
  }
  async getFavorites(req, res) {
    res.json({ message: 'List of favorites' });
  }
} 