const { response } = require("express");
const { Category } = require("../models");

const getCategories = async (req, res = response) => {

    const { limit = 5, skip = 0 } = req.query;
    const query = { status: true }

    const [ total, categories ] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user', 'name')
            .skip(Number(skip))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        categories
    });
};

const getCategory = async (req, res = response) => {

    const { id } = req.params;
    const category = await Category.findById(id).populate('user', 'name');
    res.status(200).json(category);

}

const createCategory = async (req, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name });

    if (categoryDB) {
        return res.status(400).json({
            msg: `La categoría ${categoryDB.name} ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data);

    // Guardar DB
    await category.save();

    res.status(201).json(category);
};

// updateCategory

// deleteCategory - status: false

module.exports = {
    getCategories,
    getCategory,
    createCategory
}