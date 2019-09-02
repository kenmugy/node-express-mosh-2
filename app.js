const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('app');
const chalk = require('chalk');
const Joi = require('joi');

const app = express();
const port = process.env.PORT || 4004;
const courses = require('./courses');

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const checkValidity = prop => {
  const schema = {
    name: Joi.string()
      .min(4)
      .required()
  };
  const result = Joi.validate(prop, schema);
  const { error } = result;
  if (error) {
    const {
      details: [{ message }]
    } = error;
    return message;
  }
};

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
  // joi schema
  const message = checkValidity(req.body);
  if (message) res.status(400).send(message);
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.status(201).send(course);
});

// implementing put stuff
app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  const message = checkValidity(req.body);
  if (message) res.status(400).send(message);
  course.name = req.body.name;
  res.send(course);
});

app.listen(port, () => debug(`listening on port ${chalk.green(port)}`));
