require('dotenv').config();
const http = require('http');
const cors = require('cors');

const app = require('./app/app.js');

const port = process.env.PORT || 3333;
const link = "localhost";

const server = http.Server(app);

server.listen(port, link, () => {
    console.log(`Server Running http://${link}:${port}`);
});