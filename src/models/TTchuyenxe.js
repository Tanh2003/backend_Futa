'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TTchuyenxe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TTchuyenxe.belongsTo(models.chuyenxe, { foreignKey: 'machuyen', targetKey: 'id', as: 'idmachuyenData' })
    
    }
  };
  TTchuyenxe.init({
  
  
    machuyen:DataTypes.INTEGER,
    ngay:DataTypes.DATE,
    soluongve:DataTypes.INTEGER,
    thoigian:DataTypes.TIME
  }, {
    sequelize,
    modelName: 'TTchuyenxe',
       // muốn không thêm s sau tên bảng database phải thêm thuộc tính này
       freezeTableName: true
  });
  return TTchuyenxe;
};