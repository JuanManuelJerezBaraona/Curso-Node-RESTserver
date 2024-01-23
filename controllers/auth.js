const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - email'
            });
        }

        // Verificar si el usuario está activo
        if (!user.status) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - status: false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;

    res.json({
        msg: 'Todo ok! Google SignIn',
        id_token
    });
}

module.exports = {
    login,
    googleSignIn
}