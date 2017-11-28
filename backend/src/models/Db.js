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
//DianIdentificacion
const DianIdentificacion = Db.define('DianIdentificacion', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Codigo: Sequelize.STRING,
  Nombre: Sequelize.STRING
},
{
  timestamps: false,
  freezeTableName: true
});


//DianPais
const DianPais = Db.define('DianPais', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Codigo: Sequelize.STRING,
  Nombre: Sequelize.STRING
},
{
  timestamps: false,
  freezeTableName: true
});


//DianDepartamento
const DianDepartamento = Db.define('DianDepartamento', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Codigo: Sequelize.STRING,
  Nombre: Sequelize.STRING
},
{
  timestamps: false,
  freezeTableName: true
});


//DianCiudad
const DianCiudad = Db.define('DianCiudad', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Codigo: Sequelize.STRING,
  Nombre: Sequelize.STRING
},
{
  timestamps: false,
  freezeTableName: true
});


//Periodo
const Periodo = Db.define('Periodo', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Nombre: Sequelize.STRING,
  FechaInicial: Sequelize.DATEONLY,
  FechaFinal: Sequelize.DATEONLY,
  Estado: Sequelize.STRING
},
{
  timestamps: false,
  freezeTableName: true
});


//Tercero
const Tercero = Db.define('Tercero', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  DianIdentificacionId: {type: Sequelize.INTEGER, references: {model: DianIdentificacion, key: 'Id'}},
  NumeroDeIdentificacion: Sequelize.STRING,
  PrimerApellido: Sequelize.STRING,
  SegundoApellido: Sequelize.STRING,
  PrimerNombre: Sequelize.STRING,
  OtrosNombres: Sequelize.STRING,
  RazonSocial: Sequelize.STRING,
  Direccion: Sequelize.STRING,
  DianPaisId: {type: Sequelize.INTEGER, references: {model: DianPais, key: 'Id'}},
  DianDepartamentoId: {type: Sequelize.INTEGER, references: {model: DianDepartamento, key: 'Id'}},
  DianCiudadId: {type: Sequelize.INTEGER, references: {model: DianCiudad, key: 'Id'}}
},
{
  timestamps: false,
  freezeTableName: true
});

Tercero.belongsTo(DianIdentificacion);
DianIdentificacion.hasOne(Tercero);

Tercero.belongsTo(DianPais, {as: 'DianPais', foreignKey:'DianPaisId'});
DianPais.hasOne(Tercero, {as: 'DianPais', foreignKey:'DianPaisId'});

Tercero.belongsTo(DianDepartamento);
DianDepartamento.hasOne(Tercero);

Tercero.belongsTo(DianCiudad);
DianCiudad.hasOne(Tercero);


//Cuenta
const Cuenta = Db.define('Cuenta', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Type: Sequelize.STRING,
  Code: Sequelize.STRING,
  Name: Sequelize.STRING,
  TerceroId: {type: Sequelize.INTEGER, references: {model: Tercero, key: 'Id'}}
},
{
  timestamps: false,
  freezeTableName: true
});

Tercero.hasMany(Cuenta, {as: 'Cuentas'});
Cuenta.belongsTo(Tercero);



//Transaccion
const Transaccion = Db.define('Transaccion', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Tipo: Sequelize.STRING,
  Numero: Sequelize.STRING,
  Estado: Sequelize.STRING,
},
{
  timestamps: false,
  freezeTableName: true
});


//Ingreso
const Ingreso = Db.define('Ingreso', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Fecha: Sequelize.DATEONLY,
  Numero: Sequelize.STRING,
  PeriodoId: {type: Sequelize.INTEGER, references: {model: Periodo, key: 'Id'}},
  Concepto: Sequelize.STRING,
  Total: Sequelize.DECIMAL
},
{
  timestamps: false,
  freezeTableName: true
});

Ingreso.belongsTo(Periodo);
Periodo.hasMany(Ingreso);


//IngresoItem
const IngresoItem = Db.define('IngresoItem', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  IngresoId: {type: Sequelize.INTEGER, references: {model: Ingreso, key: 'Id'}},
  CuentaDebeId: {type: Sequelize.INTEGER, references: {model: Cuenta, key: 'Id'}},
  CuentaHaberId: {type: Sequelize.INTEGER, references: {model: Cuenta, key: 'Id'}},
  Monto: Sequelize.DECIMAL
},
{
  timestamps: false,
  freezeTableName: true
});

IngresoItem.belongsTo(Ingreso);
Ingreso.hasMany(IngresoItem);

IngresoItem.belongsTo(Cuenta, {as: 'CuentaDebe', foreignKey: 'CuentaDebeId'});
Cuenta.hasOne(IngresoItem, {foreignKey: 'CuentaDebeId'});

IngresoItem.belongsTo(Cuenta, {as: 'CuentaHaber', foreignKey: 'CuentaHaberId'});
Cuenta.hasOne(IngresoItem, {foreignKey: 'CuentaHaberId'});


//Causacion
const Causacion = Db.define('Causacion', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Fecha: Sequelize.DATEONLY,
  Numero: Sequelize.STRING,
  PeriodoId: {type: Sequelize.INTEGER, references: {model: Periodo, key: 'Id'}},
  Concepto: Sequelize.STRING,
  Total: Sequelize.DECIMAL
},
{
  timestamps: false,
  freezeTableName: true
});

