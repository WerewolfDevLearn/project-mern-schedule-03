const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes/api');

const app = express();

const formatLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatLogger));
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api', routes);

module.exports = app;
