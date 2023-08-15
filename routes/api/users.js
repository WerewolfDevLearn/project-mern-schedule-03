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
router.get('/current', authenticate, ctrl.getCurrent);
router.delete('/current', authenticate, ctrl.deleteCurrent);
router.post('/logout', authenticate, ctrl.logout);
router.patch(
  '/profile',
  authenticate,
  uploadAvatar,
  validateBody(schemas.updateProfileShema),
  ctrl.updateProfile
); // +
router.post(
  '/code',
  authenticate,
  validateBody(schemas.sendVerificationEmailSchema),
  ctrl.sendVerificationEmail
); // resend email with verify code. -

module.exports = router;
