const { Router } = require('express');
const { check } = require('express-validator');

const { isValidRole, isValidEmail, existUserById } = require('../helpers/db-validators');

const { isAdminRole, hasRole } = require('../middlewares/validate-roles');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');

const { 
    usersGet, 
    userPut, 
    userPost, 
    userDelete, 
    userPatch } = require('../controllers/user');

const router = Router();

router.get('/', usersGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(isValidRole),
    validateFields
], userPut);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(isValidEmail),
    check('password', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    // check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
    validateFields
], userPost);

router.patch('/', userPatch);

router.delete('/:id', [
    validateJWT,
    // isAdminRole,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    validateFields
], userDelete);

module.exports = router;