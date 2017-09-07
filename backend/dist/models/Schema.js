'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _Db = require('./Db.js');

var _Db2 = _interopRequireDefault(_Db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Person = new _graphql.GraphQLObjectType({
  name: "Person",
  description: "Object representation of Person",
  fields: function fields() {
    return {
      Id: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(Person) {
          return Person.Id;
        }
      },
      Email: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Person) {
          return Person.Email;
        }
      },
      FirstName: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Person) {
          return Person.FirstName;
        }
      },
      LastName: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Person) {
          return Person.LastName;
        }
      },
      Posts: {
        type: new _graphql.GraphQLList(Post),
        resolve: function resolve(Person) {
          return Person.getPosts();
        }
      }
    };
  }
});

var Post = new _graphql.GraphQLObjectType({
  name: "Post",
  description: "Object representation of Post",
  fields: function fields() {
    return {
      PersonId: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(Post) {
          return Post.PersonId;
        }
      },
      Title: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Post) {
          return Post.Title;
        }
      },
      Content: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Post) {
          return Post.Content;
        }
      }
    };
  }
});

var Producto = new _graphql.GraphQLObjectType({
  name: "Producto",
  description: "Object representation of Producto",
  fields: function fields() {
    return {
      Id: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(Producto) {
          return Producto.Id;
        }
      },
      Nombre: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Producto) {
          return Producto.Nombre;
        }
      },
      UnidadDeMedida: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Producto) {
          return Producto.UnidadDeMedida;
        }
      }
    };
  }
});

var Ente = new _graphql.GraphQLObjectType({
  name: "Ente",
  description: "Object representation of Ente",
  fields: function fields() {
    return {
      Id: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(Ente) {
          return Ente.Id;
        }
      },
      TipoDocumento: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Ente) {
          return Ente.TipoDocumento;
        }
      },
      NumeroDocumento: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Ente) {
          return Ente.NumeroDocumento;
        }
      },
      Nombre: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Ente) {
          return Ente.Nombre;
        }
      },
      Ciudad: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Ente) {
          return Ente.Ciudad;
        }
      },
      Direccion: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Ente) {
          return Ente.Direccion;
        }
      },
      Telefono: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Ente) {
          return Ente.Telefono;
        }
      },
      Relacion: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Ente) {
          return Ente.Relacion;
        }
      },
      Envases: {
        type: new _graphql.GraphQLList(Envase),
        resolve: function resolve(Ente) {
          return Ente.getEnvases();
        }
      }
    };
  }
});

//envase
var Envase = new _graphql.GraphQLObjectType({
  name: "Envase",
  description: "Object representation of Envase",
  fields: function fields() {
    return {
      Id: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(Envase) {
          return Envase.Id;
        }
      },
      Estado: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Envase) {
          return Envase.Estado;
        }
      },
      EnteId: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(Envase) {
          return Envase.EnteId;
        }
      },
      Material: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Envase) {
          return Envase.Material;
        }
      },
      ProductoId: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(Envase) {
          return Envase.ProductoId;
        }
      },
      Capacidad: {
        type: _graphql.GraphQLFloat,
        resolve: function resolve(Envase) {
          return Envase.Capacidad;
        }
      },
      Numero: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Envase) {
          return Envase.Numero;
        }
      },
      NumeroInterno: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Envase) {
          return Envase.NumeroInterno;
        }
      },
      Presion: {
        type: _graphql.GraphQLFloat,
        resolve: function resolve(Envase) {
          return Envase.Presion;
        }
      },
      AlturaConValvula: {
        type: _graphql.GraphQLFloat,
        resolve: function resolve(Envase) {
          return Envase.AlturaConValvula;
        }
      },
      PesoConValvula: {
        type: _graphql.GraphQLFloat,
        resolve: function resolve(Envase) {
          return Envase.PesoConValvula;
        }
      },
      Valvula: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Envase) {
          return Envase.Valvula;
        }
      },
      TipoValvula: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Envase) {
          return Envase.TipoValvula;
        }
      },
      AcabadoColor: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Envase) {
          return Envase.AcabadoColor;
        }
      },
      NormaTecnicaFabricacion: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Envase) {
          return Envase.NormaTecnicaFabricacion;
        }
      },
      Proveedor: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Envase) {
          return Envase.Proveedor;
        }
      },
      FechaCompra: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Envase) {
          return Envase.FechaCompra;
        }
      },
      Garantia: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Envase) {
          return Envase.Garantia;
        }
      },
      FechaFabricacion: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Envase) {
          return Envase.FechaFabricacion;
        }
      },
      PruebaHidrostatica: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Envase) {
          return Envase.PruebaHidrostatica;
        }
      },
      EquipoAlquilado: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Envase) {
          return Envase.EquipoAlquilado;
        }
      },
      FechaAlquiler: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Envase) {
          return Envase.FechaAlquiler;
        }
      },
      Observaciones: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Envase) {
          return Envase.Observaciones;
        }
      },
      Propietario: {
        type: Ente,
        resolve: function resolve(Envase) {
          return Envase.getEnte();
        }
      },
      Producto: {
        type: Producto,
        resolve: function resolve(Envase) {
          return Envase.getProducto();
        }
      }
    };
  }
});

