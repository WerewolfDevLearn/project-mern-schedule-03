const { Router } = require('express');
const ctrl = require('../../controllers/reviews');
const { validateBody } = require('../../decorators');
const schemas = require('../../schemas');
const { authenticate } = require('../../middlewares');

const router = Router();

// returns all feedback: GET http://localhost:5000/api/reviews
router.get('/', ctrl.getAll);

// returns all feedback to the user: GET http://localhost:5000/api/reviews/own
router.get('/own', authenticate, ctrl.getReviewByUser);

// add feedback by user: POST http://localhost:5000/api/reviews/own
// body raw { "rating": 4, "comment": "The current todo application ...."}
router.post('/own', authenticate, validateBody(schemas.reveiwSchema), ctrl.addReview);

// edit feedback by user: PATCH http://localhost:5000/api/reviews/own
// body raw { "rating": 4, "comment": "This app ...."}
router.patch('/own', authenticate, validateBody(schemas.updateReveiwSchema), ctrl.updateReview);

// delete feedback by user: DELETE http://localhost:5000/api/reviews/own
router.delete('/own', authenticate, ctrl.deleteReview);

module.exports = router;
