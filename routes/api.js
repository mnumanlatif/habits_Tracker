import categoryController from '../app/controllers/categoryController.js';
import habitController from '../app/controllers/habitController.js';
import userController from '../app/controllers/userController.js';
export default function(app) {
  //Habits Routes
  app.get('/habbituser/:userId', habitController.getHabitsByUser);
  app.get('/habbitcategory/:categoryId', habitController.getHabitsByCategory);
  app.get('/habbit', habitController.getHabitsAll);
  app.post('/habbit/create', habitController.createHabit);
  app.put('/habbit/:id', habitController.updateHabit);
//Users Route
  app.get('/user',userController.getUsers);
  app.post('/user/create', userController.createUsers);
  app.put('/user/:id', userController.updateUsers);
//Category Route
  app.get('/category',categoryController.getCategories);
  app.post('/category/create', categoryController.createCategories);
  app.put('/category/:id', categoryController.updateCategories);
}