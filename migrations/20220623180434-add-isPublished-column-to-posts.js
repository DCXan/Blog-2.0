'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.addColumn('Posts', 'isPubished', {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    })
  },

  async down (queryInterface, Sequelize) {

    return queryInterface.removeColumn('Posts', 'isPubished')
  }
};
