export class UserController {
  async getProfile(req, res) {
    res.json({ message: 'Get user profile' });
  }
  async updateProfile(req, res) {
    res.json({ message: 'Update user profile' });
  }
  async getHandicaps(req, res) {
    res.json({ message: 'Get user handicaps' });
  }
  async updateHandicaps(req, res) {
    res.json({ message: 'Update user handicaps' });
  }
  async getAutonomy(req, res) {
    res.json({ message: 'Get user autonomy' });
  }
  async updateAutonomy(req, res) {
    res.json({ message: 'Update user autonomy' });
  }
} 