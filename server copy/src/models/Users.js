module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
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
  })
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
