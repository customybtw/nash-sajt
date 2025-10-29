const { query } = require('../config/database');

async function getPages() {
  return query('SELECT * FROM pages ORDER BY slug');
}

async function getPageBySlug(slug) {
  const rows = await query('SELECT * FROM pages WHERE slug = :slug LIMIT 1', { slug });
  return rows[0];
}

async function upsertPage(slug, data) {
  const existing = await getPageBySlug(slug);
  if (existing) {
    await query(
      `UPDATE pages SET title = :title, description = :description, content = :content, meta_title = :metaTitle,
        meta_description = :metaDescription, meta_keywords = :metaKeywords, hero_image = :heroImage WHERE slug = :slug`,
      {
        slug,
        title: data.title,
        description: data.description,
        content: data.content,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        heroImage: data.heroImage,
      }
    );
    return getPageBySlug(slug);
  }

  await query(
    `INSERT INTO pages (slug, title, description, content, meta_title, meta_description, meta_keywords, hero_image)
     VALUES (:slug, :title, :description, :content, :metaTitle, :metaDescription, :metaKeywords, :heroImage)`,
    {
      slug,
      title: data.title,
      description: data.description,
      content: data.content,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      metaKeywords: data.metaKeywords,
      heroImage: data.heroImage,
    }
  );
  return getPageBySlug(slug);
}

async function listGallery() {
  return query('SELECT * FROM gallery_images ORDER BY created_at DESC');
}

async function createGalleryImage(data) {
  const result = await query(
    `INSERT INTO gallery_images (title, description, image_url, alt_text, meta_title, meta_description)
     VALUES (:title, :description, :imageUrl, :altText, :metaTitle, :metaDescription)`,
    {
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      altText: data.altText,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
    }
  );
  return query('SELECT * FROM gallery_images WHERE id = :id', { id: result.insertId }).then((rows) => rows[0]);
}

async function updateGalleryImage(id, data) {
  await query(
    `UPDATE gallery_images SET title = :title, description = :description, image_url = :imageUrl, alt_text = :altText,
      meta_title = :metaTitle, meta_description = :metaDescription WHERE id = :id`,
    {
      id,
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      altText: data.altText,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
    }
  );
  return query('SELECT * FROM gallery_images WHERE id = :id', { id }).then((rows) => rows[0]);
}

async function deleteGalleryImage(id) {
  await query('DELETE FROM gallery_images WHERE id = :id', { id });
  return true;
}

async function listPricingPlans() {
  return query('SELECT * FROM pricing_plans WHERE is_active = 1 ORDER BY price ASC');
}

async function upsertPricingPlan(id, data) {
  if (id) {
    await query(
      `UPDATE pricing_plans SET name = :name, price = :price, billing_cycle = :billingCycle, description = :description,
        features = :features, seo_title = :seoTitle, seo_description = :seoDescription, is_active = :isActive WHERE id = :id`,
      {
        id,
        name: data.name,
        price: data.price,
        billingCycle: data.billingCycle,
        description: data.description,
        features: JSON.stringify(data.features || []),
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        isActive: data.isActive ?? 1,
      }
    );
    return query('SELECT * FROM pricing_plans WHERE id = :id', { id }).then((rows) => rows[0]);
  }

  const result = await query(
    `INSERT INTO pricing_plans (name, price, billing_cycle, description, features, seo_title, seo_description, is_active)
     VALUES (:name, :price, :billingCycle, :description, :features, :seoTitle, :seoDescription, :isActive)`,
    {
      name: data.name,
      price: data.price,
      billingCycle: data.billingCycle,
      description: data.description,
      features: JSON.stringify(data.features || []),
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      isActive: data.isActive ?? 1,
    }
  );
  return query('SELECT * FROM pricing_plans WHERE id = :id', { id: result.insertId }).then((rows) => rows[0]);
}

module.exports = {
  getPages,
  getPageBySlug,
  upsertPage,
  listGallery,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  listPricingPlans,
  upsertPricingPlan,
};
