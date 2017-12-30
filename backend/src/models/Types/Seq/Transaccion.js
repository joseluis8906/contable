module.exports = ( Sequelize, DataTypes ) => {
  return Sequelize.define('Transaccion', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Tipo: DataTypes.STRING,
    Numero: DataTypes.STRING,
    Estado: DataTypes.STRING,
  },
  {
    timestamps: false,
    freezeTableName: true
  });
}
