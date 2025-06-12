export class AlertController {
  async sendAlert(req, res) {
    res.status(201).json({ message: 'Alert sent' });
  }
  async getAlerts(req, res) {
    res.json({ message: 'List of alerts' });
  }
} 