import mongoose, { Mongoose } from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGO_URI, {
      dbName: 'copy-generator', //! This is the name of your database in Mongo_URI
      bufferCommands: false,
      connectTimeoutMS: 30000,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
