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
      product_id: {
        allownull:false,
        type: Sequelize.STRING
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
      review_score: {
        allownull:false,
        type: Sequelize.FLOAT
      },
      url: {
        allownull:false,
        type: Sequelize.STRING
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
