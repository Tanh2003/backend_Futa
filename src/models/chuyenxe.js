'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chuyenxe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      chuyenxe.hasMany(models.TTchuyenxe, { foreignKey: 'machuyen', as: 'idmachuyenData' })
      
    }
  };
  chuyenxe.init({
  
  
    tenchuyen:DataTypes.STRING,
    dodai:DataTypes.DECIMAL,
    diemdi:DataTypes.STRING,
    diemden:DataTypes.STRING,
    gia:DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'chuyenxe',
       // muốn không thêm s sau tên bảng database phải thêm thuộc tính này
       freezeTableName: true
  });
  return chuyenxe;
};