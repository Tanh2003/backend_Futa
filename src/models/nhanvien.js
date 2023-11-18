'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class nhanvien extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            nhanvien.belongsTo(models.taikhoan, { foreignKey: 'matk', targetKey: 'id', as: 'idmatkData' })
        }
    };
    nhanvien.init({

    
      
        gioitinh: DataTypes.BOOLEAN,
        ngaysinh: DataTypes.DATE,
        hoten: DataTypes.STRING,
        diachi: DataTypes.STRING,
        matk:DataTypes.INTEGER,


    }, {
        sequelize,
        modelName: 'nhanvien',
           // muốn không thêm s sau tên bảng database phải thêm thuộc tính này
    freezeTableName: true
    });
    return nhanvien;
};