const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');

const { createCategory } = require('../controllers/categories');

const router = Router();

//{{url}}/api/categorias

// Obtener todas las categorias - publico
router.get('/', (req, res) => {
    res.json('get');
});

// Obtener una categoria por id - publico
router.get('/:id', (req, res) => {
    res.json('get by id');
});

// Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields,
], createCategory);

// Actualizar - privado - cualquier persona con un token valido
router.put('/:id', (req, res) => {
    res.json('put');
});

// Borrar una categoria - Admin
router.delete('/:id', (req, res) => {
    res.json('delete');
});

module.exports = router;