import DomainRecord from '../models/DomainRecord.js';

export const listDomainRecords = async (_req, res, next) => {
  try {
    const records = await DomainRecord.findAll({ order: [['renewalDate', 'ASC']] });
    res.json(records);
  } catch (error) {
    next(error);
  }
};

export const upsertDomainRecord = async (req, res, next) => {
  try {
    const payload = req.body;
    let record;

    if (payload.id) {
      record = await DomainRecord.findByPk(payload.id);
      if (!record) {
        return res.status(404).json({ message: 'Domain record not found' });
      }
      await record.update(payload);
    } else {
      record = await DomainRecord.create(payload);
    }

    res.json(record);
  } catch (error) {
    next(error);
  }
};

export const deleteDomainRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const record = await DomainRecord.findByPk(id);
    if (!record) {
      return res.status(404).json({ message: 'Domain record not found' });
    }
    await record.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
