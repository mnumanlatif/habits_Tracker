import habitController from '../app/controllers/habitController.js';
import userController from '../app/controllers/userController.js';
export default function(app) {
  app.get('/habbit', habitController.getHabits);
  app.post('/habbit/create', habitController.createHabit);
  app.put('/habbit/:id', habitController.updateHabit);

  app.get('/user',userController.getUsers);
  app.post('/user/create', userController.createUsers);
  app.put('/user/:id', userController.updateUsers);
}
