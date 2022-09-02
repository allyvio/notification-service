'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('oauth-token', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      access_token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      token_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expires_in: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      refresh_token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('oauth-token');
  }
};
