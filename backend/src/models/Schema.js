import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema } from 'graphql';

import { User, Users, CreateUser, UpdateUser, UserAddGroup, UserRemoveGroup } from './Types/Ghq/User';
import { Group, Groups, CreateGroup, UpdateGroup } from './Types/Ghq/Group';
import { DianIdentificacion, DianIdentificaciones, CreateDianIdentificacion, UpdateDianIdentificacion } from './Types/Ghq/DianIdentificacion';
import { DianPais, DianPaises, CreateDianPais, UpdateDianPais } from './Types/Ghq/DianPais';
import { DianDepartamento, DianDepartamentos, CreateDianDepartamento, UpdateDianDepartamento } from './Types/Ghq/DianDepartamento';
import { DianCiudad, DianCiudades, CreateDianCiudad, UpdateDianCiudad } from './Types/Ghq/DianCiudad';
import { Periodo, Periodos, CreatePeriodo, UpdatePeriodo } from './Types/Ghq/Periodo';
import { Tercero, Terceros, CreateTercero, UpdateTercero, TerceroAddCuenta, TerceroRemoveCuenta } from './Types/Ghq/Tercero';
import { Cuenta, Cuentas, CuentasLike, CreateCuenta, UpdateCuenta } from './Types/Ghq/Cuenta';
import { Transaccion, Transacciones, CreateTransaccion, UpdateTransaccion } from './Types/Ghq/Transaccion';
import { Ingreso, Ingresos, CreateIngreso, UpdateIngreso, IngresoItem, UpdateIngresoItem, IngresoAddItem, IngresoRemoveItem } from './Types/Ghq/Ingreso';
import { Causacion, Causaciones, CreateCausacion, UpdateCausacion, CausacionItem, UpdateCausacionItem, CausacionAddItem, CausacionRemoveItem } from './Types/Ghq/Causacion';
import { Pago, Pagos, CreatePago, UpdatePago, PagoItem, UpdatePagoItem, PagoAddItem, PagoRemoveItem } from './Types/Ghq/Pago';
import { Nota, Notas, CreateNota, UpdateNota, NotaItem, UpdateNotaItem, NotaAddItem, NotaRemoveItem } from './Types/Ghq/Nota';
import { SaldoInicial, SaldosIniciales, CreateSaldoInicial, UpdateSaldoInicial } from './Types/Ghq/SaldoInicial';
import { ConfIngreso, ConfIngresos, CreateConfIngreso, UpdateConfIngreso } from './Types/Ghq/ConfIngreso';

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
      SaldosIniciales,
      ConfIngresos,
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
      CreateSaldoInicial,
      UpdateSaldoInicial,
      CreateConfIngreso,
      UpdateConfIngreso,
    };
  }
});


//schema
var Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
