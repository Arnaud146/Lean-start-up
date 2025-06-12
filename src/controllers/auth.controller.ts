export class AuthController {
  async register(req, res) {
    // TODO: Implémenter l'inscription
    res.status(201).json({ message: 'Register endpoint' });
  }

  async login(req, res) {
    // TODO: Implémenter la connexion
    res.status(200).json({ message: 'Login endpoint' });
  }
} 