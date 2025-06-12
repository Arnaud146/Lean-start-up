export class EmergencyController {
  async addContact(req, res) {
    res.status(201).json({ message: 'Emergency contact added' });
  }
  async removeContact(req, res) {
    res.json({ message: 'Emergency contact removed' });
  }
  async getContacts(req, res) {
    res.json({ message: 'List of emergency contacts' });
  }
} 