const { query } = require('../config/database');

async function listCareers(includeInactive = false) {
  return query(
    includeInactive
      ? 'SELECT * FROM careers ORDER BY created_at DESC'
      : 'SELECT * FROM careers WHERE is_active = 1 ORDER BY created_at DESC'
  );
}

async function upsertCareer(id, data) {
  if (id) {
    await query(
      `UPDATE careers SET title = :title, location = :location, employment_type = :employmentType,
        description = :description, requirements = :requirements, meta_title = :metaTitle,
        meta_description = :metaDescription, is_active = :isActive WHERE id = :id`,
      {
        id,
        title: data.title,
        location: data.location,
        employmentType: data.employmentType,
        description: data.description,
        requirements: data.requirements,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        isActive: data.isActive ?? 1,
      }
    );
    return query('SELECT * FROM careers WHERE id = :id', { id }).then((rows) => rows[0]);
  }

  const result = await query(
    `INSERT INTO careers (title, location, employment_type, description, requirements, meta_title, meta_description, is_active)
     VALUES (:title, :location, :employmentType, :description, :requirements, :metaTitle, :metaDescription, :isActive)`,
    {
      title: data.title,
      location: data.location,
      employmentType: data.employmentType,
      description: data.description,
      requirements: data.requirements,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      isActive: data.isActive ?? 1,
    }
  );
  return query('SELECT * FROM careers WHERE id = :id', { id: result.insertId }).then((rows) => rows[0]);
}

async function deleteCareer(id) {
  await query('DELETE FROM careers WHERE id = :id', { id });
  return true;
}

module.exports = {
  listCareers,
  upsertCareer,
  deleteCareer,
};
