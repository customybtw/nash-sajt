const slugify = require('slugify');
const { validationResult } = require('express-validator');
const { BlogPost, User } = require('../models');

const listPosts = async (req, res) => {
  try {
    const posts = await BlogPost.findAll({
      where: req.query.published === 'true' ? { isPublished: true } : undefined,
      order: [['publishedAt', 'DESC']],
      include: [{ model: User, as: 'author', attributes: ['id', 'firstName', 'lastName'] }]
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blog posts', error: error.message });
  }
};

const upsertPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const payload = {
    title: req.body.title,
    slug: req.body.slug || slugify(req.body.title, { lower: true }),
    excerpt: req.body.excerpt,
    content: req.body.content,
    seoTitle: req.body.seoTitle,
    seoDescription: req.body.seoDescription,
    isPublished: req.body.isPublished,
    publishedAt: req.body.isPublished ? req.body.publishedAt || new Date() : null,
    featuredImageUrl: req.file ? `/uploads/${req.file.filename}` : req.body.featuredImageUrl,
    authorId: req.user.id
  };

  try {
    let post;
    if (id) {
      post = await BlogPost.findByPk(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      await post.update(payload);
    } else {
      post = await BlogPost.create(payload);
    }
    const result = await BlogPost.findByPk(post.id, { include: [{ model: User, as: 'author' }] });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save blog post', error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    await BlogPost.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete blog post', error: error.message });
  }
};

module.exports = {
  listPosts,
  upsertPost,
  deletePost
};
