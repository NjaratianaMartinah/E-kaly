const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const expressUnless = require('express-unless');
const jwt = require('../../helpers/jwt.helper');
const errorHandler = require('../../helpers/errorHandler.helper');
const app = express();

jwt.authenticateToken.unless = expressUnless;

app.use( cors());
app.use((req, res, next) =>{
  res.header('Access-Control-Allow-Origin', '*');

  res.header('Access-Control-Allow-Origin','Origin, X-Requested-width, Content-Type, Accept','Authorization');
  next();

  app.options('*', (req, res) =>{
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    res.send();
  })
})



app.use(fileUpload({
  createParentPath: true,
  limits: {
      fileSize: 1024 * 1024 * 1024 //1MB max file(s) size
  },
}));

app.use('/uploads', express.static('uploads'));
app.use(express.static('dist/ekaly-fo'));

// app.use(jwt.authenticateToken.unless({
//   path: [
//     {url: "/api/user/login", methods: ['POST']},
//     {url: "/api/user/register", methods: ['POST']},
//     {url: "/ekaly/*", methods: ['POST','GET']},
//     {url: "/ekaly/", methods: ['POST','GET']},
//     {url: "/assets/", methods: ['POST','GET']},
//     {url: "/assets/*", methods: ['POST','GET']}
//   ]
// }))

app.use(express.json());
app.use(express.urlencoded( { extended : false }));
app.use( cors() );
module.exports = { app };
