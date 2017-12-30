module.exports = ( Sequelize, DataTypes ) => {
  return Sequelize.define('DianDepartamento', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Codigo: DataTypes.STRING,
    Nombre: DataTypes.STRING,
    DianPaisId: {type: DataTypes.INTEGER, references: {model: 'DianPais', key: 'Id'}},
  },
  {
    timestamps: false,
    freezeTableName: true
  });
}
