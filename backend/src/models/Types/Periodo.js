import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList } from 'graphql';

import Db from '../Db';

const Periodo = new GraphQLObjectType({
  name: "Periodo",
  description: "Object representation of Periodo",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Periodo) {
          return Periodo.Id;
        }
      },
      Nombre: {
        type: GraphQLString,
        resolve(Periodo) {
          return Periodo.Nombre;
        }
      },
      Estado: {
        type: GraphQLString,
        resolve(Periodo) {
          return Periodo.Estado;
        }
      }
    };
  }
});

const Periodos = {
  type: new GraphQLList(Periodo),
  args: {
    Id: {type: GraphQLInt},
    Nombre: {type: GraphQLString},
    Estado: {type: GraphQLString}
  },
  resolve(root, args) {
    return Db.models.Periodo.findAll({where: args});
  }
};

const CreatePeriodo = {
  type: Periodo,
  args: {
    Nombre: {type: GraphQLString},
    Estado: {type: GraphQLString},
  },
  resolve(_, args) {
    return Db.models.Periodo.create({
      Nombre: args.Nombre,
      Estado: args.Estado,
    });
  }
};


const UpdatePeriodo = {
  type: Periodo,
  args: {
    Id: {type: GraphQLInt},
    Nombre: {type: GraphQLString},
    Estado: {type: GraphQLString},
  },
  resolve(_, args) {
    return Db.models.Periodo.findOne({
      where: {Id: args.Id}
    }).then (R => {
      R.Nombre = args.Nombre;
      R.Estado = args.Estado;
      R.save();
      return R;
    });
  }
};


export {
  Periodo,
  Periodos,
  CreatePeriodo,
  UpdatePeriodo
}
