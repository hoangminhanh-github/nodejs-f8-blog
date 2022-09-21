module.exports = (sequelize, DataTypes) => {
  const UserImages = sequelize.define('UserImages', {
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
  return UserImages
}
