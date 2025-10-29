const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { Order, Product } = require('../models');

exports.listOrders = asyncHandler(async (req, res) => {
  const orders = await Order.findAll({ order: [['createdAt', 'DESC']] });
  return res.json({ success: true, data: orders });
});

exports.createOrder = asyncHandler(async (req, res) => {
  const { items = [], ...rest } = req.body;

  const calculatedTotal = await Promise.all(
    items.map(async (item) => {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        throw new ApiError(400, `Product ${item.productId} not found`);
      }
      return product.price * item.quantity;
    })
  ).then((results) => results.reduce((sum, value) => sum + value, 0));

  const order = await Order.create({
    ...rest,
    items,
    totalAmount: calculatedTotal,
  });

  return res.status(201).json({ success: true, data: order });
});

exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) {
    throw new ApiError(404, 'Order not found');
  }

  await order.update(req.body);
  return res.json({ success: true, data: order });
});
