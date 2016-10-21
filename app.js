const koa = require('koa');
var serve = require('koa-static');
var router = require('./routes');
var bodyParser = require('koa-body');
var app = koa();

//Set up Pug
var Pug = require('koa-pug');
var pug = new Pug({
  viewPath: './views',
  baseDir: './views',
  app: app
});

app.use(serve('./public'));
app.use(serve('./images'));

app.use(bodyParser({
  formidable: {
    uploadDir:'./uploads'
  },
  multipart: true,
  urlencoded: true
}));

app.use(router.routes());

app.listen(3000);




