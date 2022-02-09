const express = require('express');
const postsRouter = require('./routes/post');
const userRouter = require('./routes/user');
const app = express();
const db = require('./models');
const cors = require('cors');

db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공!');
  })
  .catch(console.error);

//cors 설정
app.use(
  cors({
    origin: '*',
    credential: false,
  }),
);

//front 요청 데이터를 req로 받음
app.use(express.json()); //front json
app.use(express.urlencoded({ extended: true })); //form submit

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
app.use('/users', userRouter);

app.listen(4000, () => {
  console.log('4000 port run');
});
