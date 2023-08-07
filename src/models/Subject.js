import {Model, DataTypes} from "sequelize"
import { sequelize } from "../db/db.js"


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
    allowNull: False, 
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
  paranoid: true
})