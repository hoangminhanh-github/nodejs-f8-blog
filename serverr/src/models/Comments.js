module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
  Comments.associate = (models) => {
    Comments.belongsTo(models.Account, {})
  }
  return Comments
}
