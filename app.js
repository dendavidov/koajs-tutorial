const koa = require('koa');
const app = koa();
const router = require('./routes');

var Pug = require('koa-pug');

var pug = new Pug({
  viewPath: './views',
  basedir: './views',
  app: app
});

app.use(router.routes());

//Use the routes defined using the router

function* handle404Errors(next) {
  if (404 != this.status) return;
  this.redirect('/notfound');
}

app.use(handle404Errors);

app.listen(3000, () => {
  console.log('Server running on https://localhost:3000');
});