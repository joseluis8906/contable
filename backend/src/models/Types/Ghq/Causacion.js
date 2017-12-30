import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList } from 'graphql';

import Db from '../../Db';
import { Periodo } from './Periodo';
import { Cuenta } from './Cuenta';

const Causacion = new GraphQLObjectType({
  name: "Causacion",
  description: "Object representation of Causacion",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Causacion) {
          return Causacion.Id;
        }
      },
      Fecha: {
        type: GraphQLString,
        resolve(Causacion) {
          return Causacion.Fecha;
        }
      },
      Numero: {
        type: GraphQLString,
        resolve(Causacion) {
          return Causacion.Numero;
        }
      },
      PeriodoId: {
        type: GraphQLInt,
        resolve(Causacion) {
          return Causacion.PeriodoId;
        }
      },
      Concepto: {
        type: GraphQLString,
        resolve(Causacion) {
          return Causacion.Concepto;
        }
      },
      Total: {
        type: GraphQLFloat,
        resolve(Causacion) {
          return Causacion.Total;
        }
      },
      Periodo: {
        type: Periodo,
        resolve(Causacion) {
          return Causacion.getPeriodo();
        }
      },
      Items: {
        type: new GraphQLList(CausacionItem),
        resolve(Causacion) {
          return Causacion.getCausacionItems();
        }
      }
    };
  }
});

const CausacionItem = new GraphQLObjectType({
  name: "CausacionItem",
  description: "Object representation of CausacionItem",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(CausacionItem) {
          return CausacionItem.Id;
        }
      },
      CausacionId: {
        type: GraphQLInt,
        resolve(CausacionItem) {
          return CausacionItem.CausacionId;
        }
      },
      CuentaDebeId: {
        type: GraphQLInt,
        resolve(CausacionItem) {
          return CausacionItem.CuentaDebeId;
        }
      },
      CuentaHaberId: {
        type: GraphQLInt,
        resolve(CausacionItem) {
          return CausacionItem.CuentaHaberId;
        }
      },
      Monto: {
        type: GraphQLFloat,
        resolve(CausacionItem) {
          return CausacionItem.Monto;
        }
      },
      Causacion: {
        type: Causacion,
        resolve(CausacionItem) {
          return CausacionItem.getCausacion();
        }
      },
      CuentaDebe: {
        type: Cuenta,
        resolve(CausacionItem) {
          return CausacionItem.getCuentaDebe();
        }
      },
      CuentaHaber: {
        type: Cuenta,
        resolve(CausacionItem) {
          return CausacionItem.getCuentaHaber();
        }
      },
    };
  }
});

const Causaciones = {
  type: new GraphQLList(Causacion),
  args: {
    Id: {type: GraphQLInt},
    Fecha: {type: GraphQLString},
    Numero: {type: GraphQLString},
    PeriodoId: {type: GraphQLInt},
    Concepto: {type: GraphQLString},
    Total: {type: GraphQLFloat},
  },
  resolve(root, args) {
    return Db.models.Causacion.findAll({where: args});
  }
};

const CreateCausacion = {
  type: Causacion,
  args: {
    Fecha: {type: GraphQLString},
    Numero: {type: GraphQLString},
    PeriodoId: {type: GraphQLInt},
    Concepto: {type: GraphQLString},
    Total: {type: GraphQLFloat},
  },
  resolve(_, args) {
    return Db.models.Causacion.create({
      Fecha: args.Fecha,
      Numero: args.Numero,
      PeriodoId: args.PeriodoId,
      Concepto: args.Concepto,
      Total: args.Total,
    });
  }
};


const UpdateCausacion = {
  type: Causacion,
  args: {
    Id: {type: GraphQLInt},
    Fecha: {type: GraphQLString},
    Numero: {type: GraphQLString},
    PeriodoId: {type: GraphQLInt},
    Concepto: {type: GraphQLString},
    Total: {type: GraphQLFloat},
  },
  resolve(_, args) {
    return Db.models.Causacion.findOne({
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

const UpdateCausacionItem = {
  type: CausacionItem,
  args: {
    Id: {type: GraphQLInt},
    CuentaDebeId: {type: GraphQLInt},
    CuentaHaberId: {type: GraphQLInt},
    Monto: {type: GraphQLFloat},
  },
  resolve(_, args) {
    return Db.models.CausacionItem.findOne({
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


const CausacionAddItem = {
  type: Causacion,
  args: {
    CausacionId: {type: GraphQLInt},
    CuentaDebeId: {type: GraphQLInt},
    CuentaHaberId: {type: GraphQLInt},
    Monto: {type: GraphQLFloat},
  },
  resolve(_, args) {
    return Db.models.CausacionItem.create({
      CausacionId: args.CausacionId,
      CuentaDebeId: args.CuentaDebeId,
      CuentaHaberId: args.CuentaHaberId,
      Monto: args.Monto,
    }).then(RC => {
      return RC.getCausacion();
    });
  }
};


const CausacionRemoveItem = {
  type: Causacion,
  args: {
    CausacionId: {type: GraphQLInt},
    CausacionItemId: {type: GraphQLInt},
  },
  resolve(_, args) {
    return Db.models.CausacionItem.findOne({
      where: {Id: args.CausacionItemId}
    }).then(It => {
      return It.destroy().then(() => {
        return Db.models.Causacion.findOne({
          where: {Id: args.CausacionId}
        });
      });
    });
  }
};


export {
  Causacion,
  Causaciones,
  CreateCausacion,
  UpdateCausacion,
  CausacionItem,
  UpdateCausacionItem,
  CausacionAddItem,
  CausacionRemoveItem
}
