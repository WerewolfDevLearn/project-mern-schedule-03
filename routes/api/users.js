const { Router } = require('express');

const ctrl = require('../../controllers/users');
const schemas = require('../../schemas');
const { validateBody } = require('../../decorators');
const { authenticate, upload } = require('../../middlewares');

const router = Router();
const uploadAvatar = upload.single('avatar');

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);
router.post('/logout', authenticate, ctrl.logout);
router.get('/current', authenticate, ctrl.getCurrent);
router.patch('/avatar', authenticate, uploadAvatar, ctrl.updateAvatar);
router.post('/verify', validateBody(schemas.verifyEmailSchema), ctrl.verifyEmail);

module.exports = router;
