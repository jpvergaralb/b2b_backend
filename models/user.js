'use strict';

const bcrypt = require('bcrypt')

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
        through: 'usercourses',
        foreignKey: 'userId',
      })
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter your first name.'
        }, 
        notNull: {
          msg: 'Please enter your first name.'
        },
        len: {
          args: [2, 50],
          msg: 'First name must be between 2 and 50 characters long.'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: false,
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
      allowNull: false,
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
    tableName: 'users'
  });


  User.addHook('beforeCreate', async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword
  })

  User.addHook('beforeUpdate', async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword
  })

  User.prototype.isPasswordValid = async function(password) {
    try {
      return await bcrypt.compare(password, this.password)
    } catch (error) {
      console.log(error)
    }
  }

  return User;
};