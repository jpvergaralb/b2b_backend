import {Model, DataTypes} from "sequelize"
import { sequelize } from "../db/db.js"

export class Task extends Model {}

Task.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 3
    }
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false, 
    validate: {
      min: 5
    }
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 5
    }
  }, 
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
    validate: {
      isIn: {
        args: [['pending', 'in progress', 'completed']],
        msg: 'The value for status is not valid.'
      }
    }
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true
    }
  }
}, {
  sequelize,
  timestamps: true, 
  paranoid: true,
  tableName: 'tasks',
  modelName: 'Task'
})