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
  })
  // Account.associate = (models) => {
  //   Account.hasMany(models.Users, {
  //     onDelete: 'cascade',
  //   })
  // }
  return Account
}
