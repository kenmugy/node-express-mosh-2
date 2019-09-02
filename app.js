const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('app');
const chalk = require('chalk');

const app = express();
const port = process.env.PORT || 4004;
const courses = require('./courses');

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// get methods
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

// post stuff
app.post('/api/courses', (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.status(201).send(course);
});

app.listen(port, () => debug(`listening on port ${chalk.green(port)}`));
