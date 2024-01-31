const { Router } = require('express');
const { check } = require('express-validator');

const { isValidRole, isValidEmail, existUserById } = require('../helpers/db-validators');

const { isAdminRole, hasRole } = require('../middlewares/validate-roles');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');

const { 
    getUsers, 
    putUser, 
    postUser, 
    patchUser, 
    deleteUser } = require('../controllers/user');

const router = Router();

router.get('/', getUsers);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(isValidRole),
    validateFields
], putUser);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(isValidEmail),
    check('password', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    // check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
    validateFields
], postUser);

router.patch('/', patchUser);

router.delete('/:id', [
    validateJWT,
    // isAdminRole,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    validateFields
], deleteUser);

module.exports = router;