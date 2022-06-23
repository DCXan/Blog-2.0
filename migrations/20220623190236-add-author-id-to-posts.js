'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    return [
      queryInterface.addColumn('Posts', 'author', {
        type: Sequelize.STRING
    }),
      queryInterface.addColumn('Posts', 'authorID', {
        type: Sequelize.INTEGER
      })
  ]
  },

  async down (queryInterface, Sequelize) {
    [
      queryInterface.removeColumn('Posts', 'author', {
    }),
      queryInterface.removeColumn('Posts', 'authorID', {
      })
  ]
  }
};
