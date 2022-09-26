module.exports = (sequelize, DataTypes) => {
  const UserImages = sequelize.define('UserImages', {
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    test: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  })
  return UserImages
}
