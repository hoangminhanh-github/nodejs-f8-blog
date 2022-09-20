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
      avatar: {
        allowNull: true,
        type: DataTypes.STRING,
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
  }

  return Users
}
