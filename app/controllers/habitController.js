const Habit = require('../models/habitModel');

// Get all habits
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

// Create a new habit
exports.createHabit = async (req, res) => {
  const { id, name, frequency } = req.body;

  if (!id || !name || !frequency) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existing = await Habit.findOne({ id });
    if (existing) {
      return res.status(409).json({ error: 'Habit with this ID already exists' });
    }

    const habit = new Habit({ id, name, frequency });
    await habit.save();
    res.status(201).json({ message: 'Habit created', habit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

// Update a habit
exports.updateHabit = async (req, res) => {
  // const { id } = req.params;
  const { name, frequency } = req.body;

  if (!name || !frequency) {
    return res.status(400).json({ error: 'Name and frequency are required' });
  }

  try {
    const habit = await Habit.findOneAndUpdate(
      { name, frequency },
      { new: true }
    );

    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    res.status(200).json({ message: 'Habit updated', habit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};
