require('dotenv').config();
const express = require('express');
const app = express();
var http = require('http');
const apiServer = require('./api-server');
const cors = require('cors');
const socketServer = require('./socket-server');

const port = process.env.PORT || 5000;
var server = http.createServer(app);
app.use(express.json());
app.use(cors());

apiServer(app);
socketServer(server);


server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
    return true
}); 