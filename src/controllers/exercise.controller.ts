export class ExerciseController {
  async createExercise(req, res) {
    res.status(201).json({ message: 'Exercise created' });
  }
  async getExercises(req, res) {
    res.json({ message: 'List of exercises' });
  }
  async updateExercise(req, res) {
    res.json({ message: 'Exercise updated' });
  }
  async deleteExercise(req, res) {
    res.json({ message: 'Exercise deleted' });
  }
} 