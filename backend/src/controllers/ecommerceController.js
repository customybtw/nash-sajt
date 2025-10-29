const ecommerceService = require('../services/ecommerceService');

async function listProducts(req, res, next) {
  try {
    const products = await ecommerceService.listProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
}

async function getProduct(req, res, next) {
  try {
    const product = await ecommerceService.getProduct(req.params.slug);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function upsertProduct(req, res, next) {
  try {
    const product = await ecommerceService.upsertProduct(req.params.id ? Number(req.params.id) : undefined, req.body);
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    await ecommerceService.deleteProduct(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function listOrders(req, res, next) {
  try {
    const orders = await ecommerceService.listOrders();
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

async function createOrder(req, res, next) {
  try {
    const order = await ecommerceService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listProducts,
  getProduct,
  upsertProduct,
  deleteProduct,
  listOrders,
  createOrder,
};
