const koa = require('koa');
const app = koa();
const router = require('./routes');

function* handle404Errors() {
  if (404 != this.status) return;
  this.redirect('/notfound');
}

function* middlewareWithError(next) {
  this.throw('Error message', 500);
}

//Use the routes defined using the router
//app.use(router.routes());

//app.use(handle404Errors);

app.use(function* (next) {
  try {
    yield next;
  } catch(err) {
    this.status = err.status || 500;
    this.body = err.message;
    this.app.emit('error', err, this);
  }
});

app.use(middlewareWithError);

app.listen(3000, () => {
  console.log('Server running on https://localhost:3000');
});