const { Router } = require('express');

const usersRouter = require('./users');
const reviewsRouter = require('./reviews');
const tasksRouter = require('./tasks');

const router = Router();

router.use('/users', usersRouter);
router.use('/reviews', reviewsRouter);
router.use('/tasks', tasksRouter);

module.exports = router;
