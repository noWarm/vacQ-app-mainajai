const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();
// Use a json body parser
// declare this before you setupt the hospitalRouter naja jubjub
app.use(express.json());
app.use(cookieParser());

app.use(cors());

// prevent sql-injection by sanitizing the data first
app.use(mongoSanitize());

// set security headers
app.use(helmet());

// prevent xss
app.use(xss());

//Rate Limiting
const limiter = rateLimit({
  windowsMs: 10 * 60 * 1000, //10 mins
  max: 100,
});
app.use(limiter);

// use swagger so that it shows the api routes
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express VacQ API",
    },
  },
  apis: ["./routes/*.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Mount the routers
// important that you mount the router after you used all other npm packages
const hospitalRouter = require("./routes/hospitals");
const authRouter = require("./routes/auth");
const appointmentRouter = require("./routes/appointments");

app.use("/api/v1/hospitals", hospitalRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/appointments", appointmentRouter);

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
