'use strict';
const {
  Model
} = require('sequelize');
const { slugify } = require("../helpers/createSlug")
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Post.belongsTo(models.User, { foreignKey: 'authorId' })
      Post.belongsTo(models.Category, { foreignKey: 'categoryId' })
      Post.hasMany(models.Tag, { foreignKey: 'postId' })
    }
  }
  Post.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notNull: {
          msg: 'Title must be insert!'
        },
        notEmpty: {
          msg: 'Title must be insert!'
        }
      }
    },
    slug: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validation: {
        notNull: {
          msg: 'Slug must be insert!'
        },
        notEmpty: {
          msg: 'Slug must be insert!'
        }
      }
    },
    content: {
      type: DataTypes.TEXT(500),
      allowNull: false,
      validation: {
        notNull: {
          msg: 'Content must be insert!'
        },
        notEmpty: {
          msg: 'Content must be insert!'
        }
      }
    },
    imgUrl: DataTypes.STRING(500),
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Post',
  });
  Post.beforeCreate((el) => {
    el.slug = slugify(el.title);
  })
  return Post;
};