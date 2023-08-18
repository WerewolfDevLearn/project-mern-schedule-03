const { Router } = require('express');

const ctrl = require('../../controllers/users');
const schemas = require('../../schemas');
const { validateBody } = require('../../decorators');
const { authenticate, upload } = require('../../middlewares');

const router = Router();
const uploadAvatar = upload.single('avatar');

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);
router.post('/verify', validateBody(schemas.verifyEmailSchema), ctrl.verifyEmail);
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);
router.post('/refresh', validateBody(schemas.refreshSchema), ctrl.refresh);
router.get('/current', authenticate, ctrl.getCurrent);
router.delete('/current', authenticate, ctrl.deleteCurrent);
router.post('/logout', authenticate, ctrl.logout);
router.patch(
  '/profile',
  authenticate,
  uploadAvatar,
  validateBody(schemas.updateProfileShema),
  ctrl.updateProfile
);
router.patch('/password', authenticate, validateBody(schemas.updatePassword), ctrl.updatePassword);
router.patch('/email', authenticate, validateBody(schemas.updateEmail), ctrl.updateEmail);

module.exports = router;
