'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chitietchuyenxe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
 
    }
  };
  chitietchuyenxe.init({
    idttchuyenxe:DataTypes.INTEGER,
    soghe:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'chitietchuyenxe',
       // muốn không thêm s sau tên bảng database phải thêm thuộc tính này
       freezeTableName: true
  });
  return chitietchuyenxe;
};