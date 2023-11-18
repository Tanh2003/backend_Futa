'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class xe extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
           
        }
    };
    xe.init({

        soxe: DataTypes.STRING,
        loaixe: DataTypes.STRING,
        manv: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'xe',
           // muốn không thêm s sau tên bảng database phải thêm thuộc tính này
    freezeTableName: true
    });
    return xe;
    
};