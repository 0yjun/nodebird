const express = require('express');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const app = express();
const db = require('./models');
const cors = require('cors');
const passportConfig = require('./passport');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공!');
  })
  .catch(console.error);
passportConfig();

//cors 설정
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(morgan('dev'));
dotenv.config();
//front 요청 데이터를 req로 받음
app.use(express.json()); //front json
app.use(express.urlencoded({ extended: true })); //form submit
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: 'nodebirdsecret',
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use('/', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('hello express');
});

app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);

app.listen(4000, () => {
  console.log('4000 port run');
});
