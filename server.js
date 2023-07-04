require('dotenv').config();
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const expressWinston = require('express-winston');
const { transports, format } = require('winston');
require('winston-mongodb');

const app = express();
const logger = require('./config/logger');

const PORT = process.env.PORT || 3500;

connectDB();
app.use(cors(corsOptions));

app.use(
  expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true,
  })
);

app.use(express.json());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.header('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.header('Access-Control-Allow-Headers', '*');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.header('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use('/index', require('./routes/index'));
app.get('/:urltext', require('./routes/url'));

const myFormat = format.printf(({ level, meta, timestamp }) => {
  return `${timestamp} ${level}: ${meta.message}`;
});

app.use(
  expressWinston.errorLogger({
    transports: [
      new transports.Console(),
      new transports.MongoDB({
        db: process.env.DATABASE_URI,
        collection: 'logs',
      }),
    ],
    format: format.combine(format.json(), format.timestamp(), myFormat),
  })
);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});
