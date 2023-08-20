'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Task, {
        foreignKey: 'userId'
      })

      User.belongsToMany(models.Course, {
        through: 'usercourses'
      })
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please enter your first name.'
        }, 
        notNull: {
          msg: 'Please enter your first name.'
        },
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please enter your first name.'
        }, 
        notNull: {
          msg: 'Please enter your first name.'
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'The email you entered already exists.'
      },
      validate: {
        isEmail: {
          msg: 'Please enter a valid email address.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
          msg: 'Password must be at least 8 characters long and contain at least one number, one letter, and one special character.'
        }          
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};