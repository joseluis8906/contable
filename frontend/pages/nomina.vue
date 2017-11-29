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
          h5(class="grey--text text--lighten-4 text-xs-center" style="font-weight: bold")
            v-icon perm_contact_calendar
            |  Nómina

      v-tabs(dark fixed icons grow v-model="TabActive")
        v-tabs-bar(slot="activators" class="light-blue darken-4")
          v-tabs-slider(class="success")
          v-tabs-item(href="#tab-1" @click.native="Reset")
            v-icon create
            h6(class="body-2 grey--text text--lighten-4") Editar

          v-tabs-item(href="#tab-2" @click.native="Reset")
            v-icon search
            h6(class="body-2 grey--text text--lighten-4") Listar

        //- Editar
        v-tabs-content(id="tab-1")
          v-card-text
            v-layout( row wrap)
              v-flex( xs12 )
                v-select(label="Tercero")
                v-money(label="SLMV" maskType="currency" v-model="Comodines.SLMV")
                v-money(label="Salario" maskType="currency" v-model="Comodines.Salario")
                v-money(label="Auxilio De Transporte" maskType="currency" v-model="Empleado.AuxilioDeTransporte")
                v-text-field(type="number" label="Tiempo" max=31 min=1 v-model="Comodines.Tiempo")
                v-money(label="Sueldo" maskType="currency" v-model="Empleado.Sueldo")
                v-money(label="Cesantias" maskType="currency" v-model="Empleado.Cesantias")
                v-money(label="Intereses Sobre Cesantias" maskType="currency" v-model="Empleado.InteresesSobreCesantias")
                v-money(label="Prima Legal" maskType="currency" v-model="Empleado.PrimaLegal")
                v-money(label="Vacaciones" maskType="currency" v-model="Empleado.Vacaciones")
                v-money(label="Aportes De Salud" maskType="currency" v-model="Empleado.AportesDeSalud")
                v-money(label="Aportes De Pensión" maskType="currency" v-model="Empleado.AportesDePension")
                v-money(label="Aportes A.R.L" maskType="currency" v-model="Empleado.AportesARL")
                v-money(label="Aportes Caja De Compensación" maskType="currency" v-model="Empleado.AportesCajaCompensacion")
                v-money(label="Aportes ICBF" maskType="currency" v-model="Empleado.AportesICBF")
                v-money(label="Aportes SENA" maskType="currency" v-model="Empleado.AportesSENA")


        //- Listar
        v-tabs-content(id="tab-2")
          v-card-text
            v-layout( row wrap)
              v-flex( xs12 )

                v-data-table( :headers="Tabla.Headers"
                              :items="Nomina.Items"
                              class="elevation-5 grey lighten-1 grey--text text--darken-4" )

                  template(slot="headers" scope="props")
                    th( v-for="(header, i) in props.headers"
                        :key="i"
                        class="text-xs-center" ) {{ header.text }}

                  template(slot="items" scope="props")
                    td(class="text-xs-center" :style="{minWidth: ''+(props.index.toString().length*10)+'px'}") {{ props.index + 1 }}
                    td(class="text-xs-center" :style="{minWidth: ''+(props.item.CuentaDebe.Name.length)*10+'px'}") {{ props.item.CuentaDebe.Code }}
                    td(class="text-xs-center" :style="{minWidth: ''+(props.item.CuentaHaber.Name.length*10)+'px'}") {{ props.item.CuentaHaber.Code }}
                    td(class="text-xs-center" :style="{minWidth: ''+(props.item.Monto.length*10)+'px'}") {{ props.item.Monto | currency('$', 0) }}
                    td(class="text-xs-center" :style="{minWidth: ''+(16)+'px'}")
                      v-btn( fab
                             dark
                             small
                             error
                             style="width: 16px; height:16px"
                             @click.native="Eliminar(props.item)")
                        v-icon(dark) remove

</template>

<style lang="stylus" scoped>
</style>

