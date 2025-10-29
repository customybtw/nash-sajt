const { query } = require('../config/database');

async function listProducts() {
  return query('SELECT * FROM products ORDER BY created_at DESC');
}

async function getProduct(slug) {
  const rows = await query('SELECT * FROM products WHERE slug = :slug LIMIT 1', { slug });
  return rows[0];
}

async function upsertProduct(id, data) {
  if (id) {
    await query(
      `UPDATE products SET name = :name, slug = :slug, description = :description, price = :price, image_url = :imageUrl,
        inventory = :inventory, seo_title = :seoTitle, seo_description = :seoDescription WHERE id = :id`,
      {
        id,
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl,
        inventory: data.inventory,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
      }
    );
    return query('SELECT * FROM products WHERE id = :id', { id }).then((rows) => rows[0]);
  }

  const result = await query(
    `INSERT INTO products (name, slug, description, price, image_url, inventory, seo_title, seo_description)
     VALUES (:name, :slug, :description, :price, :imageUrl, :inventory, :seoTitle, :seoDescription)`,
    {
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: data.price,
      imageUrl: data.imageUrl,
      inventory: data.inventory,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
    }
  );
  return query('SELECT * FROM products WHERE id = :id', { id: result.insertId }).then((rows) => rows[0]);
}

async function deleteProduct(id) {
  await query('DELETE FROM products WHERE id = :id', { id });
  return true;
}

async function listOrders() {
  const orders = await query('SELECT * FROM orders ORDER BY created_at DESC');
  return orders;
}

async function createOrder(order) {
  const result = await query(
    `INSERT INTO orders (order_number, customer_name, customer_email, total, status)
     VALUES (:orderNumber, :customerName, :customerEmail, :total, :status)`,
    {
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      total: order.total,
      status: order.status || 'pending',
    }
  );

  const orderId = result.insertId;
  for (const item of order.items) {
    await query(
      `INSERT INTO order_items (order_id, product_id, quantity, price)
       VALUES (:orderId, :productId, :quantity, :price)`,
      {
        orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }
    );
  }

  return query('SELECT * FROM orders WHERE id = :id', { id: orderId }).then((rows) => rows[0]);
}

module.exports = {
  listProducts,
  getProduct,
  upsertProduct,
  deleteProduct,
  listOrders,
  createOrder,
};
