import mongoose, { Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import Habit from './habitModel.js'; 

export interface IUser extends Document {
  _id?: String;
  userId: string;
  name: string;
  userName: string;
  password: string;
  email: string;
  age: number;
  department?: string;
}


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
userSchema.pre('save', async function (this: IUser, next) {
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

const User = mongoose.model<IUser>('User', userSchema);
export default User;
