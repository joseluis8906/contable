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
  
  v-flex( xs12 md10 lg8 )
    v-card
      v-card-text
        v-layout( row wrap )
          v-flex( xs12 mt-3 )
            h5(class="grey--text text--lighten-4") Kardéx
            
          v-flex( xs12 )
            v-menu( lazy
                    :close-on-content-click="true"
                    v-model="menu3"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
              
              v-text-field( slot="activator"
                            label="Fecha"
                            v-model="Fecha"
                            readonly )
              
              v-date-picker( :months="months"
                             :days="days"
                             first-day-of-week="D"
                             :header-date-format="({ monthName, year }) => { return `${monthName} ${year}` }"
                             v-model="Fecha" 
                             no-title 
                             autosave
                             dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark warning @click.native="Fecha=null" ) Limpiar
                    
            v-select( v-bind:items="ItemsTipoKardex"
                      v-model="TipoKardex"
                      label="Tipo"
                      item-value="text"
                      dark )
            
            v-select( v-bind:items="ItemsEnvase"
                      v-model="Envase"
                      label="Envase"
                      item-text="Numero"
                      item-value="Id"
                      return-object
                      autocomplete
                      v-if="esUnico"
                      dark )
            
            v-select( v-bind:items="ItemsCliente"
                      v-model="Cliente"
                      label="Propietario"
                      item-value="Id"
                      item-text="Nombre"
                      autocomplete
                      return-object
                      :hint="`${Cliente.TipoDocumento || ''}: ${Cliente.NumeroDocumento || ''}`"
                      persistent-hint
                      v-if="esCliente"
                      dark )
            
            v-menu( lazy
                    :close-on-content-click="true"
                    v-model="menu1"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
              
              v-text-field( slot="activator"
                            label="Fecha Inicial"
                            v-model="FechaInicial"
                            readonly )
              
              v-date-picker( :months="months"
                             :days="days"
                             first-day-of-week="D"
                             :header-date-format="({ monthName, year }) => { return `${monthName} ${year}` }"
                             v-model="FechaInicial" 
                             no-title 
                             autosave
                             dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark warning @click.native="FechaInicial=null" ) Limpiar
            
            v-menu( lazy
                    :close-on-content-click="true"
                    v-model="menu2"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
              
              v-text-field( slot="activator"
                            label="Fecha Final"
                            v-model="FechaFinal"
                            readonly )
              
              v-date-picker( :months="months"
                             :days="days"
                             first-day-of-week="D"
                             :header-date-format="({ monthName, year }) => { return `${monthName} ${year}` }"
                             v-model="FechaFinal"
                             no-title
                             autosave
                             dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( primary dark @click.native="cancel()" ) Cancel
            
            
            
      v-card-actions
        v-spacer
        v-btn( dark primary @click.native="generar" ) Generar
        
</template>

<script>

import gql from 'graphql-tag'
import ENTES from '~/queries/Entes.gql'
import ENVASES from '~/queries/Envases.gql'

export default {
  data: () => ({
    snackbar: {
      context: 'secondary',
      mode: '',
      timeout: 6000,
      text: 'Cargando'
    },
    TipoKardex: null,
    Fecha: null,
    FechaInicial: null,
    FechaFinal: null,
    Numero: null,
    esUnico: false,
    esCliente: false,
    ItemsTipoKardex: [{text: 'Todos'}, {text: 'Único'}, {text: 'Por Cliente'}],
    
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
    days: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    
    ItemsCliente: [],
    Cliente: {
      Id: null,
      TipoDocumento: null,
      NumeroDocumento: null,
      Nombre: null,
      Ciudad: null,
      Direccion: null,
      Telefono: null
    },
    ItemsEnvase: [],
    Envase: {
      Id: null,
      Estado: null,
      Propietario: {Nombre: null, NumeroDocumento: null, Id: null},
      EnteId: null,
      Material: null,
      Producto: {Id: null, Nombre: null, UnidadDeMedida: null},
      Capacidad: null,
      Numero: null,
      NumeroInterno: null,
      Presion: null,
      AlturaConValvula: null,
      PesoConValvula: null,
      Valvula: null,
      TipoValvula: null,
      AcabadoColor: null,
      NormaTecnicaFabricacion: null,
      Proveedor: null,
      FechaCompra: null,
      Garantia: null,
      FechaFabricacion: null,
      PruebaHidrostatica: null,
      EquipoAlquilado: null,
      FechaAlquiler: null,
      Observaciones: null
    },
    
    menu1: false,
    menu2: false,
    menu3: false,
    loading: 0
  }),
  apollo: {
    Entes: {
      query: ENTES,
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        if (data.Entes) {
          this.ItemsCliente = data.Entes
        }
      }
    },
    Envases: {
      query: ENVASES,
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        if (data.Envases) {
            this.ItemsEnvase = data.Envases
        }
      }
    }
  },
  beforeMount () {
    if (sessionStorage.getItem('x-access-token') === null || sessionStorage.getItem('x-access-token') === null) {
      this.$router.push('/')
    }
  },
  methods: {
    generar() {
      this.$store.commit('kardex/changeTipo', this.TipoKardex)
      this.$store.commit('kardex/changeFecha', this.Fecha)
      this.$store.commit('kardex/changeCliente', this.Cliente)
      this.$store.commit('kardex/changeEnvase', this.Envase)
      this.$store.commit('kardex/changeFechaInicial', this.FechaInicial)
      this.$store.commit('kardex/changeFechaFinal', this.FechaFinal)
      this.$router.push('/reporte/kardex')
    },
    ResetCliente () {
      this.Cliente = {
        Id: null,
        TipoDocumento: null,
        NumeroDocumento: null,
        Nombre: null,
        Ciudad: null,
        Direccion: null,
        Telefono: null
      }
    },
    ResetEnvase () {
      this.Envase = {
        Id: null,
        Estado: null,
        Propietario: {Nombre: null, NumeroDocumento: null, Id: null},
        EnteId: null,
        Material: null,
        Producto: {Id: null, Nombre: null, UnidadDeMedida: null},
        Capacidad: null,
        Numero: null,
        NumeroInterno: null,
        Presion: null,
        AlturaConValvula: null,
        PesoConValvula: null,
        Valvula: null,
        TipoValvula: null,
        AcabadoColor: null,
        NormaTecnicaFabricacion: null,
        Proveedor: null,
        FechaCompra: null,
        Garantia: null,
        FechaFabricacion: null,
        PruebaHidrostatica: null,
        EquipoAlquilado: null,
        FechaAlquiler: null,
        Observaciones: null
      }
    }
  },
  watch: {
    TipoKardex (value) {
      value === 'Único' ? this.esUnico = true : this.esUnico = false
      value === 'Por Cliente' ? this.esCliente = true : this.esCliente = false
    }
  }
};

</script>

<style lang="stylus" scoped>
  .alert-especial
    position absolute
    
</style>
