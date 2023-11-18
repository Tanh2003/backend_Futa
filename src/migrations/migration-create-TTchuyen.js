'use strict';

const { sequelize } = require("../models");

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('TTchuyenxe', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            machuyen: {
                type: Sequelize.STRING
            },
            ngay: {
                type: Sequelize.DATE
            },
            soluongve: {
                type: Sequelize.INTEGER
            },
            thoigian: {
                type: Sequelize.TIME
            },
           
           
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }

        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('TTchuyenxe');
    }
};