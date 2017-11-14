import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList } from 'graphql';

import Db from '../Db';
import { Periodo } from './Periodo';
import { Cuenta } from './Cuenta';
import { CausacionItem } from './Causacion';

const Pago = new GraphQLObjectType({
  name: "Pago",
  description: "Object representation of Pago",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Pago) {
          return Pago.Id;
        }
      },
      Fecha: {
        type: GraphQLString,
        resolve(Pago) {
          return Pago.Fecha;
        }
      },
      Numero: {
        type: GraphQLString,
        resolve(Pago) {
          return Pago.Numero;
        }
      },
      PeriodoId: {
        type: GraphQLInt,
        resolve(Pago) {
          return Pago.PeriodoId;
        }
      },
      Concepto: {
        type: GraphQLString,
        resolve(Pago) {
          return Pago.Concepto;
        }
      },
      Total: {
        type: GraphQLFloat,
        resolve(Pago) {
          return Pago.Total;
        }
      },
      Periodo: {
        type: Periodo,
        resolve(Pago) {
          return Pago.getPeriodo();
        }
      },
      Items: {
        type: new GraphQLList(PagoItem),
        resolve(Pago) {
          return Pago.getPagoItems();
        }
      }
    };
  }
});

const PagoItem = new GraphQLObjectType({
  name: "PagoItem",
  description: "Object representation of PagoItem",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(PagoItem) {
          return PagoItem.Id;
        }
      },
      PagoId: {
        type: GraphQLInt,
        resolve(PagoItem) {
          return PagoItem.PagoId;
        }
      },
      CuentaDebeId: {
        type: GraphQLInt,
        resolve(PagoItem) {
          return PagoItem.CuentaDebeId;
        }
      },
      CausacionItemId: {
        type: GraphQLInt,
        resolve(PagoItem) {
          return PagoItem.CausacionItemId;
        }
      },
      Monto: {
        type: GraphQLFloat,
        resolve(PagoItem) {
          return PagoItem.Monto;
        }
      },
      Pago: {
        type: Pago,
        resolve(PagoItem) {
          return PagoItem.getPago();
        }
      },
      CuentaDebe: {
        type: Cuenta,
        resolve(PagoItem) {
          return PagoItem.getCuentaDebe();
        }
      },
      CausacionItems: {
        type: new GraphQLList(CausacionItem),
        resolve(PagoItem) {
          return PagoItem.getCausacionItems();
        }
      },
    };
  }
});

const Pagos = {
  type: new GraphQLList(Pago),
  args: {
    Id: {type: GraphQLInt},
    Fecha: {type: GraphQLString},
    Numero: {type: GraphQLString},
    PeriodoId: {type: GraphQLInt},
    Concepto: {type: GraphQLString},
    Total: {type: GraphQLFloat},
  },
  resolve(root, args) {
    return Db.models.Pago.findAll({where: args});
  }
};

const CreatePago = {
  type: Pago,
  args: {
    Fecha: {type: GraphQLString},
    Numero: {type: GraphQLString},
    PeriodoId: {type: GraphQLInt},
    Concepto: {type: GraphQLString},
    Total: {type: GraphQLFloat},
  },
  resolve(_, args) {
    return Db.models.Pago.create({
      Fecha: args.Fecha,
      Numero: args.Numero,
      PeriodoId: args.PeriodoId,
      Concepto: args.Concepto,
      Total: args.Total,
    });
  }
};


const UpdatePago = {
  type: Pago,
  args: {
    Id: {type: GraphQLInt},
    Fecha: {type: GraphQLString},
    Numero: {type: GraphQLString},
    PeriodoId: {type: GraphQLInt},
    Concepto: {type: GraphQLString},
    Total: {type: GraphQLFloat},
  },
  resolve(_, args) {
    return Db.models.Pago.findOne({
      where: {Id: args.Id}
    }).then (R => {
      R.Fecha = args.Fecha;
      R.Numero = args.Numero;
      R.PeriodoId = args.PeriodoId;
      R.Concepto = args.Concepto;
      R.Total = args.Total;
      R.save();
      return R;
    });
  }
};

const UpdatePagoItem = {
  type: PagoItem,
  args: {
    Id: {type: GraphQLInt},
    CuentaDebeId: {type: GraphQLInt},
    CuentaHaberId: {type: GraphQLInt},
    Monto: {type: GraphQLFloat},
  },
  resolve(_, args) {
    return Db.models.PagoItem.findOne({
      where: {Id: args.Id}
    }).then (R => {
      R.CuentaDebeId = args.CuentaDebeId;
      R.CuentaHaberId = args.CuentaHaberId;
      R.Monto = args.Monto;
      R.save();
      return R;
    });
  }
};


const PagoAddItem = {
  type: Pago,
  args: {
    PagoId: {type: GraphQLInt},
    CuentaDebeId: {type: GraphQLInt},
    CuentaHaberId: {type: GraphQLInt},
    Monto: {type: GraphQLFloat},
  },
  resolve(_, args) {
    return Db.models.PagoItem.create({
      PagoId: args.PagoId,
      CuentaDebeId: args.CuentaDebeId,
      CuentaHaberId: args.CuentaHaberId,
      Monto: args.Monto,
    }).then(RC => {
      return RC.getPago();
    });
  }
};


const PagoRemoveItem = {
  type: Pago,
  args: {
    PagoId: {type: GraphQLInt},
    PagoItemId: {type: GraphQLInt},
  },
  resolve(_, args) {
    return Db.models.PagoItem.findOne({
      where: {Id: args.PagoItemId}
    }).then(It => {
      return It.destroy().then(() => {
        return Db.models.Pago.findOne({
          where: {Id: args.PagoId}
        });
      });
    });
  }
};


export {
  Pago,
  Pagos,
  CreatePago,
  UpdatePago,
  PagoItem,
  UpdatePagoItem,
  PagoAddItem,
  PagoRemoveItem
}
