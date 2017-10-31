import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema } from 'graphql';

import Db from './Db.js';

var User = new GraphQLObjectType({
  name: "User",
  description: "Object representation of User",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(User) {
          return User.Id;
        }
      },
      UserName: {
        type: GraphQLString,
        resolve(User) {
          return User.UserName;
        }
      },
      Password: {
        type: GraphQLString,
        resolve(User) {
          return User.Password;
        }
      },
      Active: {
        type: GraphQLString,
        resolve(User) {
          return User.Active;
        }
      },
      Groups: {
        type: new GraphQLList(Group),
        resolve(User) {
          return User.getGroups();
        }
      }
    };
  }
});


var Group = new GraphQLObjectType({
  name: "Group",
  description: "Object representation of Group",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Group) {
          return Group.Id;
        }
      },
      Name: {
        type: GraphQLString,
        resolve(Group) {
          return Group.Name;
        }
      },
      Users: {
        type: new GraphQLList(User),
        resolve(Group) {
          return Group.getUsers();
        }
      }
    };
  }
});


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
      DianMunicipioId: {
        type: GraphQLString,
        resolve(Tercero) {
          return Tercero.DianMunicipioId;
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
      Users: {
        type: new GraphQLList(User),
        args: {
          Id: {type: GraphQLInt},
          UserName: {type: GraphQLString},
          Password: {type: GraphQLString},
          Active: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.User.findAll({where: args});
        }
      },
      Groups: {
        type: new GraphQLList(Group),
        args: {
          Id: {type: GraphQLInt},
          Name: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Group.findAll({where: args});
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
      CreateUser: {
        type: User,
        args: {
          UserName: {type: GraphQLString},
          Password: {type: GraphQLString},
          Active: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.User.create({
            UserName: args.UserName,
            Password: args.Password,
            Active: args.Active
          });
        }
      },
      UpdateUser: {
        type: User,
        args: {
          Id: {type: GraphQLInt},
          UserName: {type: GraphQLString},
          Password: {type: GraphQLString},
          Active: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.User.findOne({
            where: {Id: args.Id}
          }).then( R => {
            R.Password = args.Password,
            R.Active = args.Active
            R.save()
            return R;
          });
        }
      },
      CreateGroup: {
        type: Group,
        args: {
          Name: {type: GraphQLString},
        },
        resolve(_, args) {
          return Db.models.Group.create({
            Name: args.Name
          });
        }
      },
      UpdateGroup: {
        type: Group,
        args: {
          Id: {type: GraphQLInt},
          Name: {type: GraphQLString},
        },
        resolve(_, args) {
          return Db.models.Group.findOne({
            where: {Id: args.Id}
          }).then (R => {
            R.Name = args.Name;
            R.save();
            return R;
          });
        }
      },
      UserAddGroup: {
        type: User,
        args: {
          UserId: {type: GraphQLInt},
          GroupId: {type: GraphQLInt}
        },
        resolve(_, args) {
          return Db.models.User.findOne({
            where: {Id: args.UserId}
          }).then(U => {
            if (U !== null){
              return Db.models.Group.findOne({
                where: {Id: args.GroupId}
              }).then(G => {
                if (G !== null) {
                  return U.addGroup(G).then(R => {
                    return U;
                  })
                } else {
                  return U;
                }
              })
            } else {
              return U;
            }
          });
        }
      },
      UserRemoveGroup: {
        type: User,
        args: {
          UserId: {type: GraphQLInt},
          GroupId: {type: GraphQLInt},
        },
        resolve(_, args) {
          return Db.models.User.findOne({
            where: {Id: args.UserId}
          }).then(U => {
            if (U !== null){
              return Db.models.Group.findOne({
                where: {Id: args.GroupId}
              }).then(G => {
                if (G !== null) {
                  U.removeGroup(G)
                }
                return U;
              })
            } else {
              return U;
            }
          });
        }
      },
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
