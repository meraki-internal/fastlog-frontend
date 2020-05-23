require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");


const route = require('./routes/router');


const app = express();
mongoose.connect("mongodb+srv://whitecode:andreregedit@documents-es7zu.gcp.mongodb.net/test?retryWrites=true&w=majority",{
    useUnifiedTopology:true,
    useNewUrlParser:true
});

app.use(cors());
app.use(express.json());
app.use(route);


module.exports = app;