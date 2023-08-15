const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const swagger = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const routes = require('./routes/api');
const { missingRouteHandler, globalErrorHandler } = require('./middlewares');

const app = express();

const formatLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatLogger));
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api', routes);
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocument));

app.use(missingRouteHandler);
app.use(globalErrorHandler);

module.exports = app;
