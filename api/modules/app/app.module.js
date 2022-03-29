const express = require('express');
const cors = require('cors');
const app = express();

app.use('/public', express.static('public'));
app.use(express.static('dist/ekaly-fo'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

module.exports = { app };
