const db = require('./index')
module.exports = (sequelize, DataTypes, Model) => {
  const Users = sequelize.define(
    'Users',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      social: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    },
  )

  Users.associate = (models) => {
    Users.hasMany(models.Comments, {
      onDelete: 'cascade',
    })
    Users.hasMany(models.Likes, {
      onDelete: 'cascade',
    })
    Users.hasMany(models.UserImages, {
      onDelete: 'cascade',
    })
  }

  return Users
}
