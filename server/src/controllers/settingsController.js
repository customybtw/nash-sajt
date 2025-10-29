const asyncHandler = require('../utils/asyncHandler');
const { Setting } = require('../models');

exports.listSettings = asyncHandler(async (req, res) => {
  const settings = await Setting.findAll({ order: [['group', 'ASC'], ['key', 'ASC']] });
  return res.json({ success: true, data: settings });
});

exports.upsertSetting = asyncHandler(async (req, res) => {
  const { key, value, description, group } = req.body;
  await Setting.upsert({ key, value, description, group });
  const setting = await Setting.findOne({ where: { key } });

  return res.json({ success: true, data: setting });
});
