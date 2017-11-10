import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList } from 'graphql';

import Db from '../Db';

const DianIdentificacion = new GraphQLObjectType({
  name: "DianIdentificacion",
  description: "Object representation of DianIdentificacion",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(DianIdentificacion) {
          return DianIdentificacion.Id;
        }
      },
      Codigo: {
        type: GraphQLString,
        resolve(DianIdentificacion) {
          return DianIdentificacion.Codigo;
        }
      },
      Nombre: {
        type: GraphQLString,
        resolve(DianIdentificacion) {
          return DianIdentificacion.Nombre;
        }
      }
    };
  }
});

const DianIdentificaciones = {
  type: new GraphQLList(DianIdentificacion),
  args: {
    Id: {type: GraphQLInt},
    Codigo: {type: GraphQLString},
    Nombre: {type: GraphQLString}
  },
  resolve(root, args) {
    return Db.models.DianIdentificacion.findAll({where: args});
  }
};

const CreateDianIdentificacion = {
  type: DianIdentificacion,
  args: {
    Codigo: {type: GraphQLString},
    Nombre: {type: GraphQLString},
  },
  resolve(_, args) {
    return Db.models.DianIdentificacion.create({
      Codigo: args.Codigo,
      Nombre: args.Nombre,
    });
  }
};


const UpdateDianIdentificacion = {
  type: DianIdentificacion,
  args: {
    Id: {type: GraphQLInt},
    Codigo: {type: GraphQLString},
    Nombre: {type: GraphQLString},
  },
  resolve(_, args) {
    return Db.models.DianIdentificacion.findOne({
      where: {Id: args.Id}
    }).then (R => {
      R.Codigo = args.Codigo;
      R.Nombre = args.Nombre;
      R.save();
      return R;
    });
  }
};


export {
  DianIdentificacion,
  DianIdentificaciones,
  CreateDianIdentificacion,
  UpdateDianIdentificacion
}
