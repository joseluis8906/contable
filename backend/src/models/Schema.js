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
import { Tercero, Terceros, CreateTercero, UpdateTercero, TerceroAddCuenta, TerceroRemoveCuenta } from './Types/Tercero';
import { Cuenta, Cuentas, CuentasLike, CreateCuenta, UpdateCuenta } from './Types/Cuenta';
import { Transaccion, Transacciones, CreateTransaccion, UpdateTransaccion } from './Types/Transaccion';
import { Ingreso, Ingresos, CreateIngreso, UpdateIngreso, IngresoItem, UpdateIngresoItem, IngresoAddItem, IngresoRemoveItem } from './Types/Ingreso';
import { Causacion, Causaciones, CreateCausacion, UpdateCausacion, CausacionItem, UpdateCausacionItem, CausacionAddItem, CausacionRemoveItem } from './Types/Causacion';
import { Pago, Pagos, CreatePago, UpdatePago, PagoItem, UpdatePagoItem, PagoAddItem, PagoRemoveItem } from './Types/Pago';
import { Nota, Notas, CreateNota, UpdateNota, NotaItem, UpdateNotaItem, NotaAddItem, NotaRemoveItem } from './Types/Nota';


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
      CuentasLike,
      Transacciones,
      Ingresos,
      Causaciones,
      Pagos,
      Notas,
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
      TerceroAddCuenta,
      TerceroRemoveCuenta,
      CreateCuenta,
      UpdateCuenta,
      CreateTransaccion,
      UpdateTransaccion,
      CreateIngreso,
      UpdateIngreso,
      UpdateIngresoItem,
      IngresoAddItem,
      IngresoRemoveItem,
      CreateCausacion,
      UpdateCausacion,
      UpdateCausacionItem,
      CausacionAddItem,
      CausacionRemoveItem,
      CreatePago,
      UpdatePago,
      UpdatePagoItem,
      PagoAddItem,
      PagoRemoveItem,
      CreateNota,
      UpdateNota,
      UpdateNotaItem,
      NotaAddItem,
      NotaRemoveItem,
    };
  }
});


//schema
var Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
