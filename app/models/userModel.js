import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
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
    age: {
      type: String, 
      required: true,
    },
    department: {
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
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
