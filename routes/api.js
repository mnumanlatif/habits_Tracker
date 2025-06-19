/* eslint-disable global-require, func-names */

module.exports = function (app) {
  // home
  const habitController = require('../app/controllers/habitController');

app.get('/', habitController.getHabits);
app.post('/', habitController.createHabit);
app.put('/:id', habitController.updateHabit);
};
