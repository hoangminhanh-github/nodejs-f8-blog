module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  })
  Account.associate = (models) => {
    Account.hasMany(models.Likes, {
      onDelete: 'cascade',
    })
    Account.hasMany(models.Comments, {
      onDelete: 'cascade',
    })
  }
  return Account
}
