module.exports = ( Sequelize, DataTypes ) => {
  return Sequelize.define('Group', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING, unique: true}
  },
  {
    timestamps: false,
    freezeTableName: true
  });
}
