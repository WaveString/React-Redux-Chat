'use strict';

let express = require('express');
let http = require('http');
let path = require('path');
let bodyParser = require('body-parser');
let log = require('./libs/log')(module);
let ChatServer = require('./libs/chat').listen;
let config = require('./config/config.json');

const PORT = config.port;

// Express
const app = express();
const server = app.listen(PORT, () => {
  log.info('listening on *:' + PORT);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

// Routes
app.use('/*', (req, res) => {
   res.sendFile(path.join(__dirname, '/build/index.html'));
});

// Register Chat
ChatServer(server);

app.use((req, res, next) => {
    log.debug('Not found URL: %s', req.url);
    res.send(404, { error: 'Not found' });
    return;
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    log.error('Internal error(%d): %s', res.statusCode, err.message);
    res.send({ error: err.message });
    return;
});

app.get('/ErrorExample', (req, res, next) => {
    next(new Error('Random error!'));
});
