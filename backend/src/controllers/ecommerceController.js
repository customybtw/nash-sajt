const slugify = require('slugify');
const { validationResult } = require('express-validator');
const { Product, Order, OrderItem } = require('../models');

const listProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ order: [['createdAt', 'DESC']] });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};

const upsertProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const payload = {
    name: req.body.name,
    slug: req.body.slug || slugify(req.body.name, { lower: true }),
    description: req.body.description,
    price: req.body.price,
    inventory: req.body.inventory,
    seoTitle: req.body.seoTitle,
    seoDescription: req.body.seoDescription,
    isActive: req.body.isActive,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl
  };

  try {
    let product;
    if (id) {
      product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      await product.update(payload);
    } else {
      product = await Product.create(payload);
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save product', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
};

const createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { customerName, customerEmail, customerPhone, items, notes, paymentProvider, paymentReference } = req.body;

  try {
    const order = await Order.create({
      customerName,
      customerEmail,
      customerPhone,
      notes,
      paymentProvider,
      paymentReference,
      subtotal: req.body.subtotal || 0,
      total: req.body.total || 0
    });

    if (Array.isArray(items)) {
      for (const item of items) {
        await OrderItem.create({
          OrderId: order.id,
          ProductId: item.productId || null,
          quantity: item.quantity,
          price: item.price,
          productName: item.productName
        });
      }
    }

    const result = await Order.findByPk(order.id, { include: [{ model: OrderItem, as: 'items' }] });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: [{ model: OrderItem, as: 'items' }], order: [['createdAt', 'DESC']] });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await order.update({ status });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order', error: error.message });
  }
};

module.exports = {
  listProducts,
  upsertProduct,
  deleteProduct,
  createOrder,
  listOrders,
  updateOrderStatus
};
