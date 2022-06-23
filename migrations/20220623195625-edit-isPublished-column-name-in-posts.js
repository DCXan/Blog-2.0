'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  
    return queryInterface.renameColumn('Posts', 'isPubished', 'isPublished')
  },

  async down (queryInterface, Sequelize) {
    
    return queryInterface.renameColumn('Posts', 'isPublished', 'isPubished')
  }
};
