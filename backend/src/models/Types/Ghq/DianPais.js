import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList } from 'graphql';

import Db from '../../Db';
import { DianDepartamento } from './DianDepartamento';

const DianPais = new GraphQLObjectType({
  name: "DianPais",
  description: "Object representation of DianPais",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(DianPais) {
          return DianPais.Id;
        }
      },
      Codigo: {
        type: GraphQLString,
        resolve(DianPais) {
          return DianPais.Codigo;
        }
      },
      Nombre: {
        type: GraphQLString,
        resolve(DianPais) {
          return DianPais.Nombre;
        }
      },
      DianDepartamentos:{
        type: new GraphQLList(DianDepartamento),
        resolve(DianPais){
          return DianPais.getDianDepartamentos();
        }
      }
    };
  }
});

const DianPaises = {
  type: new GraphQLList(DianPais),
  args: {
    Id: {type: GraphQLInt},
    Codigo: {type: GraphQLString},
    Nombre: {type: GraphQLString}
  },
  resolve(root, args) {
    return Db.models.DianPais.findAll({where: args});
  }
};

const CreateDianPais = {
  type: DianPais,
  args: {
    Codigo: {type: GraphQLString},
    Nombre: {type: GraphQLString},
  },
  resolve(_, args) {
    return Db.models.DianPais.create({
      Codigo: args.Codigo,
      Nombre: args.Nombre,
    });
  }
};


const UpdateDianPais = {
  type: DianPais,
  args: {
    Id: {type: GraphQLInt},
    Codigo: {type: GraphQLString},
    Nombre: {type: GraphQLString},
  },
  resolve(_, args) {
    return Db.models.DianPais.findOne({
      where: {Id: args.Id}
    }).then (R => {
      R.Codigo = args.Codigo;
      R.Nombre = args.Nombre;
      R.save();
      return R;
    });
  }
};


export {
  DianPais,
  DianPaises,
  CreateDianPais,
  UpdateDianPais
}
