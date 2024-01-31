const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');

const { getCategories, 
        getCategory, 
        createCategory, 
        updateCategory,
        deleteCategory } = require('../controllers/categories');

const { existCategoryById } = require('../helpers/db-validators');
const { isAdminRole } = require('../middlewares/validate-roles');

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
router.put('/:id', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existCategoryById),
    validateFields,
], updateCategory);

// Borrar una categoria - Admin
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields,
], deleteCategory);

module.exports = router;