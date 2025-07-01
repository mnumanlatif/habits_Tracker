import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import Habit from './habitModel.js'; 

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: () => uuidv4(),
    },
    name: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    department: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

// ✅ Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ✅ Cascade delete: when a user is deleted, delete their habits
userSchema.pre('findOneAndDelete', async function (next) {
  const query = this.getFilter();
  await Habit.deleteMany({ userId: query._id });
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
