import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList } from 'graphql';

import Db from '../Db.js';

const DianCiudad = new GraphQLObjectType({
  name: "DianCiudad",
  description: "Object representation of DianCiudad",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(DianCiudad) {
          return DianCiudad.Id;
        }
      },
      Codigo: {
        type: GraphQLString,
        resolve(DianCiudad) {
          return DianCiudad.Codigo;
        }
      },
      Nombre: {
        type: GraphQLString,
        resolve(DianCiudad) {
          return DianCiudad.Nombre;
        }
      }
    };
  }
});

const DianCiudades = {
  type: new GraphQLList(DianCiudad),
  args: {
    Id: {type: GraphQLInt},
    Codigo: {type: GraphQLString},
    Nombre: {type: GraphQLString}
  },
  resolve(root, args) {
    return Db.models.DianCiudad.findAll({where: args});
  }
};

const CreateDianCiudad = {
  type: DianCiudad,
  args: {
    Codigo: {type: GraphQLString},
    Nombre: {type: GraphQLString},
  },
  resolve(_, args) {
    return Db.models.DianCiudad.create({
      Codigo: args.Codigo,
      Nombre: args.Nombre,
    });
  }
};


const UpdateDianCiudad = {
  type: DianCiudad,
  args: {
    Id: {type: GraphQLInt},
    Codigo: {type: GraphQLString},
    Nombre: {type: GraphQLString},
  },
  resolve(_, args) {
    return Db.models.DianCiudad.findOne({
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
  DianCiudad,
  DianCiudades,
  CreateDianCiudad,
  UpdateDianCiudad
}
