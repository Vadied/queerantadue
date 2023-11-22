import mongoose from "mongoose";

let isConnected = false;
const connectToDataBase = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("DB connected already");
    return;
  }

  if (!process.env.MONGODB_URI) {
    console.error("Missing MONGODB_URI");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "queerantadue",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;

    console.log("Database connected");
  } catch (error) {
    console.error(error);
  }
};

export default connectToDataBase;