<script>
import VMoney from '~/components/MonetaryInput.vue';

export default {
  data () {
    return {
      snackbar: {
        context: 'secondary',
        mode: '',
        timeout: 6000,
        text: 'Cargando'
      },
      Comodines: {
        SLMV: 737717,
        Salario: 887860,
        Tiempo: 1,
      },
      Empleado: {
        Tercero: null,
        Sueldo: null,
        AuxilioDeTransporte: 83140,
        Cesantias: null,
        InteresesSobreCesantias: null,
        PrimaLegal: null,
        Vacaciones: null,
        AportesDeSalud: null,
        AportesDePension: null,
        AportesARL: null,
        AportesCajaCompensacion: null,
        AportesICBF: null,
        AportesSENA: null,
      },
      Nomina: {
        Items: [],
      },
      Tabla: {
        Headers: [
          {text: 'Nº', value: ''},
          {text: 'Cédula', value: 'Documento'},
          {text: 'Nombre', value: 'Nombre'},
          {text: 'Sueldo', value: 'Sueldo'},
          {text: 'Auxilio De Transporte', value: 'AuxilioDeTransporte'},
          {text: 'Cesantías', value: 'Cesantias'},//prestaciones
          {text: 'Interes Sobre Cesantías', value: 'InteresesSobreCesantias'},//prestaciones
          {text: 'Prima Legal', value: 'PrimaLegal'},//prestaciones
          {text: 'Vacaciones', value: 'Vacaciones'},//prestaciones
          {text: 'Aportes De Salud', value: 'AportesDeSalud'},//seguridad social
          {text: 'Aportes De Pensión', value: 'AportesDePension'},//seguridad social
          {text: 'Aportes A.R.L', value: 'AportesARL'},//seguridad social
          {text: 'A. Caja De Compensación', value: 'AportesCajaCompensacion'},//seguridad social
          {text: 'Aportes ICBF', value: 'AportesICBF'},//seguridad social
          {text: 'Aportes SENA', value: 'AportesSENA'},//seguridad social
          {text: 'Eliminar', value: 'Eliminar'},
        ],
      },
      TabActive:null,
      loading: 0
    }
  },
  watch: {
    Comodines: {
      handler () {
        this.CalcularPrestaciones()
      },
      deep: true,
    },
    Empleado: {
      handler () {
        this.CalcularPrestaciones()
      },
      deep: true,
    },
  },
  methods: {
    CalcularPrestaciones () {
      if( this.Comodines.SLMV !== null &&
          this.Comodines.Salario !== null &&
          this.Empleado.AuxilioDeTransporte !== null ) {

        this.Empleado.Sueldo = Number(this.Comodines.Salario + this.Empleado.AuxilioDeTransporte);
        this.Empleado.Cesantias = Math.round(Number((this.Empleado.Sueldo*this.Comodines.Tiempo)/360));
        this.Empleado.InteresesSobreCesantias = Math.round(Number((this.Empleado.Sueldo*this.Comodines.Tiempo)/30)*0.01);
        this.Empleado.PrimaLegal = this.Empleado.Cesantias;
        this.Empleado.Vacaciones = Math.round(Number(this.Comodines.Salario*this.Comodines.Tiempo)/720)

        this.Empleado.AportesDeSalud = Math.round(this.Comodines.SLMV*0.085)//empleado le toca el 0.04
        this.Empleado.AportesDePension = Math.round((this.Comodines.SLMV*0.12))//empleado le toca 0.04
        this.Empleado.AportesCajaCompensacion = Math.round(this.Comodines.SLMV*0.04)
        this.Empleado.AportesARL = Math.round(this.Comodines.SLMV*0.00522)
        this.Empleado.AportesICBF = Math.round(this.Comodines.SLMV*0.03)
        this.Empleado.AportesSENA = Math.round(this.Comodines.SLMV*0.02)

      }
    },
    Reset () {

    }
  },
  components: {
    VMoney,
  }
}
</script>
