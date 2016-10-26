const koa = require('koa');
const bodyParser = require('koa-body');

//Require the Router we defined in movies.js
const movies = require('./movies');

const app = koa();

//Set up body parsing middleware
app.use(bodyParser({
  formidable: {
    uploadDir: './uploads',
    multipart: true,
    urlencoded: true
  }
}));

app.use(movies.routes());

app.listen(3000);