module.exports = ( Sequelize, DataTypes ) => {
  return Sequelize.define('User', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    UserName: {type: DataTypes.STRING, unique: true},
    Password: DataTypes.STRING,
    Active: DataTypes.STRING
  },
  {
    timestamps: false,
    freezeTableName: true
  });
}
