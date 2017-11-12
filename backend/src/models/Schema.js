import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema } from 'graphql';

import { User, Users, CreateUser, UpdateUser, UserAddGroup, UserRemoveGroup } from './Types/User';
import { Group, Groups, CreateGroup, UpdateGroup } from './Types/Group';
import { DianIdentificacion, DianIdentificaciones, CreateDianIdentificacion, UpdateDianIdentificacion } from './Types/DianIdentificacion';
import { DianPais, DianPaises, CreateDianPais, UpdateDianPais } from './Types/DianPais';
import { DianDepartamento, DianDepartamentos, CreateDianDepartamento, UpdateDianDepartamento } from './Types/DianDepartamento';
import { DianCiudad, DianCiudades, CreateDianCiudad, UpdateDianCiudad } from './Types/DianCiudad';
import { Periodo, Periodos, CreatePeriodo, UpdatePeriodo } from './Types/Periodo';
import { Tercero, Terceros, CreateTercero, UpdateTercero } from './Types/Tercero';
import { Cuenta, Cuentas, CreateCuenta, UpdateCuenta } from './Types/Cuenta';
import { Transaccion, Transacciones, CreateTransaccion, UpdateTransaccion } from './Types/Transaccion';
import { Ingreso, Ingresos, CreateIngreso, UpdateIngreso, IngresoItem, IngresoAddItem, IngresoRemoveItem } from './Types/Ingreso';


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
      DianCiudades,
      Periodos,
      Terceros,
      Cuentas,
      Transacciones,
      Ingresos,
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
      CreateDianIdentificacion,
      UpdateDianIdentificacion,
      CreateDianPais,
      UpdateDianPais,
      CreateDianDepartamento,
      UpdateDianDepartamento,
      CreateDianCiudad,
      UpdateDianCiudad,
      CreatePeriodo,
      UpdatePeriodo,
      CreateTercero,
      UpdateTercero,
      CreateCuenta,
      UpdateCuenta,
      CreateTransaccion,
      UpdateTransaccion,
      CreateIngreso,
      UpdateIngreso,
      IngresoAddItem,
      IngresoRemoveItem,
    };
  }
});


//schema
var Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
