import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList } from 'graphql';

import Db from '../Db';

const DianDepartamento = new GraphQLObjectType({
  name: "DianDepartamento",
  description: "Object representation of DianDepartamento",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(DianDepartamento) {
          return DianDepartamento.Id;
        }
      },
      Codigo: {
        type: GraphQLString,
        resolve(DianDepartamento) {
          return DianDepartamento.Codigo;
        }
      },
      Nombre: {
        type: GraphQLString,
        resolve(DianDepartamento) {
          return DianDepartamento.Nombre;
        }
      }
    };
  }
});

const DianDepartamentos = {
  type: new GraphQLList(DianDepartamento),
  args: {
    Id: {type: GraphQLInt},
    Codigo: {type: GraphQLString},
    Nombre: {type: GraphQLString}
  },
  resolve(root, args) {
    return Db.models.DianDepartamento.findAll({where: args});
  }
};

const CreateDianDepartamento = {
  type: DianDepartamento,
  args: {
    Codigo: {type: GraphQLString},
    Nombre: {type: GraphQLString},
  },
  resolve(_, args) {
    return Db.models.DianDepartamento.create({
      Codigo: args.Codigo,
      Nombre: args.Nombre,
    });
  }
};


const UpdateDianDepartamento = {
  type: DianDepartamento,
  args: {
    Id: {type: GraphQLInt},
    Codigo: {type: GraphQLString},
    Nombre: {type: GraphQLString},
  },
  resolve(_, args) {
    return Db.models.DianDepartamento.findOne({
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
  DianDepartamento,
  DianDepartamentos,
  CreateDianDepartamento,
  UpdateDianDepartamento
}
