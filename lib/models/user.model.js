import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      unique: true,
    },

    photo: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },

    role: {
      type: String,
      enum: ['admin', 'user'],
      required: true,
      default: 'user',
    },

    accountType: {
      type: String,
      enum: ['inactive', 'active', 'lifetime'],
      required: true,
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

const User = models?.User || model('User', userSchema);

export default User;
