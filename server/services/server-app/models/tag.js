'use strict';
const {
  Model
} = require('sequelize');
const slugify = require('slugify');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tag.belongsTo(models.Post, { foreignKey: "postId" })
    }
  }
  Tag.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Tag must be insert!'
        },
        notEmpty: {
          msg: 'Tag must be insert!'
        }
      }
    },
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};