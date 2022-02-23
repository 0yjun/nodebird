const express = require('express');
const router = express.Router();
const { Post, User, Image, Comment } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res, next) => {
  try {
    console.log('parseInt(req.query.lastId, 10', parseInt(req.query.lastId, 10));
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      //초기 로딩이 아닐 경우
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ['id', 'nickname'] }],
        },
        {
          model: Post,
          as: 'Retweet',
          include: [{ model: User, attributes: ['id', 'nickname'] }, { model: Image }],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
