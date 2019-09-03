const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('app');
const chalk = require('chalk');
const Joi = require('joi');

const app = express();
const port = process.env.PORT || 4004;
const courses = require('./courses');
const coursesRouter = require('./coursesRoutes')(courses);

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/courses', coursesRouter);

app.listen(port, () => debug(`listening on port ${chalk.green(port)}`));
