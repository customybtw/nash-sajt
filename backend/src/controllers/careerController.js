const careerService = require('../services/careerService');

async function listCareers(req, res, next) {
  try {
    const careers = await careerService.listCareers(req.query.includeInactive === 'true');
    res.json(careers);
  } catch (error) {
    next(error);
  }
}

async function upsertCareer(req, res, next) {
  try {
    const career = await careerService.upsertCareer(req.params.id ? Number(req.params.id) : undefined, req.body);
    res.json(career);
  } catch (error) {
    next(error);
  }
}

async function deleteCareer(req, res, next) {
  try {
    await careerService.deleteCareer(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listCareers,
  upsertCareer,
  deleteCareer,
};
