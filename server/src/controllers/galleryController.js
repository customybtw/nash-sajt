import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { validationResult } from 'express-validator';
import ImageAsset from '../models/ImageAsset.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

export const uploader = multer({ storage });

export const listImages = async (_req, res, next) => {
  try {
    const images = await ImageAsset.findAll();
    res.json(images);
  } catch (error) {
    next(error);
  }
};

export const createImage = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const file = req.file;
    const { altText, caption, seoTitle, seoDescription } = req.body;
    if (!file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const image = await ImageAsset.create({
      filename: file.filename,
      url: `/uploads/${file.filename}`,
      altText,
      caption,
      seoTitle,
      seoDescription,
      metadata: { mimetype: file.mimetype, size: file.size },
    });

    res.status(201).json(image);
  } catch (error) {
    next(error);
  }
};

export const updateImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const image = await ImageAsset.findByPk(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    await image.update(req.body);
    res.json(image);
  } catch (error) {
    next(error);
  }
};

export const deleteImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const image = await ImageAsset.findByPk(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const filePath = path.join(uploadDir, image.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await image.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
