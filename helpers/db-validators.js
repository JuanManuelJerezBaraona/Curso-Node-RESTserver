const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`El rol ${role} no está registrado en la BD`);
    }
}

const isValidEmail = async (email = '') => {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`El correo: ${email} ya está registrado`);
    }
}

module.exports = {
    isValidRole,
    isValidEmail
}