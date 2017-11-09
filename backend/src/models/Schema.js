import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema } from 'graphql';

import { User, Users, CreateUser, UpdateUser, UserAddGroup, UserRemoveGroup } from './Types/User.js';
import { Group, Groups, CreateGroup, UpdateGroup } from './Types/Group.js';
import { DianIdentificacion, DianIdentificaciones, CreateDianIdentificacion, UpdateDianIdentificacion } from './Types/DianIdentificacion.js';
import { DianPais, DianPaises, CreateDianPais, UpdateDianPais } from './Types/DianPais.js';
import { DianDepartamento, DianDepartamentos, CreateDianDepartamento, UpdateDianDepartamento } from './Types/DianDepartamento.js';

//Query
var Query = new GraphQLObjectType({
  name: "Query",
  description: "Object representation of Query",
  fields: () => {
    return {
      Hello: {
        type: GraphQLString,
        args: {},
        resolve(root, args) {
          return "world";
        }
      },
      Users,
      Groups,
      DianIdentificaciones,
      DianPaises,
      DianDepartamentos,
    }
  }
});


//mutation
var Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Function to create stuf",
  fields: () => {
    return {
      CreateUser,
      UpdateUser,
      UserAddGroup,
      UserRemoveGroup,
      CreateGroup,
      UpdateGroup,
      CreateDianPais,
      UpdateDianPais,
      CreateDianDepartamento,
      UpdateDianDepartamento,
    };
  }
});


//schema
var Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
