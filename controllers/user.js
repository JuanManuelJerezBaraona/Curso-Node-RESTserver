const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = async (req, res = response) => {

    const { limit = 5, skip = 0 } = req.query;
    const query = { status: true }

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(skip))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
};

const userPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json(user);
};

const userPost = async (req, res = response) => {

    

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

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

const userDelete = async (req, res = response) => {

    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { status: false });

    res.json(user);
};

module.exports = {
    usersGet,
    userPut,
    userPost,
    userPatch,
    userDelete
}