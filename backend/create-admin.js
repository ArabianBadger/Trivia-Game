import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./modules/users/models/userModel.js";

dotenv.config();

async function createAdminUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const admin = await User.findOne({ email: "admin@trivia.com" });
    
    if (admin) {
      admin.isVerified = true;
      admin.otp = undefined;
      admin.otpExpires = undefined;
      await admin.save();
      console.log("Admin user updated successfully");
    } else {
      const newAdmin = new User({
        username: "admin",
        email: "admin@trivia.com",
        password: "admin123",
        role: "admin",
        isVerified: true,
      });
      await newAdmin.save();
      console.log("Admin user created successfully");
    }

    console.log("\nLogin credentials:");
    console.log("Email: admin@trivia.com");
    console.log("Password: admin123\n");

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
}

createAdminUser();
