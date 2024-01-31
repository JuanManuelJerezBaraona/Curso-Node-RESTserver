const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { User, Category, Product } = require("../models");

const permittedCollections = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
];

const searchUsers = async (term = '', res = response) => {

    const isMongoID = ObjectId.isValid(term);

    if (isMongoID) {
        const user = await User.findById(term);
        return res.json({
            results: (user) ? [user] : []
        })
    }
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
        case 'categoria':
        
        break;
        case 'productos':
        
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