module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define('Likes', {})
  return Likes
}
// const { Sequelize, DataTypes, Model } = require('sequelize')
// const sequelize = new Sequelize('sqlite::memory:')

// class Like extends Model {}

// Like.init(
//   {
//     hehe: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     modelName: 'Like',
//   },
// )
