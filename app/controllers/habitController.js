import Habit from '../models/habitModel.js';

// Get all habits
const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

// Create a new habit
const createHabit = async (req, res) => {
  const {
    userId,
    name,
    frequency,
    description,
    priority,
    category,
  } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'USER ID NOT FOUND' });
  }

  try {
    // Check if a habit already exists for this user
    const existingHabit = await Habit.findOne({ userId });
    if (existingHabit) {
      return res.status(409).json({ error: 'Habit already exists for this user' });
    }

    const habit = new Habit({
      userId,
      name,
      frequency,
      description,
      priority,
      category,
    });

    await habit.save();
    res.status(201).json({ message: 'Habit created', habit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};


// Update a habit
const updateHabit = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    frequency,
    description,
    priority,
    category,
    isArchived,
  } = req.body;

  try {
    const habit = await Habit.findByIdAndUpdate(
      id,
      {
        name,
        frequency,
        description,
        priority,
        category,
        isArchived,
        updatedAt: new Date(),
      },
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

export default {
  getHabits,
  createHabit,
  updateHabit,
};
