'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Post, { foreignKey: "categoryId" })
      // Category.belongsToMany(models.User, { through: models.Post, foreignKey: 'categoryId', otherKey: 'authorId' })
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Category must be insert!'
        },
        notEmpty: {
          msg: 'Category must be insert!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};