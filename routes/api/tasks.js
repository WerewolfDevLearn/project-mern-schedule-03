const { Router } = require('express');
const ctrl = require('../../controllers/tasks');
const { validateBody } = require('../../decorators');
const schemas = require('../../schemas');
const { authenticate } = require('../../middlewares');

const router = Router();

// returns all tasks per month: GET http://localhost:5000/api/tasks?year=2023&month=8
// returns all tasks per month: GET http://localhost:5000/api/tasks?year=2023&month=8&day=1
router.get('/', authenticate, ctrl.getAllTasks);

// add task by user: POST http://localhost:5000/api/tasks
// body raw { "rating": 4, "comment": "The current todo application ...."}
router.post('/', authenticate, validateBody(schemas.validTask), ctrl.addTask);

// edit task by user: PATCH http://localhost:5000/api/tasks/:id
// body raw {
//   "title": "Meeting with Client",
//   "start": "14:00",
//   "end": "15:30",
//   "priority": "medium",
//   "date": "2023-08-10",
//   "category": "in-progress"
// }
router.patch('/:id', authenticate, validateBody(schemas.validTask), ctrl.updateTask);
// body raw {
//   "title": "Meeting with Client",
//   "start": "16:00",
//   "end": "17:30",
//   "priority": "medium",
//   "date": "2023-08-11",
//   "category": "in-progress"
// }

// delete task by user: DELETE http://localhost:5000/api/tasks/:id
router.delete('/:id', authenticate, ctrl.deleteTask);

module.exports = router;
