module.exports = ( Sequelize, DataTypes ) => {
  return Sequelize.define('Periodo', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Nombre: DataTypes.STRING,
    FechaInicial: DataTypes.DATEONLY,
    FechaFinal: DataTypes.DATEONLY,
    Estado: DataTypes.STRING
  },
  {
    timestamps: false,
    freezeTableName: true
  });
}
