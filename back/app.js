const express = require('express');
const postsRouter = require('./routes/post');
const app = express();
const db = require('./models');

db.sequelize.sync().then(() => {
  console.log('db 연결 성공');
});
app.get('/', (req, res) => {
  res.send('hello express');
});

app.get('/api', (req, res) => {
  res.send('hello api');
});
app.get('/api/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello' },
    { id: 1, content: 'hello' },
    { id: 1, content: 'hello' },
  ]);
});

app.use('/posts', postsRouter);

app.listen(4000, () => {
  console.log('4000 port run');
});
