module.exports = ( Sequelize, DataTypes ) => {
  return Sequelize.define('UserGroup', {
    UserId: {type: DataTypes.INTEGER, references: {model: 'User', key: 'Id'}},
    GroupId: {type: DataTypes.INTEGER, references: {model: 'Group', key: 'Id'}}
  },
  {
    timestamps: false,
    freezeTableName: true
  });
}
