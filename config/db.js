const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,  // why do we need this ??
    useUnifiedTopology: true, // and this ??
  });
  console.log(`mongoDB connected ${conn.connection.host}`);
};

module.exports = connectDB;
