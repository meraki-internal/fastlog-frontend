require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const route = require('./routes/router');

const app = express();
mongoose.connect(process.env.MONGO_DB_CONNECTION, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(cors());
app.use(express.json());
app.use(route);
 app.use((error, req, res, next) => {
  if (error.joi) {
    return res.status(400).json({error: error.joi.message});
  }

  return res.status(500).send(error)
});
module.exports = app;
