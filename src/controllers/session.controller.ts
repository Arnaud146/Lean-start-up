export class SessionController {
  async createSession(req, res) {
    res.status(201).json({ message: 'Session created' });
  }
  async getSessions(req, res) {
    res.json({ message: 'List of sessions' });
  }
  async validateSession(req, res) {
    res.json({ message: 'Session validated' });
  }
} 