//produccion
var Produccion = new _graphql.GraphQLObjectType({
  name: "Produccion",
  description: "Object representation of Produccion",
  fields: function fields() {
    return {
      Id: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(Produccion) {
          return Produccion.Id;
        }
      },
      Orden: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Produccion) {
          return Produccion.Orden;
        }
      },
      Turno: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Produccion) {
          return Produccion.Turno;
        }
      },
      Fecha: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Produccion) {
          return Produccion.Fecha;
        }
      },
      Lote: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Produccion) {
          return Produccion.Lote;
        }
      },
      FechaInicial: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Produccion) {
          return Produccion.FechaInicial;
        }
      },
      FechaFinal: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Produccion) {
          return Produccion.FechaFinal;
        }
      },
      HoraInicial: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Produccion) {
          return Produccion.HoraInicial;
        }
      },
      HoraFinal: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Produccion) {
          return Produccion.HoraFinal;
        }
      },
      FechaFabricacion: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Produccion) {
          return Produccion.FechaFabricacion;
        }
      },
      FechaVencimiento: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Produccion) {
          return Produccion.FechaVencimiento;
        }
      },
      Cantidad: {
        type: _graphql.GraphQLFloat,
        resolve: function resolve(Produccion) {
          return Produccion.Cantidad;
        }
      },
      ProductoId: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(Produccion) {
          return Produccion.ProductoId;
        }
      },
      EnvaseId: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(Produccion) {
          return Produccion.EnvaseId;
        }
      },
      ClienteId: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(Produccion) {
          return Produccion.EnteId;
        }
      },
      PurezaFinal: {
        type: _graphql.GraphQLFloat,
        resolve: function resolve(Produccion) {
          return Produccion.PurezaFinal;
        }
      },
      PresionFinal: {
        type: _graphql.GraphQLFloat,
        resolve: function resolve(Produccion) {
          return Produccion.PresionFinal;
        }
      },
      Observacion: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Produccion) {
          return Produccion.Observacion;
        }
      },
      Envase: {
        type: Envase,
        resolve: function resolve(Produccion) {
          return Produccion.getEnvase();
        }
      },
      Producto: {
        type: Producto,
        resolve: function resolve(Produccion) {
          return Produccion.getProducto();
        }
      },
      Cliente: {
        type: Ente,
        resolve: function resolve(Produccion) {
          return Produccion.getEnte();
        }
      }
    };
  }
});

//remision
var Remision = new _graphql.GraphQLObjectType({
  name: "Remision",
  description: "Object representation of Remision",
  fields: function fields() {
    return {
      Id: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(Remision) {
          return Remision.Id;
        }
      },
      Numero: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Remision) {
          return Remision.Numero;
        }
      },
      Fecha: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Remision) {
          return Remision.Fecha;
        }
      },
      EnteId: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(Remision) {
          return Remision.EnteId;
        }
      },
      ProduccionId: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(Remision) {
          return Remision.ProduccionId;
        }
      },
      EnvaseId: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(Remision) {
          return Remision.EnvaseId;
        }
      },
      Total: {
        type: _graphql.GraphQLFloat,
        resolve: function resolve(Remision) {
          return Remision.Total;
        }
      },
      Ente: {
        type: Ente,
        resolve: function resolve(Remision) {
          return Remision.getEnte();
        }
      },
      Produccion: {
        type: Produccion,
        resolve: function resolve(Remision) {
          return Remision.getProduccion();
        }
      },
      Envase: {
        type: Envase,
        resolve: function resolve(Remision) {
          return Remision.getEnvase();
        }
      }
    };
  }
});

//Kardex
var Kardex = new _graphql.GraphQLObjectType({
  name: "Kardex",
  description: "Object representation of Kardex",
  fields: function fields() {
    return {
      Id: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(Kardex) {
          return Kardex.Id;
        }
      },
      Cantidad: {
        type: _graphql.GraphQLFloat,
        resolve: function resolve(Kardex) {
          return Kardex.Cantidad;
        }
      },
      ProductoId: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(Kardex) {
          return Kardex.ProductoId;
        }
      },
      EnvaseId: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(Kardex) {
          return Kardex.EnvaseId;
        }
      },
      FechaElaboracion: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Kardex) {
          return Kardex.FechaElaboracion;
        }
      },
      Lote: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Kardex) {
          return Kardex.Lote;
        }
      },
      FechaVencimiento: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Kardex) {
          return Kardex.FechaVencimiento;
        }
      },
      EnteId: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(Kardex) {
          return Kardex.EnteId;
        }
      },
      FechaSale: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Kardex) {
          return Kardex.FechaSale;
        }
      },
      NumeroFacturaSale: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Kardex) {
          return Kardex.NumeroFacturaSale;
        }
      },
      FechaEntra: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Kardex) {
          return Kardex.FechaEntra;
        }
      },
      NumeroFacturaEntra: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Kardex) {
          return Kardex.NumeroFacturaEntra;
        }
      },
      Producto: {
        type: Producto,
        resolve: function resolve(Kardex) {
          return Kardex.getProducto();
        }
      },
      Envase: {
        type: Envase,
        resolve: function resolve(Kardex) {
          return Kardex.getEnvase();
        }
      },
      Ente: {
        type: Ente,
        resolve: function resolve(Kardex) {
          return Kardex.getEnte();
        }
      }
    };
  }
});

