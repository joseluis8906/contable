import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList } from 'graphql';


import Db from '../Db';
import { DianIdentificacion } from './DianIdentificacion';
import { DianPais } from './DianPais';
import { DianDepartamento } from './DianDepartamento';
import { DianCiudad } from './DianCiudad';

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
        type: GraphQLInt,
        resolve(Tercero) {
          return Tercero.DianPaisId;
        }
      },
      DianDepartamentoId: {
        type: GraphQLInt,
        resolve(Tercero) {
          return Tercero.DianDepartamentoId;
        }
      },
      DianCiudadId: {
        type: GraphQLInt,
        resolve(Tercero) {
          return Tercero.DianCiudadId;
        }
      },
      DianIdentificacion: {
        type: DianIdentificacion,
        resolve(Tercero) {
          return Tercero.getDianIdentificacion();
        }
      },
      DianPais: {
        type: DianPais,
        resolve(Tercero) {
          return Tercero.getDianPais();
        }
      },
      DianDepartamento: {
        type: DianDepartamento,
        resolve(Tercero) {
          return Tercero.getDianDepartamento();
        }
      },
      DianCiudad: {
        type: DianCiudad,
        resolve(Tercero) {
          return Tercero.getDianCiudad();
        }
      }
    };
  }
});


const Terceros = {
  type: new GraphQLList(Tercero),
  args: {
    Id: {type: GraphQLInt},
    DianIdentificacionId: {type: GraphQLInt},
    NumeroDeIdentificacion: {type: GraphQLString},
    PrimerApellido: {type: GraphQLString},
    SegundoApellido: {type: GraphQLString},
    PrimerNombre: {type: GraphQLString},
    OtrosNombres: {type: GraphQLString},
    RazonSocial: {type: GraphQLString},
    Direccion: {type: GraphQLString},
    DianPaisId: {type: GraphQLInt},
    DianDepartamentoId: {type: GraphQLInt},
    DianCiudad: {type: GraphQLInt}
  },
  resolve(root, args) {
    return Db.models.Tercero.findAll({where: args});
  }
};


const CreateTercero = {
  type: Tercero,
  args: {
    DianIdentificacionId: {type: GraphQLInt},
    NumeroDeIdentificacion: {type: GraphQLString},
    PrimerApellido: {type: GraphQLString},
    SegundoApellido: {type: GraphQLString},
    PrimerNombre: {type: GraphQLString},
    OtrosNombres: {type: GraphQLString},
    RazonSocial: {type: GraphQLString},
    Direccion: {type: GraphQLString},
    DianPaisId: {type: GraphQLInt},
    DianDepartamentoId: {type: GraphQLInt},
    DianCiudadId: {type: GraphQLInt}
  },
  resolve(_, args) {
    return Db.models.Tercero.create({
      DianIdentificacionId: args.TipoDeIdentificacionId,
      NumeroDeIdentificacion: args.NumeroDeIdentificacion,
      PrimerApellido: args.PrimerApellido,
      SegundoApellido: args.SegundoApellido,
      PrimerNombre: args.PrimerNombre,
      OtrosNombres: args.OtrosNombres,
      RazonSocial: args.RazonSocial,
      Direccion: args.Direccion,
      DianPaisId: args.DianPaisId,
      DianDepartamentoId: args.DianDepartamentoId,
      DianCiudadId: args.DianCiudadId,
    });
  }
};

const UpdateTercero = {
  type: Tercero,
  args: {
    Id: {type: GraphQLInt},
    DianIdentificacionId: {type: GraphQLInt},
    NumeroDeIdentificacion: {type: GraphQLString},
    PrimerApellido: {type: GraphQLString},
    SegundoApellido: {type: GraphQLString},
    PrimerNombre: {type: GraphQLString},
    OtrosNombres: {type: GraphQLString},
    RazonSocial: {type: GraphQLString},
    Direccion: {type: GraphQLString},
    DianPaisId: {type: GraphQLInt},
    DianDepartamentoId: {type: GraphQLInt},
    DianCiudadId: {type: GraphQLInt}
  },
  resolve(_, args) {
    return Db.models.Tercero.findOne({
      where: {Id: args.Id}
    }).then(R => {
      if (R !== null) {
        R.DianIdentificacionId = args.DianIdentificacionId;
        R.NumeroDeIdentificacion = args.NumeroDeIdentificacion;
        R.PrimerApellido = args.PrimerApellido;
        R.SegundoApellido = args.SegundoApellido;
        R.PrimerNombre = args.PrimerNombre;
        R.OtrosNombres = args.OtrosNombres;
        R.RazonSocial = args.RazonSocial;
        R.Direccion = args.Direccion;
        R.DianPaisId = args.DianPaisId;
        R.DianDepartamentoId = args.DianDepartamentoId;
        R.DianCiudadId = args.DianCiudadId;
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
