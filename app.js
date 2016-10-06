const koa = require('koa');
const app = koa();

app.use(function* () {
  this.body = 'Hello world!';
});

app.listen(3000, () => {
  console.log('Server running on https://localhost:3000');
});