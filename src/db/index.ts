import mongoose from "mongoose";
require("dotenv").config();

const dbConnect = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }
  const uri = process.env.MONGODB_URI;
  mongoose.set('strictQuery', false);
  await mongoose.connect(uri);

  const connection = mongoose.connection;

    connection.once("open", () => {
        console.log("MongoDB database connection established successfully");
        }
    );
};

dbConnect().catch((err) => console.log(err));

export default dbConnect;