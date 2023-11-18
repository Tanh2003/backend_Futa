"use strict";

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("nhanvien", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      hoten: {
        type: Sequelize.STRING,
      },
      diachi: {
        type: Sequelize.STRING,
      },
      ngaysinh: {
        type: Sequelize.DATE,
      },
      gioitinh: {
        type: Sequelize.STRING,
      },
      matk: {
        type: Sequelize.INTEGER,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("nhanvien");
  },
};
