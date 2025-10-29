const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { BlogPost, User } = require('../models');

exports.listPosts = asyncHandler(async (req, res) => {
  const posts = await BlogPost.findAll({
    order: [['publishedAt', 'DESC']],
    include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }],
  });
  return res.json({ success: true, data: posts });
});

exports.getPost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findOne({
    where: { slug: req.params.slug },
    include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }],
  });
  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  return res.json({ success: true, data: post });
});

exports.createPost = asyncHandler(async (req, res) => {
  const post = await BlogPost.create({ ...req.body, authorId: req.user.id });
  return res.status(201).json({ success: true, data: post });
});

exports.updatePost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findByPk(req.params.id);
  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  await post.update(req.body);
  return res.json({ success: true, data: post });
});

exports.deletePost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findByPk(req.params.id);
  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  await post.destroy();
  return res.status(204).send();
});
