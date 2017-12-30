module.exports = ( Sequelize, DataTypes ) => {
  return Sequelize.define('Cuenta', {
    Id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Type: DataTypes.STRING,
    Code: DataTypes.STRING,
    Name: DataTypes.STRING,
    TerceroId: {type: DataTypes.INTEGER, references: {model: 'Tercero', key: 'Id'}}
  },
  {
    timestamps: false,
    freezeTableName: true
  });
}
