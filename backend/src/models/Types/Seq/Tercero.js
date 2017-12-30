module.exports = ( Sequelize, DataTypes ) => {
  return Sequelize.define('Tercero', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    DianIdentificacionId: {type: DataTypes.INTEGER, references: {model: 'DianIdentificacion', key: 'Id'}},
    NumeroDeIdentificacion: DataTypes.STRING,
    PrimerApellido: DataTypes.STRING,
    SegundoApellido: DataTypes.STRING,
    PrimerNombre: DataTypes.STRING,
    OtrosNombres: DataTypes.STRING,
    RazonSocial: DataTypes.STRING,
    Direccion: DataTypes.STRING,
    DianPaisId: {type: DataTypes.INTEGER, references: {model: 'DianPais', key: 'Id'}},
    DianDepartamentoId: {type: DataTypes.INTEGER, references: {model: 'DianDepartamento', key: 'Id'}},
    DianCiudadId: {type: DataTypes.INTEGER, references: {model: 'DianCiudad', key: 'Id'}}
  },
  {
    timestamps: false,
    freezeTableName: true
  });
}
