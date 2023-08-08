import { Model, DataTypes } from 'sequelize'

export class User extends Model {}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false, 
    validate: {
      min: 2
    }
  }, 
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 6,
      isStrong(value) {
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value)) {
          throw new Error('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.');
        }
      }
    }
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user', 
    validate: {
      isIn: {
        args: [['admin', 'user', 'guest']],
        msg: 'The value for role is not valid.'
      }
    }
  }
}, {
  sequelize,
  timestamps: true, 
  paranoid: true
})