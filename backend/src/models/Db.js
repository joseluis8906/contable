import Path from 'path';
import Sequelize from 'sequelize';

var db = Path.resolve(__dirname, '../../db/Db.sqlite');

const Db = new Sequelize(`sqlite://${db}`);

const User = Db.define('User', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  UserName: {type: Sequelize.STRING, unique: true},
  Password: Sequelize.STRING,
  Active: Sequelize.BOOLEAN
},
{
  timestamps: false,
  freezeTableName: true
});


//############# contable ################

//Ente
const Tercero = Db.define('Tercero', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  TipoDeIdentificacion: Sequelize.STRING,
  NumeroDeIdentificacion: Sequelize.STRING,
  DigitoDeVerificacion: Sequelize.STRING,
  PrimerApellido: Sequelize.STRING,
  SegundoApellido: Sequelize.STRING,
  PrimerNombre: Sequelize.STRING,
  OtrosNombres: Sequelize.STRING,
  RazonSocial: Sequelize.STRING,
  Direccion: Sequelize.STRING,
  CodigoDepartamento: Sequelize.STRING,
  CodigoMunicipio: Sequelize.STRING,
  PaisDeResidencia: Sequelize.STRING
},
{
  timestamps: false,
  freezeTableName: true
});

//open connection
Db.authenticate().then(() => {
  console.log('Db conection success');
  Db.query("PRAGMA foreign_keys=ON").spread( (Result, Metadata) => {
    Db.query("PRAGMA foreign_keys").spread( (Result, Metadata) => {
      console.log(Result);
    });
  });
}).catch(Err => {
  console.log('Db conection failed');
});


export default Db;
