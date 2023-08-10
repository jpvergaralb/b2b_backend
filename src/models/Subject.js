import {Model, DataTypes} from "sequelize"
import { sequelize } from "../db/db.js"
import { User } from "./User.js"
import { Task } from "./Task.js"

export class Subject extends Model {}

Subject.init({
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
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 5
    }
  }
}, {
  sequelize,
  timestamps: true, 
  paranoid: true,
  tableName: 'subjects',
  modelName: 'Subject'
})

