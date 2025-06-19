import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: 'User', 
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    frequency: {
      type: String, 
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    streak: {
      type: Number,
      default: 0,
    },
    completedDates: {
      type: [Date], 
      default: [],
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String, 
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    category: {
      type: String, 
      default: 'General',
    },
 
  },
  {
    timestamps: true,
  }
);

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
