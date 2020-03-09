//no changes required

const express = require('express');
const logger = require('morgan');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
import { connect } from './config/db';
import { restRouter } from './api';
const swaggerDocument = require('./config/swagger.json');
import { configJWTStrategy } from './api/middlewares/passport-jwt';

const app = express();
const PORT = 3000;

connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(passport.initialize()); // req.user
configJWTStrategy();
app.use('/api', restRouter);
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
        explorer: true,
    })
);
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.message = 'Invalid route';
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        error: {
            message: error.message,
        },
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
});