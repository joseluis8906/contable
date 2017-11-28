import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList } from 'graphql';

import Db from '../Db';

import { Cuenta } from './Cuenta';


const ConfIngreso = new GraphQLObjectType({
  name: "ConfIngreso",
  description: "Object representation of ConfIngreso",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(ConfIngreso) {
          return ConfIngreso.Id;
        }
      },
      CuentaDebitoId: {
        type: GraphQLInt,
        resolve(ConfIngreso) {
          return ConfIngreso.CuentaDebitoId;
        }
      },
      CuentaCreditoId: {
        type: GraphQLInt,
        resolve(ConfIngreso) {
          return ConfIngreso.CuentaCreditoId;
        }
      },
      CuentaDebito: {
        type: Cuenta,
        resolve(ConfIngreso) {
          return ConfIngreso.getCuentaDebito();
        }
      },
      CuentaCredito: {
        type: Cuenta,
        resolve(ConfIngreso) {
          return ConfIngreso.getCuentaCredito();
        }
      }
    };
  }
});

const ConfIngresos = {
  type: new GraphQLList(ConfIngreso),
  args: {
    Id: {type: GraphQLInt},
    Nombre: {type: GraphQLString},
    CuentaDebitoId: {type: GraphQLInt},
    CuentaCreditoId: {type: GraphQLInt},
  },
  resolve(root, args) {
    return Db.models.ConfIngreso.findAll({where: args});
  }
};

const CreateConfIngreso = {
  type: ConfIngreso,
  args: {
    Nombre: {type: GraphQLString},
    CuentaDebitoId: {type: GraphQLInt},
    CuentaCreditoId: {type: GraphQLInt},
  },
  resolve(_, args) {
    return Db.models.ConfIngreso.create({
      Nombre: args.Nombre,
      CuentaDebitoId: args.CuentaDebitoId,
      CuentaCreditoId: args.CuentaCreditoId,
    });
  }
};


const UpdateConfIngreso = {
  type: ConfIngreso,
  args: {
    Id: {type: GraphQLInt},
    Nombre: {type: GraphQLString},
    CuentaDebitoId: {type: GraphQLInt},
    CuentaCreditoId: {type: GraphQLInt},
  },
  resolve(_, args) {
    return Db.models.ConfIngreso.findOne({
      where: {Id: args.Id}
    }).then (R => {
      R.Nombre = args.Nombre;
      R.CuentaDebitoId = args.CuentaDebitoId;
      R.CuentaCreditoId = args.CuentaCreditoId;
      R.save();
      return R;
    });
  }
};


export {
  ConfIngreso,
  ConfIngresos,
  CreateConfIngreso,
  UpdateConfIngreso
}
