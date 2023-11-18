'use strict';

const { sequelize } = require("../models");

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('vexe', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            
            sdt: {
                type: Sequelize.STRING
            },
            giave: {
                type: Sequelize.FLOAT
            },
            soghe: {
                type: Sequelize.STRING
            },
            machuyen: {
                type: Sequelize.INTEGER
            },
            
            thoigianbatdau: {
                type: Sequelize.DATE
            },
            thoigianmua: {
                type: Sequelize.TIME
            },
            matk: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('vexe');
    }
};