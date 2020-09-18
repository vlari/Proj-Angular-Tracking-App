const express = require('express');
const coreRoutes = require('./coreRoutes');
const sessionRoutes = require('./sessionRoutes');
const packageRoutes = require('./packageRoutes');
const accountRoutes = require('./accountRoutes');
const orderRoutes = require('./orderRoutes');

const router = express.Router();

router.use('/api', sessionRoutes);
router.use('/api', coreRoutes);
router.use('/api', packageRoutes);
router.use('/api', accountRoutes);
router.use('/api', orderRoutes);

module.exports = router;
