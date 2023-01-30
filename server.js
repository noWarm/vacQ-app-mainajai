const express = require('express');

const dotenv = require('dotenv');

dotenv.config({path:'./config/config.env'});

const app = express();

// Mount the router
const hospitalRouter =  require('./routes/hospitals')
app.use('/api/v1/hospitals', hospitalRouter);

const PORT=process.env.PORT || 5000;
app.listen(PORT, console.log('server running in ', process.env.NODE_ENV, ' mode on port ', PORT));