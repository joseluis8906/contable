import Path from 'path';
import Sequelize from 'sequelize';

//var db = Path.resolve(__dirname, '../../db/Db.sqlite');
//const Db = new Sequelize(`sqlite://${db}`);

const Db = new Sequelize('unixjs01', 'unixjs', 'K3J9 8LMN 02F3 B3LW', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});


const User = Db.define('User', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  UserName: {type: Sequelize.STRING, unique: true},
  Password: Sequelize.STRING,
  Active: Sequelize.STRING
},
{
  timestamps: false,
  freezeTableName: true
});

const Group = Db.define('Group', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Name: {type: Sequelize.STRING, unique: true}
},
{
  timestamps: false,
  freezeTableName: true
});

const UserGroup = Db.define('UserGroup', {
  UserId: {type: Sequelize.INTEGER, references: {model: User, key: 'Id'}},
  GroupId: {type: Sequelize.INTEGER, references: {model: Group, key: 'Id'}}
},
{
  timestamps: false,
  freezeTableName: true
});

User.belongsToMany(Group, {through: 'UserGroup'});
Group.belongsToMany(User, {through: 'UserGroup'});


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
  /*Db.query("PRAGMA foreign_keys=ON").spread( (Result, Metadata) => {
    Db.query("PRAGMA foreign_keys").spread( (Result, Metadata) => {
      console.log(Result);
    });
  });*/
}).catch(Err => {
  console.log('Db conection failed');
});


export default Db;
