const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { User, Category, Product } = require("../models");

const permittedCollections = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const searchUsers = async (term = '', res = response) => {

    const isMongoID = ObjectId.isValid(term);

    if (isMongoID) {
        const user = await User.findById(term);
        return res.json({
            results: (user) ? [user] : []
        });
    }

    const regex = new RegExp(term, 'i');
    const users = await User.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{status: true}]
    });

    res.json({
        results: users
    });
}

const searchCategories = async (term = '', res = response) => {

    const isMongoID = ObjectId.isValid(term);

    if (isMongoID) {
        const category = await Category.findById(term);
        return res.json({
            results: (category) ? [category] : []
        });
    }

    const regex = new RegExp(term, 'i');
    const categories = await Category.find({name: regex, status: true});

    res.json({
        results: categories
    });
}

const searchProducts = async (term = '', res = response) => {

    const isMongoID = ObjectId.isValid(term);

    if (isMongoID) {
        const product = await Product.findById(term).populate('category', 'name');
        return res.json({
            results: (product) ? [product] : []
        });
    }

    const regex = new RegExp(term, 'i');
    const products = await Product.find({name: regex, status: true})
                        .populate('category', 'name');

    res.json({
        results: products
    });
}

const search = (req, res = response) => {
    
    const { collection, term } = req.params;

    if(!permittedCollections.includes(collection)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${permittedCollections}`
        })
    }

    switch (collection) {
        case 'usuarios':
            searchUsers(term, res);
        break;
        case 'categorias':
            searchCategories(term, res);
        break;
        case 'productos':
            searchProducts(term, res);
        break;

        default:
            res.status(500).json({
                msg: 'Se me olvidó hacer esta búsqueda'
            })
            break;
    }
}

module.exports = {
    search,
    searchUsers
}