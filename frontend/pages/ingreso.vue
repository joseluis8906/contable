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
                td(class="text-xs-center" :style="{minWidth: ''+((props.item.CuentaDebito.Code.length + props.item.CuentaDebito.Name.length)*10)+'px'}") {{ props.item.CuentaDebito.Code }} - {{ props.item.CuentaDebito.Name }}
                td(class="text-xs-center" :style="{minWidth: ''+((props.item.CuentaCredito.Code.length + props.item.CuentaCredito.Name.length)*10)+'px'}") {{ props.item.CuentaCredito.Code }} - {{ props.item.CuentaCredito.Name }}
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
          Numero: this.Ingreso.Numero,
        }
      },
      update (data) {
        if(data.Ingresos.length > 0){
          this.Ingreso = data.Ingresos[0]
        }
        console.log(this.Ingreso)
      }
    }
  },
  methods: {
    Agregar () {
      let tmp = Object.assign({Monto: this.Monto}, this.ConfIngreso);
      this.Ingreso.Items.push(tmp);
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
