import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList } from 'graphql';

import Db from '../../Db';
import { Periodo } from './Periodo';
import { Cuenta } from './Cuenta';

const Ingreso = new GraphQLObjectType({
  name: "Ingreso",
  description: "Object representation of Ingreso",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Ingreso) {
          return Ingreso.Id;
        }
      },
      Fecha: {
        type: GraphQLString,
        resolve(Ingreso) {
          return Ingreso.Fecha;
        }
      },
      Numero: {
        type: GraphQLString,
        resolve(Ingreso) {
          return Ingreso.Numero;
        }
      },
      PeriodoId: {
        type: GraphQLInt,
        resolve(Ingreso) {
          return Ingreso.PeriodoId;
        }
      },
      Concepto: {
        type: GraphQLString,
        resolve(Ingreso) {
          return Ingreso.Concepto;
        }
      },
      Total: {
        type: GraphQLFloat,
        resolve(Ingreso) {
          return Ingreso.Total;
        }
      },
      Periodo: {
        type: Periodo,
        resolve(Ingreso) {
          return Ingreso.getPeriodo();
        }
      },
      Items: {
        type: new GraphQLList(IngresoItem),
        resolve(Ingreso) {
          return Ingreso.getIngresoItems();
        }
      }
    };
  }
});

const IngresoItem = new GraphQLObjectType({
  name: "IngresoItem",
  description: "Object representation of IngresoItem",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(IngresoItem) {
          return IngresoItem.Id;
        }
      },
      IngresoId: {
        type: GraphQLInt,
        resolve(IngresoItem) {
          return IngresoItem.IngresoId;
        }
      },
      CuentaDebeId: {
        type: GraphQLInt,
        resolve(IngresoItem) {
          return IngresoItem.CuentaDebeId;
        }
      },
      CuentaHaberId: {
        type: GraphQLInt,
        resolve(IngresoItem) {
          return IngresoItem.CuentaHaberId;
        }
      },
      Monto: {
        type: GraphQLFloat,
        resolve(IngresoItem) {
          return IngresoItem.Monto;
        }
      },
      Ingreso: {
        type: Ingreso,
        resolve(IngresoItem) {
          return IngresoItem.getIngreso();
        }
      },
      CuentaDebe: {
        type: Cuenta,
        resolve(IngresoItem) {
          return IngresoItem.getCuentaDebe();
        }
      },
      CuentaHaber: {
        type: Cuenta,
        resolve(IngresoItem) {
          return IngresoItem.getCuentaHaber();
        }
      },
    };
  }
});

const Ingresos = {
  type: new GraphQLList(Ingreso),
  args: {
    Id: {type: GraphQLInt},
    Fecha: {type: GraphQLString},
    Numero: {type: GraphQLString},
    PeriodoId: {type: GraphQLInt},
    Concepto: {type: GraphQLString},
    Total: {type: GraphQLFloat},
  },
  resolve(root, args) {
    return Db.models.Ingreso.findAll({where: args});
  }
};

const CreateIngreso = {
  type: Ingreso,
  args: {
    Fecha: {type: GraphQLString},
    Numero: {type: GraphQLString},
    PeriodoId: {type: GraphQLInt},
    Concepto: {type: GraphQLString},
    Total: {type: GraphQLFloat},
  },
  resolve(_, args) {
    return Db.models.Ingreso.create({
      Fecha: args.Fecha,
      Numero: args.Numero,
      PeriodoId: args.PeriodoId,
      Concepto: args.Concepto,
      Total: args.Total,
    });
  }
};


const UpdateIngreso = {
  type: Ingreso,
  args: {
    Id: {type: GraphQLInt},
    Fecha: {type: GraphQLString},
    Numero: {type: GraphQLString},
    PeriodoId: {type: GraphQLInt},
    Concepto: {type: GraphQLString},
    Total: {type: GraphQLFloat},
  },
  resolve(_, args) {
    return Db.models.Ingreso.findOne({
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

const UpdateIngresoItem = {
  type: IngresoItem,
  args: {
    Id: {type: GraphQLInt},
    CuentaDebeId: {type: GraphQLInt},
    CuentaHaberId: {type: GraphQLInt},
    Monto: {type: GraphQLFloat},
  },
  resolve(_, args) {
    return Db.models.IngresoItem.findOne({
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


const IngresoAddItem = {
  type: Ingreso,
  args: {
    IngresoId: {type: GraphQLInt},
    CuentaDebeId: {type: GraphQLInt},
    CuentaHaberId: {type: GraphQLInt},
    Monto: {type: GraphQLFloat},
  },
  resolve(_, args) {
    return Db.models.IngresoItem.create({
      IngresoId: args.IngresoId,
      CuentaDebeId: args.CuentaDebeId,
      CuentaHaberId: args.CuentaHaberId,
      Monto: args.Monto,
    }).then(RC => {
      return RC.getIngreso();
    });
  }
};


const IngresoRemoveItem = {
  type: Ingreso,
  args: {
    IngresoId: {type: GraphQLInt},
    IngresoItemId: {type: GraphQLInt},
  },
  resolve(_, args) {
    return Db.models.IngresoItem.findOne({
      where: {Id: args.IngresoItemId}
    }).then(It => {
      return It.destroy().then(() => {
        return Db.models.Ingreso.findOne({
          where: {Id: args.IngresoId}
        });
      });
    });
  }
};


export {
  Ingreso,
  Ingresos,
  CreateIngreso,
  UpdateIngreso,
  IngresoItem,
  UpdateIngresoItem,
  IngresoAddItem,
  IngresoRemoveItem
}