//Query
var Query = new _graphql.GraphQLObjectType({
  name: "Query",
  description: "Object representation of Query",
  fields: function fields() {
    return {
      Hello: {
        type: _graphql.GraphQLString,
        args: {},
        resolve: function resolve(root, args) {
          return "world";
        }
      },
      People: {
        type: new _graphql.GraphQLList(Person),
        args: {
          Id: { type: _graphql.GraphQLInt },
          Email: { type: _graphql.GraphQLString },
          FirstName: { type: _graphql.GraphQLString },
          LastName: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(root, args) {
          return _Db2.default.models.Person.findAll({ where: args });
        }
      },
      Posts: {
        type: new _graphql.GraphQLList(Post),
        args: {
          PersonId: { type: _graphql.GraphQLInt },
          Title: { type: _graphql.GraphQLString },
          Content: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(root, args) {
          return _Db2.default.models.Post.findAll({ where: args });
        }
      },
      Entes: {
        type: new _graphql.GraphQLList(Ente),
        args: {
          Id: { type: _graphql.GraphQLInt },
          TipoDocumento: { type: _graphql.GraphQLString },
          NumeroDocumento: { type: _graphql.GraphQLString },
          Nombre: { type: _graphql.GraphQLString },
          Ciudad: { type: _graphql.GraphQLString },
          Direccion: { type: _graphql.GraphQLString },
          Telefono: { type: _graphql.GraphQLString },
          Relacion: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(root, args) {
          return _Db2.default.models.Ente.findAll({ where: args });
        }
      },
      EntesByNombre: {
        type: new _graphql.GraphQLList(Ente),
        args: {
          Nombre: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(root, args) {
          return _Db2.default.models.Ente.findAll({
            where: {
              Nombre: { $like: "%" + args.Nombre + "%" }
            }
          });
        }
      },
      OneEnte: {
        type: Ente,
        args: {
          Id: { type: _graphql.GraphQLInt },
          TipoDocumento: { type: _graphql.GraphQLString },
          NumeroDocumento: { type: _graphql.GraphQLString },
          Nombre: { type: _graphql.GraphQLString },
          Ciudad: { type: _graphql.GraphQLString },
          Direccion: { type: _graphql.GraphQLString },
          Telefono: { type: _graphql.GraphQLString },
          Relacion: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(root, args) {
          return _Db2.default.models.Ente.findOne({ where: args });
        }
      },
      Productos: {
        type: new _graphql.GraphQLList(Producto),
        args: {
          Id: { type: _graphql.GraphQLInt },
          Nombre: { type: _graphql.GraphQLString },
          UnidadDeMedida: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(root, args) {
          return _Db2.default.models.Producto.findAll({ where: args });
        }
      },
      OneProducto: {
        type: Producto,
        args: {
          Id: { type: _graphql.GraphQLInt },
          Nombre: { type: _graphql.GraphQLString },
          UnidadDeMedida: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(root, args) {
          return _Db2.default.models.Producto.findOne({ where: args });
        }
      },
      Envases: {
        type: new _graphql.GraphQLList(Envase),
        args: {
          Id: { type: _graphql.GraphQLInt },
          Estado: { type: _graphql.GraphQLString },
          EnteId: { type: _graphql.GraphQLInt },
          Material: { type: _graphql.GraphQLString },
          ProductoId: { type: _graphql.GraphQLInt },
          Capacidad: { type: _graphql.GraphQLFloat },
          Numero: { type: _graphql.GraphQLString },
          NumeroInterno: { type: _graphql.GraphQLString },
          Presion: { type: _graphql.GraphQLFloat },
          AlturaConValvula: { type: _graphql.GraphQLFloat },
          PesoConValvula: { type: _graphql.GraphQLFloat },
          Valvula: { type: _graphql.GraphQLString },
          TipoValvula: { type: _graphql.GraphQLString },
          AcabadoColor: { type: _graphql.GraphQLString },
          NormaTecnicaFabricacion: { type: _graphql.GraphQLString },
          Proveedor: { type: _graphql.GraphQLString },
          FechaCompra: { type: _graphql.GraphQLString },
          Garantia: { type: _graphql.GraphQLString },
          FechaFabricacion: { type: _graphql.GraphQLString },
          PruebaHidrostatica: { type: _graphql.GraphQLString },
          EquipoAlquilado: { type: _graphql.GraphQLString },
          FechaAlquiler: { type: _graphql.GraphQLString },
          Observaciones: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(root, args) {
          return _Db2.default.models.Envase.findAll({ where: args });
        }
      },
      OneEnvase: {
        type: Envase,
        args: {
          Id: { type: _graphql.GraphQLInt },
          Estado: { type: _graphql.GraphQLString },
          EnteId: { type: _graphql.GraphQLInt },
          Material: { type: _graphql.GraphQLString },
          ProductoId: { type: _graphql.GraphQLInt },
          Capacidad: { type: _graphql.GraphQLFloat },
          Numero: { type: _graphql.GraphQLString },
          NumeroInterno: { type: _graphql.GraphQLString },
          Presion: { type: _graphql.GraphQLFloat },
          AlturaConValvula: { type: _graphql.GraphQLFloat },
          PesoConValvula: { type: _graphql.GraphQLFloat },
          Valvula: { type: _graphql.GraphQLString },
          TipoValvula: { type: _graphql.GraphQLString },
          AcabadoColor: { type: _graphql.GraphQLString },
          NormaTecnicaFabricacion: { type: _graphql.GraphQLString },
          Proveedor: { type: _graphql.GraphQLString },
          FechaCompra: { type: _graphql.GraphQLString },
          Garantia: { type: _graphql.GraphQLString },
          FechaFabricacion: { type: _graphql.GraphQLString },
          PruebaHidrostatica: { type: _graphql.GraphQLString },
          EquipoAlquilado: { type: _graphql.GraphQLString },
          FechaAlquiler: { type: _graphql.GraphQLString },
          Observaciones: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(root, args) {
          return _Db2.default.models.Envase.findOne({ where: args }).then(function (R) {
            return R;
          });
        }
      },
      Produccions: {
        type: new _graphql.GraphQLList(Produccion),
        args: {
          Id: { type: _graphql.GraphQLInt },
          Orden: { type: _graphql.GraphQLString },
          Turno: { type: _graphql.GraphQLString },
          Fecha: { type: _graphql.GraphQLString },
          Lote: { type: _graphql.GraphQLString },
          FechaInicial: { type: _graphql.GraphQLString },
          FechaFinal: { type: _graphql.GraphQLString },
          HoraInicial: { type: _graphql.GraphQLString },
          HoraFinal: { type: _graphql.GraphQLString },
          FechaFabricacion: { type: _graphql.GraphQLString },
          FechaVencimiento: { type: _graphql.GraphQLString },
          Cantidad: { type: _graphql.GraphQLFloat },
          EnvaseId: { type: _graphql.GraphQLInt },
          ProductoId: { type: _graphql.GraphQLInt },
          EnteId: { type: _graphql.GraphQLInt },
          PurezaFinal: { type: _graphql.GraphQLFloat },
          PresionFinal: { type: _graphql.GraphQLFloat },
          Observacion: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(root, args) {
          return _Db2.default.models.Produccion.findAll({ where: args });
        }
      },
      ProduccionsByClient: {
        type: new _graphql.GraphQLList(Produccion),
        args: {
          Fecha: { type: _graphql.GraphQLString },
          FechaInicial: { type: _graphql.GraphQLString },
          FechaFinal: { type: _graphql.GraphQLString },
          HoraInicial: { type: _graphql.GraphQLString },
          HoraFinal: { type: _graphql.GraphQLString },
          FechaFabricacion: { type: _graphql.GraphQLString },
          FechaVencimiento: { type: _graphql.GraphQLString },
          Cantidad: { type: _graphql.GraphQLFloat },
          EnvaseId: { type: _graphql.GraphQLInt },
          ProductoId: { type: _graphql.GraphQLInt },
          ClienteId: { type: _graphql.GraphQLInt },
          PurezaFinal: { type: _graphql.GraphQLFloat },
          PresionFinal: { type: _graphql.GraphQLFloat },
          Observacion: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(root, args) {
          return _Db2.default.models.Produccion.findAll({ where: args });
        }
      },
      OneProduccion: {
        type: Produccion,
        args: {
          Id: { type: _graphql.GraphQLInt },
          Orden: { type: _graphql.GraphQLString },
          Turno: { type: _graphql.GraphQLString },
          Fecha: { type: _graphql.GraphQLString },
          Lote: { type: _graphql.GraphQLString },
          FechaInicial: { type: _graphql.GraphQLString },
          FechaFinal: { type: _graphql.GraphQLString },
          HoraInicial: { type: _graphql.GraphQLString },
          HoraFinal: { type: _graphql.GraphQLString },
          FechaFabricacion: { type: _graphql.GraphQLString },
          FechaVencimiento: { type: _graphql.GraphQLString },
          Cantidad: { type: _graphql.GraphQLFloat },
          EnvaseId: { type: _graphql.GraphQLInt },
          ProductoId: { type: _graphql.GraphQLInt },
          ClienteId: { type: _graphql.GraphQLInt },
          PurezaFinal: { type: _graphql.GraphQLFloat },
          PresionFinal: { type: _graphql.GraphQLFloat },
          Observacion: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(root, args) {
          return _Db2.default.models.Produccion.findOne({ where: args });
        }
      },
      Remisions: {
        type: new _graphql.GraphQLList(Remision),
        args: {
          Id: { type: _graphql.GraphQLInt },
          Numero: { type: _graphql.GraphQLString },
          Fecha: { type: _graphql.GraphQLString },
          EnteId: { type: _graphql.GraphQLInt },
          ProduccionId: { type: _graphql.GraphQLInt },
          EnvaseId: { type: _graphql.GraphQLInt },
          Total: { type: _graphql.GraphQLFloat }
        },
        resolve: function resolve(root, args) {
          return _Db2.default.models.Remision.findAll({ where: args });
        }
      },
      OneRemision: {
        type: Remision,
        args: {
          Id: { type: _graphql.GraphQLInt },
          Numero: { type: _graphql.GraphQLString },
          Fecha: { type: _graphql.GraphQLString },
          EnteId: { type: _graphql.GraphQLInt },
          ProduccionId: { type: _graphql.GraphQLInt },
          EnvaseId: { type: _graphql.GraphQLInt },
          Total: { type: _graphql.GraphQLFloat }
        },
        resolve: function resolve(root, args) {
          return _Db2.default.models.Remision.findOne({ where: args });
        }
      },
      Kardexs: {
        type: new _graphql.GraphQLList(Kardex),
        args: {
          Tipo: { type: _graphql.GraphQLString },
          EnteId: { type: _graphql.GraphQLInt },
          EnvaseId: { type: _graphql.GraphQLInt },
          FechaInicial: { type: _graphql.GraphQLString },
          FechaFinal: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(root, args) {
          console.log(args);
          if (args.Tipo === "Único") {
            return _Db2.default.models.Kardex.findAll({
              where: {
                EnvaseId: args.EnvaseId,
                $or: [{ FechaEntra: { $between: [args.FechaInicial, args.FechaFinal] } }, { FechaSale: { $between: [args.FechaInicial, args.FechaFinal] } }]
              }
            });
          } else if (args.Tipo === "Por Cliente") {
            return _Db2.default.models.Kardex.findAll({
              where: {
                EnteId: args.EnteId,
                $or: [{ FechaEntra: { $between: [args.FechaInicial, args.FechaFinal] } }, { FechaSale: { $between: [args.FechaInicial, args.FechaFinal] } }]
              }
            });
          } else {
            return _Db2.default.models.Kardex.findAll({
              where: {
                $or: [{ FechaEntra: { $between: [args.FechaInicial, args.FechaFinal] } }, { FechaSale: { $between: [args.FechaInicial, args.FechaFinal] } }]
              }
            });
          }
        }
      }
    };
  }
});

//mutation
var Mutation = new _graphql.GraphQLObjectType({
  name: "Mutation",
  description: "Function to create stuf",
  fields: function fields() {
    return {
      AddPerson: {
        type: Person,
        args: {
          Email: { type: _graphql.GraphQLInt },
          FirstName: { type: _graphql.GraphQLString },
          LastName: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(_, args) {
          return _Db2.default.models.Person.create({
            Email: args.Email,
            FirstName: args.FirstName,
            LastName: args.LastName
          });
        }
      },
      CreateEnte: {
        type: Ente,
        args: {
          TipoDocumento: { type: _graphql.GraphQLString },
          NumeroDocumento: { type: _graphql.GraphQLString },
          Nombre: { type: _graphql.GraphQLString },
          Ciudad: { type: _graphql.GraphQLString },
          Direccion: { type: _graphql.GraphQLString },
          Telefono: { type: _graphql.GraphQLString },
          Relacion: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(_, args) {
          return _Db2.default.models.Ente.create({
            TipoDocumento: args.TipoDocumento,
            NumeroDocumento: args.NumeroDocumento,
            Nombre: args.Nombre,
            Ciudad: args.Ciudad,
            Direccion: args.Direccion,
            Telefono: args.Telefono,
            Relacion: args.Relacion
          }).then(function (R) {
            return R;
          });
        }
      },
      UpdateEnte: {
        type: Ente,
        args: {
          TipoDocumento: { type: _graphql.GraphQLString },
          NumeroDocumento: { type: _graphql.GraphQLString },
          Nombre: { type: _graphql.GraphQLString },
          Ciudad: { type: _graphql.GraphQLString },
          Direccion: { type: _graphql.GraphQLString },
          Telefono: { type: _graphql.GraphQLString },
          Relacion: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(_, args) {
          return _Db2.default.models.Ente.findOne({ where: {
              TipoDocumento: args.TipoDocumento,
              NumeroDocumento: args.NumeroDocumento
            } }).then(function (R) {
            R.TipoDocumento = args.TipoDocumento;
            R.NumeroDocumento = args.NumeroDocumento;
            R.Nombre = args.Nombre;
            R.Ciudad = args.Ciudad, R.Direccion = args.Direccion;
            R.Telefono = args.Telefono;
            R.Relacion = args.Relacion;

            R.save();

            return R;
          });
        }
      },
      CreateProducto: {
        type: Producto,
        args: {
          Nombre: { type: _graphql.GraphQLString },
          UnidadDeMedida: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(_, args) {
          return _Db2.default.models.Producto.create({
            Nombre: args.Nombre,
            UnidadDeMedida: args.UnidadDeMedida
          }).then(function (R) {
            return R;
          });
        }
      },
      UpdateProducto: {
        type: Producto,
        args: {
          Nombre: { type: _graphql.GraphQLString },
          UnidadDeMedida: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(_, args) {
          return _Db2.default.models.Producto.findOne({ where: {
              Nombre: args.Nombre
            } }).then(function (R) {
            R.UnidadDeMedida = args.UnidadDeMedida;
            R.save();
            return R;
          });
        }
      },
      CreateEnvase: {
        type: Envase,
        args: {
          Estado: { type: _graphql.GraphQLString },
          EnteId: { type: _graphql.GraphQLInt },
          Material: { type: _graphql.GraphQLString },
          ProductoId: { type: _graphql.GraphQLInt },
          Capacidad: { type: _graphql.GraphQLFloat },
          Numero: { type: _graphql.GraphQLString },
          NumeroInterno: { type: _graphql.GraphQLString },
          Presion: { type: _graphql.GraphQLFloat },
          AlturaConValvula: { type: _graphql.GraphQLFloat },
          PesoConValvula: { type: _graphql.GraphQLFloat },
          Valvula: { type: _graphql.GraphQLString },
          TipoValvula: { type: _graphql.GraphQLString },
          AcabadoColor: { type: _graphql.GraphQLString },
          NormaTecnicaFabricacion: { type: _graphql.GraphQLString },
          Proveedor: { type: _graphql.GraphQLString },
          FechaCompra: { type: _graphql.GraphQLString },
          Garantia: { type: _graphql.GraphQLString },
          FechaFabricacion: { type: _graphql.GraphQLString },
          PruebaHidrostatica: { type: _graphql.GraphQLString },
          EquipoAlquilado: { type: _graphql.GraphQLString },
          FechaAlquiler: { type: _graphql.GraphQLString },
          Observaciones: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(_, args) {
          return _Db2.default.models.Envase.create({
            Estado: args.Estado,
            EnteId: args.EnteId,
            Material: args.Material,
            ProductoId: args.ProductoId,
            Capacidad: args.Capacidad,
            Numero: args.Numero,
            NumeroInterno: args.NumeroInterno,
            Presion: args.Presion,
            AlturaConValvula: args.AlturaConValvula,
            PesoConValvula: args.PesoConValvula,
            Valvula: args.Valvula,
            TipoValvula: args.TipoValvula,
            AcabadoColor: args.AcabadoColor,
            NormaTecnicaFabricacion: args.NormaTecnicaFabricacion,
            Proveedor: args.Proveedor,
            FechaCompra: args.FechaCompra,
            Garantia: args.Garantia,
            FechaFabricacion: args.FechaFabricacion,
            PruebaHidrostatica: args.PruebaHidrostatica,
            EquipoAlquilado: args.EquipoAlquilado,
            FechaAlquiler: args.FechaAlquiler,
            Observaciones: args.Observaciones
          }).then(function (R) {
            R.Propietario = R.getEnte();
            R.Producto = R.getProducto();
            return R;
          });
        }
      },
      UpdateEnvase: {
        type: Envase,
        args: {
          Estado: { type: _graphql.GraphQLString },
          EnteId: { type: _graphql.GraphQLInt },
          Material: { type: _graphql.GraphQLString },
          ProductoId: { type: _graphql.GraphQLInt },
          Capacidad: { type: _graphql.GraphQLFloat },
          Numero: { type: _graphql.GraphQLString },
          NumeroInterno: { type: _graphql.GraphQLString },
          Presion: { type: _graphql.GraphQLFloat },
          AlturaConValvula: { type: _graphql.GraphQLFloat },
          PesoConValvula: { type: _graphql.GraphQLFloat },
          Valvula: { type: _graphql.GraphQLString },
          TipoValvula: { type: _graphql.GraphQLString },
          AcabadoColor: { type: _graphql.GraphQLString },
          NormaTecnicaFabricacion: { type: _graphql.GraphQLString },
          Proveedor: { type: _graphql.GraphQLString },
          FechaCompra: { type: _graphql.GraphQLString },
          Garantia: { type: _graphql.GraphQLString },
          FechaFabricacion: { type: _graphql.GraphQLString },
          PruebaHidrostatica: { type: _graphql.GraphQLString },
          EquipoAlquilado: { type: _graphql.GraphQLString },
          FechaAlquiler: { type: _graphql.GraphQLString },
          Observaciones: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(_, args) {
          return _Db2.default.models.Envase.findOne({ where: {
              Numero: args.Numero
            }
          }).then(function (R) {
            R.Estado = args.Estado;
            R.EnteId = args.EnteId;
            R.Material = args.Material;
            R.ProductoId = args.ProductoId;
            R.Capacidad = args.Capacidad;
            R.NumeroInterno = args.NumeroInterno;
            R.Presion = args.Presion;
            R.AlturaConValvula = args.AlturaConValvula;
            R.PesoConValvula = args.PesoConValvula;
            R.Valvula = args.Valvula;
            R.TipoValvula = args.TipoValvula;
            R.AcabadoColor = args.AcabadoColor;
            R.NormaTecnicaFabricacion = args.NormaTecnicaFabricacion;
            R.Proveedor = args.Proveedor;
            R.FechaCompra = args.FechaCompra;
            R.Garantia = args.Garantia;
            R.FechaFabricacion = args.FechaFabricacion;
            R.PruebaHidrostatica = args.PruebaHidrostatica;
            R.EquipoAlquilado = args.EquipoAlquilado;
            R.FechaAlquiler = args.FechaAlquiler;
            R.Observaciones = args.Observaciones;
            R.save();
            R.Propietario = R.getEnte();
            R.Producto = R.getProducto();

            return R;
          });
        }
      },
      CreateProduccion: {
        type: Produccion,
        args: {
          Id: { type: _graphql.GraphQLInt },
          Orden: { type: _graphql.GraphQLString },
          Turno: { type: _graphql.GraphQLString },
          Fecha: { type: _graphql.GraphQLString },
          Lote: { type: _graphql.GraphQLString },
          FechaInicial: { type: _graphql.GraphQLString },
          FechaFinal: { type: _graphql.GraphQLString },
          HoraInicial: { type: _graphql.GraphQLString },
          HoraFinal: { type: _graphql.GraphQLString },
          FechaFabricacion: { type: _graphql.GraphQLString },
          FechaVencimiento: { type: _graphql.GraphQLString },
          Cantidad: { type: _graphql.GraphQLFloat },
          EnvaseId: { type: _graphql.GraphQLInt },
          ProductoId: { type: _graphql.GraphQLInt },
          ClienteId: { type: _graphql.GraphQLInt },
          PurezaFinal: { type: _graphql.GraphQLFloat },
          PresionFinal: { type: _graphql.GraphQLFloat },
          Observacion: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(_, args) {
          return _Db2.default.models.Produccion.create({
            Orden: args.Orden,
            Turno: args.Turno,
            Fecha: args.Fecha,
            Lote: args.Lote,
            FechaInicial: args.FechaInicial,
            FechaFinal: args.FechaFinal,
            HoraInicial: args.HoraInicial,
            HoraFinal: args.HoraFinal,
            FechaFabricacion: args.FechaFabricacion,
            FechaVencimiento: args.FechaVencimiento,
            Cantidad: args.Cantidad,
            ProductoId: args.ProductoId,
            EnvaseId: args.EnvaseId,
            EnteId: args.ClienteId,
            PurezaFinal: args.PurezaFinal,
            PresionFinal: args.PresionFinal,
            Observacion: args.Observacion
          }).then(function (R) {

            return R;
          });
        }
      },
      UpdateOneProduccion: {
        type: Produccion,
        args: {
          Id: { type: _graphql.GraphQLInt },
          Orden: { type: _graphql.GraphQLString },
          Cantidad: { type: _graphql.GraphQLFloat },
          EnvaseId: { type: _graphql.GraphQLInt },
          ClienteId: { type: _graphql.GraphQLInt }
        },
        resolve: function resolve(_, args) {
          return _Db2.default.models.Produccion.findOne({
            where: {
              Id: args.Id
            }
          }).then(function (R) {
            R.Cantidad = args.Cantidad;
            R.EnvaseId = args.EnvaseId;
            R.EnteId = args.ClienteId;
            R.save();
            return R;
          });
        }
      },
      UpdateProduccions: {
        type: Produccion,
        args: {
          Id: { type: _graphql.GraphQLInt },
          Orden: { type: _graphql.GraphQLString },
          Turno: { type: _graphql.GraphQLString },
          Fecha: { type: _graphql.GraphQLString },
          Lote: { type: _graphql.GraphQLString },
          FechaInicial: { type: _graphql.GraphQLString },
          FechaFinal: { type: _graphql.GraphQLString },
          HoraInicial: { type: _graphql.GraphQLString },
          HoraFinal: { type: _graphql.GraphQLString },
          FechaFabricacion: { type: _graphql.GraphQLString },
          FechaVencimiento: { type: _graphql.GraphQLString },
          PurezaFinal: { type: _graphql.GraphQLFloat },
          PresionFinal: { type: _graphql.GraphQLFloat },
          Observacion: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(_, args) {
          return _Db2.default.models.Produccion.update({
            Turno: args.Turno,
            Fecha: args.Fecha,
            Lote: args.Lote,
            FechaInicial: args.FechaInicial,
            FechaFinal: args.FechaFinal,
            HoraInicial: args.HoraInicial,
            HoraFinal: args.HoraFinal,
            FechaFabricacion: args.FechaFabricacion,
            FechaVencimiento: args.FechaVencimiento,
            PurezaFinal: args.PurezaFinal,
            PresionFinal: args.PresionFinal,
            Observacion: args.Observacion
          }, {
            where: {
              Orden: args.Orden
            }
          });
        }
      },
      DeleteProduccion: {
        type: Produccion,
        args: {
          Id: { type: _graphql.GraphQLInt }
        },
        resolve: function resolve(_, args) {
          return _Db2.default.models.Produccion.findOne({
            where: {
              Id: args.Id
            }
          }).then(function (R) {
            return R.destroy();
          });
        }
      },
      CreateRemision: {
        type: Remision,
        args: {
          Id: { type: _graphql.GraphQLInt },
          Numero: { type: _graphql.GraphQLString },
          Fecha: { type: _graphql.GraphQLString },
          EnteId: { type: _graphql.GraphQLInt },
          ProduccionId: { type: _graphql.GraphQLInt },
          EnvaseId: { type: _graphql.GraphQLInt },
          Total: { type: _graphql.GraphQLFloat }
        },
        resolve: function resolve(_, args) {
          return _Db2.default.models.Remision.create({
            Numero: args.Numero,
            Fecha: args.Fecha,
            EnteId: args.EnteId,
            ProduccionId: args.ProduccionId,
            EnvaseId: args.EnvaseId,
            Total: args.Total
          }).then(function (R) {
            return R;
          });
        }
      },
      UpdateRemision: {
        type: Remision,
        args: {
          Id: { type: _graphql.GraphQLInt },
          EnteId: { type: _graphql.GraphQLInt },
          ProduccionId: { type: _graphql.GraphQLInt },
          EnvaseId: { type: _graphql.GraphQLInt },
          Total: { type: _graphql.GraphQLFloat }
        },
        resolve: function resolve(_, args) {
          return _Db2.default.models.Remision.findOne({
            where: {
              Id: args.Id
            }
          }).then(function (R) {

            R.EnteId = args.EnteId;
            R.ProduccionId = args.ProduccionId;
            R.EnvaseId = args.EnvaseId;
            R.Total = args.Total;
            R.save();
            return R;
          });
        }
      },
      DeleteRemision: {
        type: Remision,
        args: {
          Id: { type: _graphql.GraphQLInt }
        },
        resolve: function resolve(_, args) {
          return _Db2.default.models.Remision.findOne({
            where: {
              Id: args.Id
            }
          }).then(function (R) {
            return R.destroy();
          });
        }
      },
      CreateKardexSale: {
        type: Kardex,
        args: {
          Cantidad: { type: _graphql.GraphQLFloat },
          ProductoId: { type: _graphql.GraphQLInt },
          EnvaseId: { type: _graphql.GraphQLInt },
          FechaElaboracion: { type: _graphql.GraphQLString },
          Lote: { type: _graphql.GraphQLString },
          FechaVencimiento: { type: _graphql.GraphQLString },
          EnteId: { type: _graphql.GraphQLInt },
          FechaSale: { type: _graphql.GraphQLString },
          NumeroFacturaSale: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(_, args) {
          return _Db2.default.models.Kardex.create({
            Cantidad: args.Cantidad,
            ProductoId: args.ProductoId,
            EnvaseId: args.EnvaseId,
            FechaElaboracion: args.FechaElaboracion,
            Lote: args.Lote,
            FechaVencimiento: args.FechaVencimiento,
            EnteId: args.EnteId,
            FechaSale: args.FechaSale,
            NumeroFacturaSale: args.NumeroFacturaSale,
            FechaEntra: null,
            NumeroFacturaEntra: null
          }).then(function (R) {
            return R;
          });
        }
      },
      CreateKardexEntra: {
        type: Kardex,
        args: {
          EnvaseId: { type: _graphql.GraphQLInt },
          EnteId: { type: _graphql.GraphQLInt },
          FechaEntra: { type: _graphql.GraphQLString },
          NumeroFacturaEntra: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(_, args) {
          return _Db2.default.models.Kardex.findOne({
            where: {
              EnvaseId: args.EnvaseId,
              EnteId: args.EnteId,
              FechaEntra: null,
              NumeroFacturaEntra: null
            }
          }).then(function (R) {
            if (R) {
              R.FechaEntra = args.FechaEntra;
              R.NumeroFacturaEntra = args.NumeroFacturaEntra;
              R.save();
            }

            return R;
          });
        }
      },
      DeleteKardexSale: {
        type: Kardex,
        args: {
          EnvaseId: { type: _graphql.GraphQLInt },
          NumeroFacturaSale: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(_, args) {
          return _Db2.default.models.Kardex.findOne({
            where: {
              EnvaseId: args.EnvaseId,
              NumeroFacturaSale: args.NumeroFacturaSale
            }
          }).then(function (R) {
            if (R) {
              R.destroy();
            }
            return R;
          });
        }
      },
      DeleteKardexEntra: {
        type: Kardex,
        args: {
          EnvaseId: { type: _graphql.GraphQLInt },
          NumeroFacturaEntra: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(_, args) {
          return _Db2.default.models.Kardex.findOne({
            where: {
              EnvaseId: args.EnvaseId,
              NumeroFacturaEntra: args.NumeroFacturaEntra
            }
          }).then(function (R) {
            if (R) {
              R.FechaEntra = null;
              R.NumeroFacturaEntra = null;
              R.save();
            }
            return R;
          });
        }
      }
    };
  }
});

//schema
var Schema = new _graphql.GraphQLSchema({
  query: Query,
  mutation: Mutation
});

exports.default = Schema;