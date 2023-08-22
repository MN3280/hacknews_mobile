'use strict';

/** @type {import('sequelize-cli').Migration} */
const { slugify } = require("../helpers/createSlug");
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const post = require('../data/post.json')

    post.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.slug = slugify(el.title)
    })

    await queryInterface.bulkInsert('Posts', post, {})

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Posts', post, {})

  }
};
