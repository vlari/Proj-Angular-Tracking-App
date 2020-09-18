const express = require('express');
const systemController = require('../controllers/systemController');
const router = express.Router();

router.route('/contenttypes').get(systemController.getContentTypes);
router.route('/statustypes').get(systemController.getStatusTypes);
router.route('/paymentoptions').get(systemController.getPaymentOptions);
router.route('/documenttypes').get(systemController.getDocumentTypes);
router.route('/facilities').get(systemController.getFacilities);

module.exports = router;
