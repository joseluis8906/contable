import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList } from 'graphql';

import Db from '../Db';
import { Periodo } from './Periodo';
import { Cuenta } from './Cuenta';

const Nota = new GraphQLObjectType({
  name: "Nota",
  description: "Object representation of Nota",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Nota) {
          return Nota.Id;
        }
      },
      Fecha: {
        type: GraphQLString,
        resolve(Nota) {
          return Nota.Fecha;
        }
      },
      Numero: {
        type: GraphQLString,
        resolve(Nota) {
          return Nota.Numero;
        }
      },
      PeriodoId: {
        type: GraphQLInt,
        resolve(Nota) {
          return Nota.PeriodoId;
        }
      },
      Concepto: {
        type: GraphQLString,
        resolve(Nota) {
          return Nota.Concepto;
        }
      },
      Total: {
        type: GraphQLFloat,
        resolve(Nota) {
          return Nota.Total;
        }
      },
      Periodo: {
        type: Periodo,
        resolve(Nota) {
          return Nota.getPeriodo();
        }
      },
      Items: {
        type: new GraphQLList(NotaItem),
        resolve(Nota) {
          return Nota.getNotaItems();
        }
      }
    };
  }
});

const NotaItem = new GraphQLObjectType({
  name: "NotaItem",
  description: "Object representation of NotaItem",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(NotaItem) {
          return NotaItem.Id;
        }
      },
      NotaId: {
        type: GraphQLInt,
        resolve(NotaItem) {
          return NotaItem.NotaId;
        }
      },
      CuentaDebeId: {
        type: GraphQLInt,
        resolve(NotaItem) {
          return NotaItem.CuentaDebeId;
        }
      },
      CuentaHaberId: {
        type: GraphQLInt,
        resolve(NotaItem) {
          return NotaItem.CuentaHaberId;
        }
      },
      Monto: {
        type: GraphQLFloat,
        resolve(NotaItem) {
          return NotaItem.Monto;
        }
      },
      Nota: {
        type: Nota,
        resolve(NotaItem) {
          return NotaItem.getNota();
        }
      },
      CuentaDebe: {
        type: Cuenta,
        resolve(NotaItem) {
          return NotaItem.getCuentaDebe();
        }
      },
      CuentaHaber: {
        type: Cuenta,
        resolve(NotaItem) {
          return NotaItem.getCuentaHaber();
        }
      },
    };
  }
});

const Notaes = {
  type: new GraphQLList(Nota),
  args: {
    Id: {type: GraphQLInt},
    Fecha: {type: GraphQLString},
    Numero: {type: GraphQLString},
    PeriodoId: {type: GraphQLInt},
    Concepto: {type: GraphQLString},
    Total: {type: GraphQLFloat},
  },
  resolve(root, args) {
    return Db.models.Nota.findAll({where: args});
  }
};

const CreateNota = {
  type: Nota,
  args: {
    Fecha: {type: GraphQLString},
    Numero: {type: GraphQLString},
    PeriodoId: {type: GraphQLInt},
    Concepto: {type: GraphQLString},
    Total: {type: GraphQLFloat},
  },
  resolve(_, args) {
    return Db.models.Nota.create({
      Fecha: args.Fecha,
      Numero: args.Numero,
      PeriodoId: args.PeriodoId,
      Concepto: args.Concepto,
      Total: args.Total,
    });
  }
};


const UpdateNota = {
  type: Nota,
  args: {
    Id: {type: GraphQLInt},
    Fecha: {type: GraphQLString},
    Numero: {type: GraphQLString},
    PeriodoId: {type: GraphQLInt},
    Concepto: {type: GraphQLString},
    Total: {type: GraphQLFloat},
  },
  resolve(_, args) {
    return Db.models.Nota.findOne({
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

const UpdateNotaItem = {
  type: NotaItem,
  args: {
    Id: {type: GraphQLInt},
    CuentaDebeId: {type: GraphQLInt},
    CuentaHaberId: {type: GraphQLInt},
    Monto: {type: GraphQLFloat},
  },
  resolve(_, args) {
    return Db.models.NotaItem.findOne({
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


const NotaAddItem = {
  type: Nota,
  args: {
    NotaId: {type: GraphQLInt},
    CuentaDebeId: {type: GraphQLInt},
    CuentaHaberId: {type: GraphQLInt},
    Monto: {type: GraphQLFloat},
  },
  resolve(_, args) {
    return Db.models.NotaItem.create({
      NotaId: args.NotaId,
      CuentaDebeId: args.CuentaDebeId,
      CuentaHaberId: args.CuentaHaberId,
      Monto: args.Monto,
    }).then(RC => {
      return RC.getNota();
    });
  }
};


const NotaRemoveItem = {
  type: Nota,
  args: {
    NotaId: {type: GraphQLInt},
    NotaItemId: {type: GraphQLInt},
  },
  resolve(_, args) {
    return Db.models.NotaItem.findOne({
      where: {Id: args.NotaItemId}
    }).then(It => {
      return It.destroy().then(() => {
        return Db.models.Nota.findOne({
          where: {Id: args.NotaId}
        });
      });
    });
  }
};


export {
  Nota,
  Notaes,
  CreateNota,
  UpdateNota,
  NotaItem,
  UpdateNotaItem,
  NotaAddItem,
  NotaRemoveItem
}
