const { Router } = require('express');
const { check } = require('express-validator');

const { 
    userGet, 
    userPut, 
    userPost, 
    userDelete, 
    userPatch } = require('../controllers/user');

const router = Router();

router.get('/', userGet);

router.put('/:id', userPut);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
], userPost);

router.patch('/', userPatch);

router.delete('/', userDelete);

module.exports = router;