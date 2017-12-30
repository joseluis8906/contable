module.exports = ( Sequelize, DataTypes ) => {
  return Sequelize.define('DianCiudad', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Codigo: DataTypes.STRING,
    Nombre: DataTypes.STRING,
    DianDepartamentoId: {type: DataTypes.INTEGER, references: {model: 'DianDepartamento', key: 'Id'}},
  },
  {
    timestamps: false,
    freezeTableName: true
  });
}
