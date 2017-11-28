<template lang="pug">
v-layout( align-center justify-center )
  v-snackbar(
    :timeout="snackbar.timeout"
    :success="snackbar.context === 'success'"
    :info="snackbar.context === 'info'"
    :warning="snackbar.context === 'warning'"
    :error="snackbar.context === 'error'"
    :primary="snackbar.context === 'primary'"
    :secondary="snackbar.context === 'secondary'"
    :multi-line="snackbar.mode === 'multi-line'"
    :vertical="snackbar.mode === 'vertical'"
    :top="true"
    v-model="loading" )
      h6(class="grey--text text--lighten-4 mb-0") {{ snackbar.text }}
      v-icon autorenew

  v-flex( xs12 mt-3 )
    v-card
      v-layout(row wrap pt-3 light-blue)
        v-flex( xs12 )
          h5(class="grey--text text--lighten-4 text-xs-center bold")
            v-icon(ma) assignment_returned
            | Ingreso
      v-card-text
        v-layout( row wrap)
          v-flex( xs12 )

            v-text-field( label="Número" v-model="Ingreso.Numero")


            v-menu( lazy
                    :close-on-content-click="true"
                    v-model="menu1"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )

              v-text-field( slot="activator"
                            label="Fecha"
                            v-model="Ingreso.Fecha"
                            readonly )

              v-date-picker( :months="months"
                           :days="days"
                           first-day-of-week="D"
                           :header-date-format="({ monthName, year }) => { return `${monthName} ${year}` }"
                           v-model="Ingreso.Fecha"
                           dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark warning @click.native="Fecha=null" ) Limpiar


            v-text-field( label="Concepto"
                          v-model="Ingreso.Concepto"
                          multi-line )

            v-data-table( :headers="Tabla.Headers"
                          :items="Ingreso.Items"
                          class="elevation-5 grey lighten-1 grey--text text--darken-4" )

              template(slot="headers" scope="props")
                th( v-for="(header, i) in props.headers"
                    :key="i"
                    class="text-xs-center" ) {{ header.text }}

              template(slot="items" scope="props")
                td(class="text-xs-center" :style="{minWidth: ''+(props.index.toString().length*10)+'px'}") {{ props.index + 1 }}
                td(class="text-xs-center" :style="{minWidth: ''+((props.item.CuentaDebe.Code.length + props.item.CuentaDebe.Name.length)*10)+'px'}") {{ props.item.CuentaDebe.Code }} - {{ props.item.CuentaDebe.Name }}
                td(class="text-xs-center" :style="{minWidth: ''+((props.item.CuentaHaber.Code.length + props.item.CuentaHaber.Name.length)*10)+'px'}") {{ props.item.CuentaHaber.Code }} - {{ props.item.CuentaHaber.Name }}
                td(class="text-xs-center" :style="{minWidth: ''+(props.item.Monto.length*10)+'px'}") {{ props.item.Monto | currency('$', 0) }}
                td(class="text-xs-center" :style="{minWidth: ''+(16)+'px'}")
                  v-btn( fab
                         dark
                         small
                         error
                         style="width: 16px; height:16px"
                         @click.native="Eliminar(props.item)")
                    v-icon(dark) remove

            v-select( label="Tipo"
                      :items="ConfIngresos"
                      item-text="Nombre"
                      return-object
                      class="mt-5"
                      v-model="ConfIngreso"
                      dark )

            v-money(label="Monto" v-model="Monto" maskType="currency")

            v-btn(fab dark class="blue mt-0" @click.native="Agregar"  :disabled="Ingreso.Id === null")
              v-icon(dark) add

      v-card-actions
        v-spacer
        v-btn( dark warning @click.native="Reset" ) Limpiar
        v-btn( dark primary @click.native="Guardar" ) Guardar
</template>

<script>

import TERCEROS from '~/queries/Terceros.gql';
import CREATE_TERCERO from '~/queries/CreateTercero.gql';
import UPDATE_TERCERO from '~/queries/UpdateTercero.gql';

import PERIODOS from '~/queries/Periodos.gql';

import CONFINGRESOS from '~/queries/ConfIngresos.gql';

import INGRESOS from '~/queries/Ingresos.gql';
import CREATE_INGRESO from '~/queries/CreateIngreso.gql';
import INGRESO_ADD_ITEM from '~/queries/IngresoAddItem.gql';


import VMoney from '~/components/MonetaryInput.vue';

