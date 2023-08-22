const { Category } = require('../models/index')


class CategoryController {
    static async readCategory(req, res, next) {
        try {
            const result = await Category.findAll()
            res.status(200).json({
                statusCode: 200,
                msg: `Here is the data`,
                result
            })
        } catch (err) {
            next(err)
        }
    }

    static async createCategory(req, res, next) {
        try {
            const { name } = req.body
            const create = await Category.create({ name })

            res.status(201).json({
                statusCode: 201,
                create
            })
        } catch (err) {
            next(err)
        }
    }

    static async deleteCategory(req, res, next) {
        try {
            const { id } = req.params;
            const response = await Category.destroy({
                where: {
                    id: id,
                },
            });
            res.status(200).json({
                statusCode: 200,
                msg: "Category deleted successfully",
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}

module.exports = CategoryController