const blogService = require('../services/blogService');

async function listPosts(req, res, next) {
  try {
    const posts = await blogService.listPosts();
    res.json(posts);
  } catch (error) {
    next(error);
  }
}

async function getPost(req, res, next) {
  try {
    const post = await blogService.getPost(req.params.slug);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
}

async function upsertPost(req, res, next) {
  try {
    const post = await blogService.upsertPost(req.params.id ? Number(req.params.id) : undefined, req.body);
    res.json(post);
  } catch (error) {
    next(error);
  }
}

async function deletePost(req, res, next) {
  try {
    await blogService.deletePost(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listPosts,
  getPost,
  upsertPost,
  deletePost,
};
