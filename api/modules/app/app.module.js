const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();


app.use(fileUpload({
  createParentPath: true,
  limits: {
      fileSize: 1024 * 1024 * 1024 //1MB max file(s) size
  },
}));

app.use('/uploads', express.static('uploads'));
app.use(express.static('dist/ekaly-fo'));
app.use(express.json());
app.use(express.urlencoded( { extended : false }));
app.use( cors() );
module.exports = { app };
