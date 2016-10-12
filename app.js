const koa = require('koa');
const app = koa();
const router = require('./routes');

//Use the routes defined using the router
app.use(router.routes());

app.listen(3000, () => {
  console.log('Server running on https://localhost:3000');
});