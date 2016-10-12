const koa = require('koa');
const app = koa();
const router = require('./routes');

function* handle404Errors() {
  if (404 != this.status) return;
  this.redirect('/notfound');
}

//Use the routes defined using the router
app.use(router.routes());

app.use(handle404Errors);

app.listen(3000, () => {
  console.log('Server running on https://localhost:3000');
});