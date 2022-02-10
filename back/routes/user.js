const express = require('express');
const router = express.Router();
const { User, Post } = require('../models');
const bcypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');

/*로그인 */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async loginErr => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

/*로그아웃 */
router.post('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

/*회원가입*/
router.post('/', async (req, res, next) => {
  console.log('post user 요청');
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디 입니다.');
    }

    const hashedPassport = await bcypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      password: hashedPassport,
      nickname: req.body.nickname,
    });
    res.status(200).send('ok');
  } catch (error) {
    console.error(error);
    next(error); //500
  }
});

module.exports = router;
