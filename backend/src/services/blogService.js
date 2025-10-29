const { query } = require('../config/database');

async function listPosts() {
  return query('SELECT * FROM blog_posts ORDER BY COALESCE(published_at, created_at) DESC');
}

async function getPost(slug) {
  const rows = await query('SELECT * FROM blog_posts WHERE slug = :slug LIMIT 1', { slug });
  return rows[0];
}

async function upsertPost(id, data) {
  if (id) {
    await query(
      `UPDATE blog_posts SET title = :title, slug = :slug, excerpt = :excerpt, content = :content,
        cover_image = :coverImage, meta_title = :metaTitle, meta_description = :metaDescription,
        published_at = :publishedAt WHERE id = :id`,
      {
        id,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        publishedAt: data.publishedAt,
      }
    );
    return query('SELECT * FROM blog_posts WHERE id = :id', { id }).then((rows) => rows[0]);
  }

  const result = await query(
    `INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, meta_title, meta_description, published_at)
     VALUES (:title, :slug, :excerpt, :content, :coverImage, :metaTitle, :metaDescription, :publishedAt)`,
    {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      publishedAt: data.publishedAt,
    }
  );
  return query('SELECT * FROM blog_posts WHERE id = :id', { id: result.insertId }).then((rows) => rows[0]);
}

async function deletePost(id) {
  await query('DELETE FROM blog_posts WHERE id = :id', { id });
  return true;
}

module.exports = {
  listPosts,
  getPost,
  upsertPost,
  deletePost,
};
