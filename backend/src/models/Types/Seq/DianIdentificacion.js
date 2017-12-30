module.exports = ( Sequelize, DataTypes ) => {
  return Sequelize.define('DianIdentificacion', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Codigo: DataTypes.STRING,
    Nombre: DataTypes.STRING
  },
  {
    timestamps: false,
    freezeTableName: true
  });
}