Causacion.belongsTo(Periodo);
Periodo.hasMany(Causacion);


//CausacionItem
const CausacionItem = Db.define('CausacionItem', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  CausacionId: {type: Sequelize.INTEGER, references: {model: Causacion, key: 'Id'}},
  CuentaDebeId: {type: Sequelize.INTEGER, references: {model: Cuenta, key: 'Id'}},
  CuentaHaberId: {type: Sequelize.INTEGER, references: {model: Cuenta, key: 'Id'}},
  Monto: Sequelize.DECIMAL
},
{
  timestamps: false,
  freezeTableName: true
});

CausacionItem.belongsTo(Causacion);
Causacion.hasMany(CausacionItem);

CausacionItem.belongsTo(Cuenta, {as: 'CuentaDebe', foreignKey: 'CuentaDebeId'});
Cuenta.hasOne(CausacionItem, {foreignKey: 'CuentaDebeId'});

CausacionItem.belongsTo(Cuenta, {as: 'CuentaHaber', foreignKey: 'CuentaHaberId'});
Cuenta.hasOne(CausacionItem, {foreignKey: 'CuentaHaberId'});


//Pago
const Pago = Db.define('Pago', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Fecha: Sequelize.DATEONLY,
  Numero: Sequelize.STRING,
  PeriodoId: {type: Sequelize.INTEGER, references: {model: Periodo, key: 'Id'}},
  Concepto: Sequelize.STRING,
  Total: Sequelize.DECIMAL,
  TransaccionId: {type: Sequelize.INTEGER, references: {model: Transaccion, key: 'Id'}},
},
{
  timestamps: false,
  freezeTableName: true
});

Pago.belongsTo(Periodo);
Periodo.hasMany(Pago);

Pago.belongsTo(Transaccion);
Transaccion.hasOne(Pago);


//PagoItem
const PagoItem = Db.define('PagoItem', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  PagoId: {type: Sequelize.INTEGER, references: {model: Pago, key: 'Id'}},
  CausacionItemId: {type: Sequelize.INTEGER, references: {model: CausacionItem, key: 'Id'}},
  CuentaDebeId: {type: Sequelize.INTEGER, references: {model: Cuenta, key: 'Id'}},
  Monto: Sequelize.DECIMAL
},
{
  timestamps: false,
  freezeTableName: true
});

PagoItem.belongsTo(Pago);
Pago.hasMany(PagoItem);

PagoItem.belongsTo(CausacionItem);
CausacionItem.hasMany(PagoItem);

PagoItem.belongsTo(Cuenta, {as: 'CuentaDebe', foreignKey: 'CuentaDebeId'});
Cuenta.hasOne(PagoItem, {foreignKey: 'CuentaDebeId'});


//Nota
const Nota = Db.define('Nota', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Fecha: Sequelize.DATEONLY,
  Numero: Sequelize.STRING,
  PerdiodoId: {type: Sequelize.INTEGER, references: {model: Periodo, key: 'Id'}},
  Concepto: Sequelize.STRING,
  Total: Sequelize.DECIMAL
},
{
  timestamps: false,
  freezeTableName: true
});

Nota.belongsTo(Periodo);
Periodo.hasMany(Nota);


//NotaItem
const NotaItem = Db.define('NotaItem', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  NotaId: {type: Sequelize.INTEGER, references: {model: Nota, key: 'Id'}, primaryKey: true},
  CuentaDebeId: {type: Sequelize.INTEGER, references: {model: Nota, key: 'Id'}, primaryKey: true},
  CuentaHaberId: {type: Sequelize.INTEGER, references: {model: Nota, key: 'Id'}, primaryKey: true},
  Monto: Sequelize.DECIMAL
},
{
  timestamps: false,
  freezeTableName: true
});

NotaItem.belongsTo(Nota);
Nota.hasMany(NotaItem);

NotaItem.belongsTo(Cuenta, {as: 'CuentaDebe', foreignKey: 'CuentaDebeId'});
Cuenta.hasOne(NotaItem, {foreignKey: 'CuentaDebeId'});

NotaItem.belongsTo(Cuenta, {as: 'CuentaHaber', foreignKey: 'CuentaHaberId'});
Cuenta.hasOne(NotaItem, {foreignKey: 'CuentaHaberId'});

//SaldoInicial
const SaldoInicial = Db.define('SaldoInicial', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  PeriodoId: {type: Sequelize.INTEGER, references: {model: Periodo, key: 'Id'}},
  CuentaId: {type: Sequelize.INTEGER, references: {model: Cuenta, key: 'Id'}},
  Monto: Sequelize.DECIMAL
},
{
  timestamps: false,
  freezeTableName: true
});

SaldoInicial.belongsTo(Periodo);
Periodo.hasMany(SaldoInicial, {as: 'SaldosIniciales'});

SaldoInicial.belongsTo(Cuenta, {as: 'Cuenta', foreignKey: 'CuentaId'});
Cuenta.hasMany(SaldoInicial, {as: 'SaldosIniciales', foreignKey: 'CuentaId'});


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
