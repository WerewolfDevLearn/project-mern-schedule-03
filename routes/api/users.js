const { Router } = require('express');

const ctrl = require('../../controllers/users');
const schemas = require('../../schemas');
const { validateBody } = require('../../decorators');
const { authenticate, passport, upload } = require('../../middlewares');

const router = Router();
const uploadAvatar = upload.single('avatar');

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  ctrl.authGoogle
);

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);
router.post('/verify', validateBody(schemas.verifyEmailSchema), ctrl.verifyEmail);
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);
router.post('/refresh', validateBody(schemas.refreshSchema), ctrl.refresh); // req.body do not attach refreshToken sometimes !!!
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
router.patch(
  '/password',
  authenticate,
  validateBody(schemas.updatePasswordSchema),
  ctrl.updatePassword
);
router.patch('/email', authenticate, validateBody(schemas.updateEmailSchema), ctrl.updateEmail);
router.post('/forgot', validateBody(schemas.forgotPasswordSchema), ctrl.forgotPassword);
router.post('/reset', validateBody(schemas.resetPasswordSchema), ctrl.resetPassword);

module.exports = router;
