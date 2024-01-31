const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');

const { getCategories, getCategory, createCategory } = require('../controllers/categories');
const { existCategoryById } = require('../helpers/db-validators');

const router = Router();

//{{url}}/api/categorias

// Obtener todas las categorias - publico
router.get('/', getCategories);

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields,
], getCategory);

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