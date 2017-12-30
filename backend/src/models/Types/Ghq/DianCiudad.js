import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList } from 'graphql';

import Db from '../../Db';
import { DianDepartamento } from './DianDepartamento';

const DianCiudad = new GraphQLObjectType({
  name: "DianCiudad",
  description: "Object representation of DianCiudad",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(DianCiudad) {
          return DianCiudad.Id;
        }
      },
      Codigo: {
        type: GraphQLString,
        resolve(DianCiudad) {
          return DianCiudad.Codigo;
        }
      },
      Nombre: {
        type: GraphQLString,
        resolve(DianCiudad) {
          return DianCiudad.Nombre;
        }
      },
      DianDepartamentoId: {
        type: GraphQLInt,
        resolve(DianCiudad) {
          return DianCiudad.DianDepartamentoId;
        }
      },
      DianDepartamento: {
        type: DianDepartamento,
        resolve(DianCiudad) {
          return DianCiudad.getDianDepartamento();
        }
      }
    };
  }
});

const DianCiudades = {
  type: new GraphQLList(DianCiudad),
  args: {
    Id: {type: GraphQLInt},
    Codigo: {type: GraphQLString},
    Nombre: {type: GraphQLString},
    DianDepartamentoId: {type: GraphQLInt}
  },
  resolve(root, args) {
    return Db.models.DianCiudad.findAll({where: args});
  }
};

const CreateDianCiudad = {
  type: DianCiudad,
  args: {
    Codigo: {type: GraphQLString},
    Nombre: {type: GraphQLString},
    DianDepartamentoId: {type: GraphQLInt}
  },
  resolve(_, args) {
    return Db.models.DianCiudad.create({
      Codigo: args.Codigo,
      Nombre: args.Nombre,
      DianDepartamentoId: args.DianDepartamentoId
    });
  }
};


const UpdateDianCiudad = {
  type: DianCiudad,
  args: {
    Id: {type: GraphQLInt},
    Codigo: {type: GraphQLString},
    Nombre: {type: GraphQLString},
    DianDepartamentoId: {type: GraphQLInt}
  },
  resolve(_, args) {
    return Db.models.DianCiudad.findOne({
      where: {Id: args.Id}
    }).then (R => {
      R.Codigo = args.Codigo;
      R.Nombre = args.Nombre;
      R.DianDepartamentoId = args.DianDepartamentoId;
      R.save();
      return R;
    });
  }
};


export {
  DianCiudad,
  DianCiudades,
  CreateDianCiudad,
  UpdateDianCiudad
}
