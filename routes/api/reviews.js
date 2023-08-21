const { Router } = require('express');
const ctrl = require('../../controllers/reviews');
const { validateBody } = require('../../decorators');
const schemas = require('../../schemas');
const { authenticate } = require('../../middlewares');

const router = Router();

router.get('/', ctrl.getAll);
router.get('/own', authenticate, ctrl.getReviewByUser);
router.post('/own', authenticate, validateBody(schemas.reveiwSchema), ctrl.addReview);
router.patch('/own', authenticate, validateBody(schemas.updateReveiwSchema), ctrl.updateReview);
router.delete('/own', authenticate, ctrl.deleteReview);

module.exports = router;
