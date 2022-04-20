'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class refreshtokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  refreshtokens.init({
    token: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    expires: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'refreshtokens',
  });
  return refreshtokens;
};