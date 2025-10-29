import { validationResult } from 'express-validator';
import BlogPost from '../models/BlogPost.js';
import createSlug from '../utils/slugify.js';
import ImageAsset from '../models/ImageAsset.js';
import User from '../models/User.js';

export const listPosts = async (_req, res, next) => {
  try {
    const posts = await BlogPost.findAll({
      where: {},
      include: [
        { model: ImageAsset, as: 'heroImage' },
        { model: User, as: 'author', attributes: ['id', 'firstName', 'lastName'] },
      ],
      order: [['publishedAt', 'DESC']],
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const post = await BlogPost.findOne({
      where: { slug },
      include: [
        { model: ImageAsset, as: 'heroImage' },
        { model: User, as: 'author', attributes: ['id', 'firstName', 'lastName'] },
      ],
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const upsertPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const payload = { ...req.body };
    if (payload.title && !payload.slug) {
      payload.slug = createSlug(payload.title);
    }

    let post;
    if (payload.id) {
      post = await BlogPost.findByPk(payload.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      await post.update(payload);
    } else {
      post = await BlogPost.create(payload);
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    await post.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
