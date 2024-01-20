const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

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

const userPost = async (req, res = response) => {

    

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Verificar si el correo existe
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        return res.status(400).json({
            msg: 'El correo ya está registrado'
        });
    }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await user.save();

    res.json({
        user
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