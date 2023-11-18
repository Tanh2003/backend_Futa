'use strict';

const { sequelize } = require("../models");

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('chuyenxe', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
           
           
            tenchuyen: {
                type: Sequelize.STRING
            },
            dodai: {
                type: Sequelize.DECIMAL
            },
            diemdi: {
                type: Sequelize.STRING
            },
            diemden: {
                type: Sequelize.STRING
            },
            gia: {
                type: Sequelize.FLOAT
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
        await queryInterface.dropTable('chuyenxe');
    }
};