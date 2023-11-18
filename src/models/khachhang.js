'use strict';
const {
    Model
} = require('sequelize');
const taikhoan = require('./taikhoan');
module.exports = (sequelize, DataTypes) => {
    class khachhang extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
         
           
        }
    };
    khachhang.init({

        sdt: DataTypes.STRING,
        hoten: DataTypes.STRING,
        diachi: DataTypes.STRING,
        ngaysinh: DataTypes.DATE,
        gioitinh: DataTypes.STRING,
        email: DataTypes.STRING,
       

    }, {
        sequelize,
        modelName: 'khachhang',
           // muốn không thêm s sau tên bảng database phải thêm thuộc tính này
    freezeTableName: true
    });
    return khachhang;
};