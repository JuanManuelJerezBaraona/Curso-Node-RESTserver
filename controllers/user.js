const { response } = require('express');

const userGet = (req, res = response) => {

    const { name = 'no name', apikey, page = 1, limit = 10 } = req.query;

    res.json({
        msg: 'get API - controller',
        name,
        apikey,
        page,
        limit
    });
};

const userPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - controller',
        id
    });
};

const userPost = (req, res = response) => {

    const {nombre, edad} = req.body;

    res.json({
        msg: 'post API - controller',
        nombre,
        edad
    });
};

const userPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller'
    });
};

const userDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controller'
    });
};

module.exports = {
    userGet,
    userPut,
    userPost,
    userPatch,
    userDelete
}