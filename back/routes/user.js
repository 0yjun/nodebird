const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcypt = require('bcrypt');

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