export default {
  data: () => ({
    snackbar: {
      context: 'secondary',
      mode: '',
      timeout: 6000,
      text: 'Cargando'
    },
    menu1: false,
    months: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'],
    days: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    Periodo: {
      Id: null,
      Nombre: null,
      FechaInicial: null,
      FechaFinal: null,
      Estado: null,
    },
    Ingreso: {
      Id: null,
      Numero: null,
      Fecha: null,
      Concepto: null,
      Total: null,
      Items: [],
    },
    ConfIngresos: [],
    Monto: null,
    ConfIngreso: null,
    Tabla: {
      Headers: [
        {text: 'Nº', value: ''},
        {text: 'Cuenta Débito', value: 'CuentaDebito'},
        {text: 'Cuenta Crédito', value: 'CuentaCredito'},
        {text: 'Monto', value: 'Monto'},
        {text: 'Eliminar', value: 'Eliminar'},
      ],
    },
    loading: 0
  }),
  beforeMount () {
    if (sessionStorage.getItem('x-access-token') === null || sessionStorage.getItem('x-access-token') === null) {
      this.$router.push('/')
    }
  },
  apollo: {
    QPeriodo: {
      query: PERIODOS,
      variable: {
        Estado: 'Abierto'
      },
      loadingKey: 'loading',
      update (data) {
        if(data.Periodos.length > 0){
          this.Periodo = data.Periodos[0];
        }
      }
    },
    QConfIngresos: {
      query: CONFINGRESOS,
      loadingKey: 'loading',
      update (data) {
        this.ConfIngresos = data.ConfIngresos;
      }
    },
    QIngresos: {
      query: INGRESOS,
      variables () {
        return {
          Numero: this.Ingreso.Numero
        }
      },
      loadingKey: 'loading',
      update (data) {
        this.LoadIngreso(data)

      }
    }
  },
  methods: {
    LoadIngreso (data) {

      if(data.Ingresos.length > 0){
        this.Ingreso.Id = data.Ingresos[0].Id;
        this.Ingreso.Fecha = data.Ingresos[0].Fecha;
        this.Ingreso.Concepto = data.Ingresos[0].Concepto;
        this.Ingreso.Total = data.Ingresos[0].Total;
        this.Ingreso.Items = [].concat(data.Ingresos[0].Items);
      }
      else{
        this.PartialReset();
      }

    },
    Guardar () {
      if(this.Ingreso.Id !== null || this.Periodo.Id === null){
        return false;
      }

      this.$apollo.mutate({
        mutation: CREATE_INGRESO,
        variables:{
          Numero: this.Ingreso.Numero,
          Fecha: this.Ingreso.Fecha,
          PeriodoId: this.Periodo.Id,
          Concepto: this.Ingreso.Concepto,
          Total: 0,
        },
        update: (store, {data: res}) => {

          try{
            const data = store.readQuery({
              query: INGRESOS,
              variables: {
                Numero: res.CreateIngreso.Numero,
              },
            });

            data.Ingresos.push(res.CreateIngreso);

            store.writeQuery({
              query: INGRESOS,
              variables: {
                Numero: res.CreateIngreso.Numero,
              },
              data
            });

          }catch(Err){console.log(Err)}
        }
      });
    },
    Agregar () {

      const NewItem = {
        IngresoId: this.Ingreso.Id,
        CuentaDebeId: this.ConfIngreso.CuentaDebito.Id,
        CuentaHaberId: this.ConfIngreso.CuentaCredito.Id,
        Monto: this.Monto,
      }

      this.ConfIngreso = null;
      this.Monto = null;

      this.$apollo.mutate({
        mutation: INGRESO_ADD_ITEM,
        variables: {
          IngresoId: NewItem.IngresoId,
          CuentaDebeId: NewItem.CuentaDebeId,
          CuentaHaberId: NewItem.CuentaHaberId,
          Monto: NewItem.Monto,
        },
        update: (store, {data: res}) => {
          try{
            var data = store.readQuery({
              query: INGRESOS,
              variables: {
                Numero: res.IngresoAddItem.Numero,
              }
            });

            data.Ingresos.push(res.IngresoAddItem);

            store.writeQuery({
              query: INGRESOS,
              variables: {
                Numero: res.IngresoAddItem.Numero,
              },
              data
            });

          }catch(Err){console.log(Err)}

        }
      })
    },
    Eliminar(){

    },
    Reset () {
      this.Ingreso = {
        Id: null,
        Numero: null,
        Fecha: null,
        Concepto: null,
        Total: null,
        Items: [],
      };
    },
    PartialReset () {
      this.Ingreso.Id = null;
      this.Ingreso.Fecha = null;
      this.Ingreso.Concepto = null;
      this.Ingreso.Total = null;
      this.Ingreso.Items = []
    }
  },
  components: {
    VMoney
  },
};


</script>

<style lang="stylus" scoped>
h5.bold
  font-weight bold

.alert-especial
  position absolute

</style>
