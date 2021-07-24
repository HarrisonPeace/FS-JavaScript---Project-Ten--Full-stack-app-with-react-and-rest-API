'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  
  class User extends Model {}

  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'A first name is required' },
        notEmpty: { msg: 'A first name is required' }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'A last name is required' },
        notEmpty: { msg: 'A last name is required' }
      },
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: `'User is already found in the system'` },
      validate: {
        isEmail: { msg: 'Please enter a valid email' }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkPasswordLength(value) {
          if (value.length < 6 || value.length > 20) {
            throw new Error('Password must be between 6 and 20 characters');
          }
        },
        hasSpecialCharacter(value) {
          if (!/[^\d\w\s]/.test(value)) {
            throw new Error('Password must contain at least one special character');
          }
        },
        hasCapitalLetter(value) {
          if (!/[A-Z]/.test(value)) {
            throw new Error('Password must contain at least one capital letter');
          }
        },
        set(value) {
          this.setDataValue('password', bcrypt.hashSync(value, 10));
        }
      },
    }
  }, { sequelize });

  User.associate = (models) => {
    User.Course = User.hasMany(models.Course)
  };

  return User;
}