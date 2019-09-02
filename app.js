const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('app');
const chalk = require('chalk');

const app = express();
const port = process.env.PORT || 4004;
const courses = require('./courses');

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json(courses);
});

app.listen(port, () => debug(`listening on port ${chalk.green(port)}`));
