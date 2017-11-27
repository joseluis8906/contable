import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList } from 'graphql';

import Db from '../Db';

import { Periodo } from './Periodo';
import { Cuenta } from './Cuenta';


const SaldoInicial = new GraphQLObjectType({
  name: "SaldoInicial",
  description: "Object representation of SaldoInicial",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(SaldoInicial) {
          return SaldoInicial.Id;
        }
      },
      PeriodoId: {
        type: GraphQLString,
        resolve(SaldoInicial) {
          return SaldoInicial.PeriodoId;
        }
      },
      CuentaId: {
        type: GraphQLString,
        resolve(SaldoInicial) {
          return SaldoInicial.CuentaId;
        }
      },
      Monto: {
        type: GraphQLString,
        resolve(SaldoInicial) {
          return SaldoInicial.Monto;
        }
      },
      Periodo: {
        type: Periodo,
        resolve(SaldoInicial) {
          return SaldoInicial.getPeriodo();
        }
      },
      Cuenta: {
        type: Cuenta,
        resolve(SaldoInicial) {
          return SaldoInicial.getCuenta();
        }
      }
    };
  }
});

const SaldosIniciales = {
  type: new GraphQLList(SaldoInicial),
  args: {
    Id: {type: GraphQLInt},
    PeriodoId: {type: GraphQLInt},
    CuentaId: {type: GraphQLInt},
    Monto: {type: GraphQLFloat},
  },
  resolve(root, args) {
    return Db.models.SaldoInicial.findAll({where: args});
  }
};

const CreateSaldoInicial = {
  type: SaldoInicial,
  args: {
    PeriodoId: {type: GraphQLInt},
    CuentaId: {type: GraphQLInt},
    Monto: {type: GraphQLFloat},
  },
  resolve(_, args) {
    return Db.models.SaldoInicial.create({
      PeriodoId: args.PeriodoId,
      CuentaId: args.CuentaId,
      Monto: args.Monto,
    });
  }
};


const UpdateSaldoInicial = {
  type: SaldoInicial,
  args: {
    Id: {type: GraphQLInt},
    PeriodoId: {type: GraphQLInt},
    CuentaId: {type: GraphQLInt},
    Monto: {type: GraphQLFloat},
  },
  resolve(_, args) {
    return Db.models.SaldoInicial.findOne({
      where: {Id: args.Id}
    }).then (R => {
      R.PeriodoId = args.PeriodoId;
      R.CuentaId = args.CuentaId;
      R.Monto = args.Monto;
      R.save();
      return R;
    });
  }
};


export {
  SaldoInicial,
  SaldosIniciales,
  CreateSaldoInicial,
  UpdateSaldoInicial
}
