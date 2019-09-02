const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('app');
const chalk = require('chalk');

const app = express();
const port = process.env.PORT || 4004;

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('initial commit');
});

app.listen(port, () => debug(`listening on port ${chalk.green(port)}`));
