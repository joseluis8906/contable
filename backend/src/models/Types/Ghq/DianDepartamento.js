import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList } from 'graphql';

import Db from '../../Db';
import { DianPais } from './DianPais';
import { DianCiudad } from './DianCiudad';

const DianDepartamento = new GraphQLObjectType({
  name: "DianDepartamento",
  description: "Object representation of DianDepartamento",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(DianDepartamento) {
          return DianDepartamento.Id;
        }
      },
      Codigo: {
        type: GraphQLString,
        resolve(DianDepartamento) {
          return DianDepartamento.Codigo;
        }
      },
      Nombre: {
        type: GraphQLString,
        resolve(DianDepartamento) {
          return DianDepartamento.Nombre;
        }
      },
      DianPaisId: {
        type: GraphQLInt,
        resolve(DianDepartamento) {
          return DianDepartamento.DianPaisId;
        }
      },
      DianPais: {
        type: DianPais,
        resolve(DianDepartamento) {
          return DianDepartamento.getDianPais();
        }
      },
      DianCiudades: {
        type: new GraphQLList(DianCiudad),
        resolve(DianDepartamento){
          return DianDepartamento.getDianCiudades();
        }
      }
    };
  }
});

const DianDepartamentos = {
  type: new GraphQLList(DianDepartamento),
  args: {
    Id: {type: GraphQLInt},
    Codigo: {type: GraphQLString},
    Nombre: {type: GraphQLString},
    DianPaisId: {type: GraphQLInt}
  },
  resolve(root, args) {
    return Db.models.DianDepartamento.findAll({where: args});
  }
};

const CreateDianDepartamento = {
  type: DianDepartamento,
  args: {
    Codigo: {type: GraphQLString},
    Nombre: {type: GraphQLString},
    DianPaisId: {type: GraphQLInt}
  },
  resolve(_, args) {
    return Db.models.DianDepartamento.create({
      Codigo: args.Codigo,
      Nombre: args.Nombre,
      DianPaisId: args.DianPaisId
    });
  }
};


const UpdateDianDepartamento = {
  type: DianDepartamento,
  args: {
    Id: {type: GraphQLInt},
    Codigo: {type: GraphQLString},
    Nombre: {type: GraphQLString},
    DianPaisId: {type: GraphQLInt}
  },
  resolve(_, args) {
    return Db.models.DianDepartamento.findOne({
      where: {Id: args.Id}
    }).then (R => {
      R.Codigo = args.Codigo;
      R.Nombre = args.Nombre;
      R.DianPaisId = args.DianPaisId;
      R.save();
      return R;
    });
  }
};


export {
  DianDepartamento,
  DianDepartamentos,
  CreateDianDepartamento,
  UpdateDianDepartamento
}
