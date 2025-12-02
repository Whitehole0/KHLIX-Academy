import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://kgks1603_db_user:05O6Y0VlSunHryXr@kaleab.pcva0qj.mongodb.net/?appName=kaleab",
      {
        // options added by mongoose 7+ auto by default; ok to omit
      }
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
