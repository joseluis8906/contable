import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema } from 'graphql';

import Db from './Db.js';

var Tercero = new GraphQLObjectType({
  name: "Tercero",
  description: "Object representation of Tercero",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Tercero) {
          return Tercero.Id;
        }
      },
      TipoDeIdentificacion: {
        type: GraphQLString,
        resolve(Tercero) {
          return Tercero.TipoDeIdentificacion;
        }
      },
      NumeroDeIdentificacion: {
        type: GraphQLString,
        resolve(Tercero) {
          return Tercero.NumeroDeIdentificacion;
        }
      },
      DigitoDeVerificacion: {
        type: GraphQLString,
        resolve(Tercero) {
          return Tercero.DigitoDeVerificacion;
        }
      },
      PrimerApellido: {
        type: GraphQLString,
        resolve(Tercero) {
          return Tercero.PrimerApellido;
        }
      },
      SegundoApellido: {
        type: GraphQLString,
        resolve(Tercero) {
          return Tercero.SegundoApellido;
        }
      },
      PrimerNombre: {
        type: GraphQLString,
        resolve(Tercero) {
          return Tercero.PrimerNombre;
        }
      },
      OtrosNombres: {
        type: GraphQLString,
        resolve(Tercero) {
          return Tercero.OtrosNombres;
        }
      },
      RazonSocial: {
        type: GraphQLString,
        resolve(Tercero) {
          return Tercero.RazonSocial;
        }
      },
      Direccion: {
        type: GraphQLString,
        resolve(Tercero) {
          return Tercero.Direccion;
        }
      },
      CodigoDepartamento: {
        type: GraphQLString,
        resolve(Tercero) {
          return Tercero.CodigoDepartamento;
        }
      },
      CodigoMunicipio: {
        type: GraphQLString,
        resolve(Tercero) {
          return Tercero.CodigoMunicipio;
        }
      },
      PaisDeResidencia: {
        type: GraphQLString,
        resolve(Tercero) {
          return Tercero.PaisDeResidencia;
        }
      }
    };
  }
});




//Query
var Query = new GraphQLObjectType({
  name: "Query",
  description: "Object representation of Query",
  fields: () => {
    return {
      Hello: {
        type: GraphQLString,
        args: {},
        resolve(root, args) {
          return "world";
        }
      },
      Terceros: {
        type: new GraphQLList(Tercero),
        args: {
          Id: {type: GraphQLInt},
          TipoDeIdentificacion: {type: GraphQLString},
          NumeroDeIdentificacion: {type: GraphQLString},
          DigitoDeVerificacion: {type: GraphQLString},
          PrimerApellido: {type: GraphQLString},
          SegundoApellido: {type: GraphQLString},
          PrimerNombre: {type: GraphQLString},
          OtrosNombres: {type: GraphQLString},
          RazonSocial: {type: GraphQLString},
          Direccion: {type: GraphQLString},
          CodigoDepartamento: {type: GraphQLString},
          CodigoMunicipio: {type: GraphQLString},
          PaisDeResidencia: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Tercero.findAll({where: args});
        }
      }
    };
  }
});


//mutation
var Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Function to create stuf",
  fields: () => {
    return {
      CreateTercero: {
        type: Tercero,
        args: {
          TipoDeIdentificacion: {type: GraphQLString},
          NumeroDeIdentificacion: {type: GraphQLString},
          DigitoDeVerificacion: {type: GraphQLString},
          PrimerApellido: {type: GraphQLString},
          SegundoApellido: {type: GraphQLString},
          PrimerNombre: {type: GraphQLString},
          OtrosNombres: {type: GraphQLString},
          RazonSocial: {type: GraphQLString},
          Direccion: {type: GraphQLString},
          CodigoDepartamento: {type: GraphQLString},
          CodigoMunicipio: {type: GraphQLString},
          PaisDeResidencia: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Tercero.create({
            TipoDeIdentificacion: args.TipoDeIdentificacion,
            NumeroDeIdentificacion: args.NumeroDeIdentificacion,
            DigitoDeVerificacion: args.DigitoDeVerificacion,
            PrimerApellido: args.PrimerApellido,
            SegundoApellido: args.SegundoApellido,
            PrimerNombre: args.PrimerNombre,
            OtrosNombres: args.OtrosNombres,
            RazonSocial: args.RazonSocial,
            Direccion: args.Direccion,
            CodigoDepartamento: args.CodigoDepartamento,
            CodigoMunicipio: args.CodigoMunicipio,
            PaisDeResidencia: args.PaisDeResidencia
          });
        }
      },
      UpdateTercero: {
        type: Tercero,
        args: {
          Id: {type: GraphQLInt},
          TipoDeIdentificacion: {type: GraphQLString},
          NumeroDeIdentificacion: {type: GraphQLString},
          DigitoDeVerificacion: {type: GraphQLString},
          PrimerApellido: {type: GraphQLString},
          SegundoApellido: {type: GraphQLString},
          PrimerNombre: {type: GraphQLString},
          OtrosNombres: {type: GraphQLString},
          RazonSocial: {type: GraphQLString},
          Direccion: {type: GraphQLString},
          CodigoDepartamento: {type: GraphQLString},
          CodigoMunicipio: {type: GraphQLString},
          PaisDeResidencia: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Tercero.findOne({
            where: {Id: args.Id}
          }).then(R => {
            if (R !== null) {
              R.TipoDeIdentificacion = args.TipoDeIdentificacion;
              R.NumeroDeIdentificacion = args.NumeroDeIdentificacion;
              R.DigitoDeVerificacion = args.DigitoDeVerificacion;
              R.PrimerApellido = args.PrimerApellido;
              R.SegundoApellido = args.SegundoApellido;
              R.PrimerNombre = args.PrimerNombre;
              R.OtrosNombres = args.OtrosNombres;
              R.RazonSocial = args.RazonSocial;
              R.Direccion = args.Direccion;
              R.CodigoDepartamento = args.CodigoDepartamento;
              R.CodigoMunicipio = args.CodigoMunicipio;
              R.PaisDeResidencia = args.PaisDeResidencia;
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
var Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
