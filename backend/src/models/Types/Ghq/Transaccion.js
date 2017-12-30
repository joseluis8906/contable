import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList } from 'graphql';

import Db from '../../Db';


const Transaccion = new GraphQLObjectType({
  name: "Transaccion",
  description: "Object representation of Transaccion",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Transaccion) {
          return Transaccion.Id;
        }
      },
      Tipo: {
        type: GraphQLString,
        resolve(Transaccion) {
          return Transaccion.Tipo;
        }
      },
      Numero: {
        type: GraphQLString,
        resolve(Transaccion) {
          return Transaccion.Numero;
        }
      },
      Estado: {
        type: GraphQLString,
        resolve(Transaccion) {
          return Transaccion.Estado;
        }
      },
    };
  }
});


const Transacciones = {
  type: new GraphQLList(Transaccion),
  args: {
    Id: {type: GraphQLInt},
    Tipo: {type: GraphQLString},
    Numero: {type: GraphQLString},
    Estado: {type: GraphQLString},
  },
  resolve(root, args) {
    return Db.models.Transaccion.findAll({where: args});
  }
};


const CreateTransaccion = {
  type: Transaccion,
  args: {
    Tipo: {type: GraphQLString},
    Numero: {type: GraphQLString},
    Estado: {type: GraphQLString},
  },
  resolve(_, args) {
    return Db.models.Transaccion.create({
      Tipo: args.Tipo,
      Numero: args.Numero,
      Estado: args.Estado,
    });
  }
};


const UpdateTransaccion = {
  type: Transaccion,
  args: {
    Id: {type: GraphQLInt},
    Tipo: {type: GraphQLString},
    Numero: {type: GraphQLString},
    Estado: {type: GraphQLString},
  },
  resolve(_, args) {
    return Db.models.Transaccion.findOne({
      where: {Id: args.Id}
    }).then (R => {
      R.Tipo = args.Tipo;
      R.Numero = args.Numero;
      R.Estado = args.Estado;
      R.save();
      return R;
    });
  }
};


export {
  Transaccion,
  Transacciones,
  CreateTransaccion,
  UpdateTransaccion
}
