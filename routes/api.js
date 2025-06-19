import habitController from '../app/controllers/habitController.js';

export default function(app) {
  app.get('/habbit', habitController.getHabits);
  app.post('/habbit/create', habitController.createHabit);
  app.put('/habbit/:id', habitController.updateHabit);
}
