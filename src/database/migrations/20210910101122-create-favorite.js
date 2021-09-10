'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("favorites", {
      id:{
        allownull:false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      price: {
        allownull:false,
        type: Sequelize.FLOAT
      },
      image: {
        allownull:false,
        type: Sequelize.STRING
      },
      title: {
        allownull:false,
        type: Sequelize.STRING
      },
      reviewScore: {
        allownull:false,
        type: Sequelize.FLOAT
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("favorites");
  }
};
