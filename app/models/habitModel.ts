import mongoose from 'mongoose';
const habitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
       ref: 'Category',
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
    priority: {
      type: String, 
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
 
  },
  {
    timestamps: true,
  }
);

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;