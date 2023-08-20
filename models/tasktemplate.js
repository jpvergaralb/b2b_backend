'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskTemplate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TaskTemplate.belongsTo(models.Course, {
        foreignKey: 'courseId',
        onDelete: 'CASCADE'
      })

      TaskTemplate.hasMany(models.Task)
    }
  }
  TaskTemplate.init({
    name: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TaskTemplate',
  });
  return TaskTemplate;
};