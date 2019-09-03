const express = require('express');

const couseRouter = express.Router();

const router = courses => {
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

  couseRouter.get('/', (req, res) => {
    res.json(courses);
  });

  couseRouter.get('/:id', (req, res) => {
    const course = courses.find(
      course => course.id === parseInt(req.params.id)
    );
    if (!course)
      return res.status(404).json({ error: "couldn't find course by that id" });
    res.json(course);
  });

  // post stuff
  couseRouter.post('/', (req, res) => {
    // joi schema
    const message = checkValidity(req.body);
    if (message) return res.status(400).send(message);
    const course = {
      id: courses.length + 1,
      name: req.body.name
    };
    courses.push(course);
    res.status(201).send(course);
  });

  // implementing put stuff
  couseRouter.put('/:id', (req, res) => {
    const course = courses.find(
      course => course.id === parseInt(req.params.id)
    );
    if (!course)
      return res.status(404).json({ error: "couldn't find course by that id" });
    const message = checkValidity(req.body);
    if (message) return res.status(400).send(message);
    course.name = req.body.name;
    res.send(course);
  });

  // implementing delete request
  couseRouter.delete('/:id', (req, res) => {
    const course = courses.find(
      course => course.id === parseInt(req.params.id)
    );
    if (!course)
      return res.status(404).json({ error: "couldn't find course by that id" });
    courses.splice(courses.indexOf(course), 1);
    res.send(course);
  });

  return couseRouter;
};

module.exports = router;
