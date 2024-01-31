const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');

const { getProducts, 
        getProduct, 
        createProduct, 
        updateProduct,
        deleteProduct } = require('../controllers/products');

const { existProductById, existCategoryById } = require('../helpers/db-validators');
const { isAdminRole } = require('../middlewares/validate-roles');

const router = Router();

//{{url}}/api/categorias

// Obtener todos los productos - publico
router.get('/', getProducts);

// Obtener un producto por id - publico
router.get('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existProductById),
    validateFields,
], getProduct);

// Crear producto - privado - cualquier persona con un token valido
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'No es un ID de Mongo válido').isMongoId(),
    check('category').custom(existCategoryById),
    validateFields,
], createProduct);

// Actualizar - privado - cualquier persona con un token valido
router.put('/:id', [
    validateJWT,
    // check('category', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existProductById),
    validateFields,
], updateProduct);

// Borrar un producto - Admin
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existProductById),
    validateFields,
], deleteProduct);

module.exports = router;