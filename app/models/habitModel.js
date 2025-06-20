// models/habit.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js'; // Make sure your DB connection is initialized here

const Habit = sequelize.define('Habit', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    references: {
      model: 'Users', // table name (ensure you define this User model separately)
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  frequency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  streak: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium',
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'General',
  },
}, {
  timestamps: true, // createdAt and updatedAt are auto-handled
  tableName: 'Habits', // optional: customize table name
});

export default Habit;
