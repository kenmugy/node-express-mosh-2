const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('app');
const chalk = require('chalk');

const app = express();
const port = process.env.PORT || 4004;
const courses = require('./courses');

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('this is the index page');
});

app.get('/api/courses', (req, res) => {
  res.json(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).json({ error: 'couldnt find course by that id' });
  res.json(course);
});

app.listen(port, () => debug(`listening on port ${chalk.green(port)}`));
