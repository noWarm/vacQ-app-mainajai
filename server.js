const express = require("express");
const connectDB = require("./config/db");
const cookieParser=require('cookie-parser');

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();
// Use a json body parser
// declare this before you setupt the hospitalRouter naja jubjub
app.use(express.json());
app.use(cookieParser());

// Mount the routers
const hospitalRouter = require("./routes/hospitals");
const authRouter = require("./routes/auth");

app.use("/api/v1/hospitals", hospitalRouter);
app.use("/api/v1/auth",authRouter);

const PORT = process.env.PORT || 5555;
const server = app.listen(
  PORT,
  console.log(
    "server running in ",
    process.env.NODE_ENV,
    " mode on port ",
    PORT
  )
);

// handle unhandled promise rejection
// probably from the async call of connectDB()
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
