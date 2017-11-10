import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList } from 'graphql';

import Db from '../Db';
import { Tercero } from './Tercero';

const Cuenta = new GraphQLObjectType({
  name: "Cuenta",
  description: "Object representation of Cuenta",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Cuenta) {
          return Cuenta.Id;
        }
      },
      Type: {
        type: GraphQLString,
        resolve(Cuenta) {
          return Cuenta.Type;
        }
      },
      Code: {
        type: GraphQLString,
        resolve(Cuenta) {
          return Cuenta.Code;
        }
      },
      Name: {
        type: GraphQLString,
        resolve(Cuenta) {
          return Cuenta.Name;
        }
      },
      Tercero: {
        type: Tercero,
        resolve(Cuenta) {
          return Cuenta.getTercero()
        }
      }
    };
  }
});

const Cuentas = {
  type: new GraphQLList(Cuenta),
  args: {
    Id: {type: GraphQLInt},
    Type: {type: GraphQLString},
    Code: {type: GraphQLString},
    Name: {type: GraphQLString},
  },
  resolve(root, args) {
    return Db.models.Cuenta.findAll({where: args});
  }
};

const CreateCuenta = {
  type: Cuenta,
  args: {
    Type: {type: GraphQLString},
    Code: {type: GraphQLString},
    Name: {type: GraphQLString},
  },
  resolve(_, args) {
    return Db.models.Cuenta.create({
      Type: args.Type,
      Code: args.Code,
      Name: args.Name,
    });
  }
};


const UpdateCuenta = {
  type: Cuenta,
  args: {
    Id: {type: GraphQLInt},
    Type: {type: GraphQLString},
    Code: {type: GraphQLString},
    Name: {type: GraphQLString},
  },
  resolve(_, args) {
    return Db.models.Cuenta.findOne({
      where: {Id: args.Id}
    }).then (R => {
      R.Type = args.Type;
      R.Code = args.Code;
      R.Name = args.Name;
      R.save();
      return R;
    });
  }
};


export {
  Cuenta,
  Cuentas,
  CreateCuenta,
  UpdateCuenta
}
