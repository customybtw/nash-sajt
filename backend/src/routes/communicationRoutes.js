const express = require('express');
const authenticate = require('../middleware/auth');
const communicationController = require('../controllers/communicationController');
const {
  contactValidation,
  subscriberValidation,
  campaignValidation,
} = require('../validators/communicationValidators');

const router = express.Router();

router.post('/contact', contactValidation, communicationController.submitContactForm);
router.get('/messages', authenticate(['admin', 'editor']), communicationController.listMessages);
router.post('/newsletter/subscribe', subscriberValidation, communicationController.subscribe);
router.get('/newsletter/subscribers', authenticate(['admin']), communicationController.listSubscribers);
router.post('/newsletter/campaigns', authenticate(['admin']), campaignValidation, communicationController.createCampaign);

module.exports = router;
