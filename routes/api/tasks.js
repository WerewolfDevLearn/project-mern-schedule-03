const { Router } = require('express');
const ctrl = require('../../controllers/tasks');
const { validateBody } = require('../../decorators');
const schemas = require('../../schemas');
const { authenticate } = require('../../middlewares');

const router = Router();

router.get('/', authenticate, ctrl.getAllTasks);
router.post('/', authenticate, validateBody(schemas.validTask), ctrl.addTask);
router.patch('/:id', authenticate, validateBody(schemas.validTask), ctrl.updateTask);
router.delete('/:id', authenticate, ctrl.deleteTask);

module.exports = router;
