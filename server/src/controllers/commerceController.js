import Stripe from 'stripe';
import paypal from 'paypal-rest-sdk';
import { validationResult } from 'express-validator';
import Product from '../models/Product.js';
import { Order, OrderItem } from '../models/Order.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' });

paypal.configure({
  mode: process.env.NODE_ENV === 'production' ? 'live' : 'sandbox',
  client_id: process.env.PAYPAL_CLIENT_ID || 'test',
  client_secret: process.env.PAYPAL_CLIENT_SECRET || 'test',
});

export const listProducts = async (_req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const upsertProduct = async (req, res, next) => {
  try {
    const payload = req.body;
    if (payload.name && !payload.slug) {
      payload.slug = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    let product;
    if (payload.id) {
      product = await Product.findByPk(payload.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      await product.update(payload);
    } else {
      product = await Product.create(payload);
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { customerName, customerEmail, items, paymentProvider, paymentToken } = req.body;

    const products = await Product.findAll({ where: { id: items.map((item) => item.productId) } });

    let total = 0;
    const orderItems = [];

    items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }
      const lineTotal = product.price * item.quantity;
      total += lineTotal;
      orderItems.push({ productId: product.id, quantity: item.quantity, price: product.price });
    });

    if (paymentProvider === 'stripe' && paymentToken) {
      await stripe.paymentIntents.create({
        amount: Math.round(total * 100),
        currency: 'eur',
        payment_method: paymentToken,
        confirm: true,
        receipt_email: customerEmail,
      });
    }

    const order = await Order.create({
      customerName,
      customerEmail,
      total,
      paymentProvider,
      status: 'processing',
    });

    await Promise.all(
      orderItems.map((item) =>
        OrderItem.create({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })
      )
    );

    res.status(201).json({ orderId: order.id });
  } catch (error) {
    next(error);
  }
};

export const listOrders = async (_req, res, next) => {
  try {
    const orders = await Order.findAll({ include: [{ model: OrderItem, as: 'items' }] });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};
