import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList } from 'graphql';


import Db from '../Db';
import {DianIdentificacion} from './DianIdentificacion'


const Tercero = new GraphQLObjectType({
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
      DianIdentificacionId: {
        type: GraphQLInt,
        resolve(Tercero) {
          return Tercero.DianIdentificacionId;
        }
      },
      NumeroDeIdentificacion: {
        type: GraphQLString,
        resolve(Tercero) {
          return Tercero.NumeroDeIdentificacion;
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
      DianPaisId: {
        type: GraphQLString,
        resolve(Tercero) {
          return Tercero.DianPaisId;
        }
      },
      DianDepartamentoId: {
        type: GraphQLString,
        resolve(Tercero) {
          return Tercero.DianDepartamentoId;
        }
      },
      DianCiudadId: {
        type: GraphQLString,
        resolve(Tercero) {
          return Tercero.DianMunicipioId;
        }
      },
      DianIdentificacion: {
        type: DianIdentificacion,
        resolve(Tercero) {
          return Tercero.getDianIdentificacion();
        }
      }
    };
  }
});


const Terceros: {
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
};


const CreateTercero = {
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
};

const UpdateTercero = {
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
};


export {
  Tercero,
  Terceros,
  CreateTercero,
  UpdateTercero
}
