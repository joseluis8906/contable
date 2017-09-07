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
  
  v-flex( xs12 md8 lg6 )
    v-card
      v-card-text
        v-layout( row wrap )
          v-flex( xs12 mt-3 )
            h5(class="grey--text text--lighten-4") Envase
            
          v-flex( xs12 )
            
            v-text-field( label="Número" v-model="Numero" dark )
            
            v-select( v-bind:items="ItemsEstado"
                      v-model="Estado"
                      label="Estado"
                      item-value="text"
                      autocomplete
                      dark )
                      
            v-select( v-bind:items="ItemsPropietario"
                      v-model="Propietario"
                      label="Propietario"
                      item-value="Id"
                      item-text="Nombre"
                      autocomplete
                      return-object
                      :hint="`${Propietario.TipoDocumento || ''}: ${Propietario.NumeroDocumento || ''}`"
                      persistent-hint
                      dark )
            
            v-text-field( label="Material" v-model="Material" dark )
            
            v-select( v-bind:items="ItemsProducto"
                      v-model="Producto"
                      label="Clase de Producto"
                      item-value="Id"
                      item-text="Nombre"
                      autocomplete
                      return-object
                      :hint="`Unidad de Medida: ${Producto.UnidadDeMedida || ''}`"
                      persistent-hint
                      dark )
            
            v-text-field( label="Capacidad" v-model="Capacidad" dark )
            
            v-text-field( label="Número Interno" v-model="NumeroInterno" dark )
            
            v-text-field( label="Presión (psi)" v-model="Presion" dark )
            
            v-text-field( label="Altura con Valvula (mts)" v-model="AlturaConValvula" dark )
            
            v-text-field( label="Peso con Valvula (kgr)" v-model="PesoConValvula" dark )
            
            v-select( v-bind:items="ItemsValvula"
                      v-model="Valvula"
                      label="Válvula"
                      item-value="text"
                      autocomplete
                      dark )
            
            v-select( v-bind:items="ItemsTipoValvula"
                      v-model="TipoValvula"
                      label="Tipo de Válvula"
                      item-value="text"
                      autocomplete
                      dark )
                      
            v-text-field( label="Acabado y Color" v-model="AcabadoColor" dark )
            
            v-text-field( label="Norma Técnica de Fabricación" v-model="NormaTecnicaFabricacion" dark )
            
            v-text-field( label="Proveedor" v-model="Proveedor" dark )
            
            v-menu( lazy
                    :close-on-content-click="true"
                    v-model="menu1"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
              
              v-text-field( slot="activator"
                            label="Fecha de Compra"
                            v-model="FechaCompra" 
                            readonly)
              
              v-date-picker( :months="months"
                             :days="days"
                             first-day-of-week="D"
                             :header-date-format="({ monthName, year }) => { return `${monthName} ${year}` }"
                             v-model="FechaCompra"
                             autosave
                             no-title
                             dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark warning @click.native="FechaCompra=null" ) Limpiar
                    
            v-menu( lazy
                    :close-on-content-click="true"
                    v-model="menu2"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
            
              v-text-field( slot="activator"
                            label="Garantía"
                            v-model="Garantia" 
                            readonly)
                            
              v-date-picker( :months="months"
                             :days="days"
                             first-day-of-week="D"
                             :header-date-format="({ monthName, year }) => { return `${monthName} ${year}` }"
                             v-model="Garantia"
                             autosave
                             no-title
                             dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark warning @click.native="Garantia=null" ) Limpiar
            
            v-menu( lazy
                    :close-on-content-click="true"
                    v-model="menu3"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
          
              v-text-field( slot="activator"
                            label="Fecha de Fabricación"
                            v-model="FechaFabricacion"
                            readonly )
              
              v-date-picker( :months="months"
                             :days="days"
                             first-day-of-week="D"
                             :header-date-format="({ monthName, year }) => { return `${monthName} ${year}` }"
                             v-model="FechaFabricacion" 
                             no-title 
                             autosave
                             dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark warning @click.native="FechaFabricacion=null" ) Limpiar
            
            v-menu( lazy
                    :close-on-content-click="true"
                    v-model="menu4"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
          
              v-text-field( slot="activator"
                            label="Prueba Hidrostática"
                            v-model="PruebaHidrostatica"
                            readonly )
              
              v-date-picker( :months="months"
                             :days="days"
                             first-day-of-week="D"
                             :header-date-format="({ monthName, year }) => { return `${monthName} ${year}` }"
                             v-model="PruebaHidrostatica" 
                             no-title 
                             autosave
                             dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark warning @click.native="PruebaHidrostatica=null" ) Limpiar
            
            v-select( v-bind:items="ItemsEquipoAlquilado"
                      v-model="EquipoAlquilado"
                      label="Equipo Alquilado"
                      item-value="text"
                      dark )
            
            v-menu( lazy
                    :close-on-content-click="true"
                    v-model="menu5"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
          
              v-text-field( slot="activator"
                            label="Fecha de Alquiler"
                            v-model="FechaAlquiler"
                            readonly )
              
              v-date-picker( :months="months"
                             :days="days"
                             first-day-of-week="D"
                             :header-date-format="({ monthName, year }) => { return `${monthName} ${year}` }"
                             v-model="FechaAlquiler" 
                             no-title 
                             autosave
                             dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark warning @click.native="FechaAlquiler=null" ) Limpiar
              
            v-text-field( label="Observaciones" v-model="Observaciones" multi-line dark )
            
      v-card-actions
        v-spacer
        v-btn( dark @click.native="Reset" ) Cancelar
        v-btn( dark primary @click.native="CreateOrUpdate" ) Guardar
        
</template>

<script>

import ONE_ENVASE from '~/queries/OneEnvase.gql'
import CREATE_ENVASE from '~/queries/CreateEnvase.gql'
import UPDATE_ENVASE from '~/queries/UpdateEnvase.gql'
import ENTES from '~/queries/Entes.gql'
import ENVASES from '~/queries/Envases.gql'
import PRODUCTOS from '~/queries/Productos.gql'

export default {
  data: () => ({
    snackbar: {
      context: 'secondary',
      mode: '',
      timeout: 6000,
      text: 'Cargando'
    },
    Estado: '',
    Propietario: {Nombre: '', NumeroDocumento: '', Id: -1},
    EnteId: '',
    Material: '',
    Producto: {Id: null, Nombre: null, UnidadDeMedida: null},
    Capacidad: '',
    Numero: '',
    NumeroInterno: '',
    Presion: '',
    AlturaConValvula: '',
    PesoConValvula: '',
    Valvula: '',
    TipoValvula: '',
    AcabadoColor: '',
    NormaTecnicaFabricacion: '',
    Proveedor: '',
    FechaCompra: null,
    Garantia: '',
    FechaFabricacion: null,
    PruebaHidrostatica: null,
    EquipoAlquilado: '',
    FechaAlquiler: null,
    Observaciones: '',
    
    ItemsEstado: [
      {text: 'Nuevo'},
      {text: 'En Uso'},
    ],
    ItemsPropietario: [],
    ItemsProducto: [],
    ItemsValvula: [
      {text: 'Si'},
      {text: 'No'}
    ],
    ItemsTipoValvula: [
      {text: 'CGA540'},
      {text: 'CGA580'},
      {text: 'CGA870'},
      {text: 'CGA320'},
      {text: 'CGA510'},
      {text: 'CGA590'}
    ],
    ItemsEquipoAlquilado: [
      {text: 'Si'},
      {text: 'No'}
    ],
    menu1: false,
    menu2: false,
    menu3: false,
    menu4: false,
    menu5: false,
    
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
    
    loading: 0,
  }),
  apollo: {
    OneEnvase: {
      query: ONE_ENVASE,
      variables () {
        return {
          Numero: this.Numero
        }
      },
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        this.Estado = data.OneEnvase ? data.OneEnvase.Estado : ''
        this.EnteId = data.OneEnvase ? data.OneEnvase.EnteId : ''
        this.Propietario = 
          data.OneEnvase ? data.OneEnvase.Propietario : {Nombre: null, NumeroDocumento: null, Id: null}
        this.Material = data.OneEnvase ? data.OneEnvase.Material : ''
        this.Producto = data.OneEnvase ? data.OneEnvase.Producto ? data.OneEnvase.Producto : {Id: null, Nombre: null, UnidadDeMedida: null} : {Id: null, Nombre: null, UnidadDeMedida: null}
        this.Capacidad = data.OneEnvase ? data.OneEnvase.Capacidad : ''
        this.NumeroInterno = data.OneEnvase ? data.OneEnvase.NumeroInterno : ''
        this.Presion = data.OneEnvase ? data.OneEnvase.Presion : ''
        this.AlturaConValvula = data.OneEnvase ? data.OneEnvase.AlturaConValvula : ''
        this.PesoConValvula = data.OneEnvase ? data.OneEnvase.PesoConValvula : ''
        this.Valvula = data.OneEnvase ? data.OneEnvase.Valvula : ''
        this.TipoValvula = data.OneEnvase ? data.OneEnvase.TipoValvula : ''
        this.AcabadoColor = data.OneEnvase ? data.OneEnvase.AcabadoColor : ''
        this.NormaTecnicaFabricacion = data.OneEnvase ? data.OneEnvase.NormaTecnicaFabricacion : ''
        this.Proveedor = data.OneEnvase ? data.OneEnvase.Proveedor : ''
        this.FechaCompra = data.OneEnvase ? data.OneEnvase.FechaCompra : ''
        this.Garantia = data.OneEnvase ? data.OneEnvase.Garantia : ''
        this.FechaFabricacion = data.OneEnvase ? data.OneEnvase.FechaFabricacion : ''
        this.PruebaHidrostatica = data.OneEnvase ? data.OneEnvase.PruebaHidrostatica : ''
        this.EquipoAlquilado = data.OneEnvase ? data.OneEnvase.EquipoAlquilado : ''
        this.FechaAlquiler = data.OneEnvase ? data.OneEnvase.FechaAlquiler : ''
        this.Observaciones = data.OneEnvase ? data.OneEnvase.Observaciones : ''
        
        this.update = data.OneEnvase ? true : false
      }
    },
    Entes: {
      query: ENTES,
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        this.ItemsPropietario = data.Entes
      }
    },
    Productos: {
      query: PRODUCTOS,
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        this.ItemsProducto = data.Productos
      }
    }
  },
  beforeMount () {
    if (sessionStorage.getItem('x-access-token') === null || sessionStorage.getItem('x-access-token') === null) {
      this.$router.push('/')
    }
  },
  methods: {
    CreateOrUpdate () {
      if (this.update) {
        this.Update();
      }else{
        this.Create();
      }
    },
    Create () {
    
      const Envase = {
        Estado: this.Estado,
        EnteId: this.Propietario.Id,
        Material: this.Material,
        ProductoId: this.Producto.Id,
        Capacidad: this.Capacidad,
        Numero: this.Numero,
        NumeroInterno: this.NumeroInterno,
        Presion: this.Presion,
        AlturaConValvula: this.AlturaConValvula,
        PesoConValvula: this.PesoConValvula,
        Valvula: this.Valvula,
        TipoValvula: this.TipoValvula,
        AcabadoColor: this.AcabadoColor,
        NormaTecnicaFabricacion: this.NormaTecnicaFabricacion,
        Proveedor: this.Proveedor,
        FechaCompra: this.FechaCompra !== '' ? this.FechaCompra : null,
        Garantia: this.Garantia !== '' ? this.Garantia : null,
        FechaFabricacion: this.FechaFabricacion !== '' ? this.FechaFabricacion : null,
        PruebaHidrostatica: this.PruebaHidrostatica !== '' ? this.PruebaHidrostatica : null,
        EquipoAlquilado: this.EquipoAlquilado,
        FechaAlquiler: this.FechaAlquiler !== '' ? this.FechaAlquiler : null,
        Observaciones: this.Observaciones,
        Propietario: this.Propietario
      };
      
      this.Reset ();
      
      this.$apollo.mutate ({
        mutation: CREATE_ENVASE,
        variables: {
          Estado: Envase.Estado,
          EnteId: Envase.EnteId,
          Material: Envase.Material,
          ProductoId: Envase.ProductoId,
          Capacidad: Envase.Capacidad,
          Numero: Envase.Numero,
          NumeroInterno: Envase.NumeroInterno,
          Presion: Envase.Presion,
          AlturaConValvula: Envase.AlturaConValvula,
          PesoConValvula: Envase.PesoConValvula,
          Valvula: Envase.Valvula,
          TipoValvula: Envase.TipoValvula,
          AcabadoColor: Envase.AcabadoColor,
          NormaTecnicaFabricacion: Envase.NormaTecnicaFabricacion,
          Proveedor: Envase.Proveedor,
          FechaCompra: Envase.FechaCompra,
          Garantia: Envase.Garantia,
          FechaFabricacion: Envase.FechaFabricacion,
          PruebaHidrostatica: Envase.PruebaHidrostatica,
          EquipoAlquilado: Envase.EquipoAlquilado,
          FechaAlquiler: Envase.FechaAlquiler,
          Observaciones: Envase.Observaciones,
          Propietario: Envase.Propietario
        },
        loadingKey: 'loading',
        update: (store, { data: res }) => {
          //console.log(Ente);
          var data = {OneEnvase: res.CreateEnvase}
          store.writeQuery({ 
            query: ONE_ENVASE, 
            variables: {
              Numero: Envase.Numero
            },
            data: data
          })
          
          try{
          
            data = store.readQuery({
              query: ENVASES
            })
          
            data.Envases.push(res.CreateEnvase)
          
            store.writeQuery({
              query: ENVASES,
              data: data
            })
            
          } catch (Err) {
            
            data = {Envases: []}
            
            data.Envases.push(res.CreateEnvase)
          
            store.writeQuery({
              query: ENVASES,
              data: data
            })
            
          }
        }
      }).then( data => {        
        //console.log(data)
      }).catch( Err => {
        //console.log(Err)
      })
    },
    Update () {
    
      const Envase = {
        Estado: this.Estado,
        EnteId: this.Propietario.Id,
        Material: this.Material,
        ProductoId: this.Producto.Id,
        Capacidad: this.Capacidad,
        Numero: this.Numero,
        NumeroInterno: this.NumeroInterno,
        Presion: this.Presion,
        AlturaConValvula: this.AlturaConValvula,
        PesoConValvula: this.PesoConValvula,
        Valvula: this.Valvula,
        TipoValvula: this.TipoValvula,
        AcabadoColor: this.AcabadoColor,
        NormaTecnicaFabricacion: this.NormaTecnicaFabricacion,
        Proveedor: this.Proveedor,
        FechaCompra: this.FechaCompra !== '' ? this.FechaCompra : null,
        Garantia: this.Garantia !== '' ? this.Garantia : null,
        FechaFabricacion: this.FechaFabricacion !== '' ? this.FechaFabricacion : null,
        PruebaHidrostatica: this.PruebaHidrostatica !== '' ? this.PruebaHidrostatica : null,
        EquipoAlquilado: this.EquipoAlquilado,
        FechaAlquiler: this.FechaAlquiler !== '' ? this.FechaAlquiler : null,
        Observaciones: this.Observaciones,
        Propietario: this.Propietario
      };
      
      this.Reset ();
      
      this.$apollo.mutate ({
        mutation: UPDATE_ENVASE,
        variables: {
          Estado: Envase.Estado,
          EnteId: Envase.EnteId,
          Material: Envase.Material,
          ProductoId: Envase.ProductoId,
          Capacidad: Envase.Capacidad,
          Numero: Envase.Numero,
          NumeroInterno: Envase.NumeroInterno,
          Presion: Envase.Presion,
          AlturaConValvula: Envase.AlturaConValvula,
          PesoConValvula: Envase.PesoConValvula,
          Valvula: Envase.Valvula,
          TipoValvula: Envase.TipoValvula,
          AcabadoColor: Envase.AcabadoColor,
          NormaTecnicaFabricacion: Envase.NormaTecnicaFabricacion,
          Proveedor: Envase.Proveedor,
          FechaCompra: Envase.FechaCompra,
          Garantia: Envase.Garantia,
          FechaFabricacion: Envase.FechaFabricacion,
          PruebaHidrostatica: Envase.PruebaHidrostatica,
          EquipoAlquilado: Envase.EquipoAlquilado,
          FechaAlquiler: Envase.FechaAlquiler,
          Observaciones: Envase.Observaciones,
          Propietario: Envase.Propietario
        },
        loadingKey: 'loading',
        update: (store, { data: res }) => {
          //console.log(res);
          var data = {OneEnvase: res.UpdateEnvase}
          store.writeQuery({ 
            query: ONE_ENVASE, 
            variables: {
              Numero: Envase.Numero
            },
            data: data
          })
          
          try {
          
            data = store.readQuery({
              query: ENVASES
            })
            
            for (let i=0; i<data.Envases.length; i++) {
              if (data.Envases[i].Id === res.UpdateEnvase.Id) {
                data.Envases[i].Estado = res.UpdateEnvase.Estado
                data.Envases[i].EnteId = res.UpdateEnvase.EnteId
                data.Envases[i].Material = res.UpdateEnvase.Material
                data.Envases[i].ProductoId = res.UpdateEnvase.ProductoId
                data.Envases[i].Capacidad = res.UpdateEnvase.Capacidad
                data.Envases[i].Numero = res.UpdateEnvase.Numero
                data.Envases[i].NumeroInterno = res.UpdateEnvase.NumeroInterno
                data.Envases[i].Presion = res.UpdateEnvase.Presion
                data.Envases[i].AlturaConValvula = res.UpdateEnvase.AlturaConValvula
                data.Envases[i].PesoConValvula = res.UpdateEnvase.PesoConValvula
                data.Envases[i].Valvula = res.UpdateEnvase.Valvula
                data.Envases[i].TipoValvula = res.UpdateEnvase.TipoValvula
                data.Envases[i].AcabadoColor = res.UpdateEnvase.AcabadoColor
                data.Envases[i].NormaTecnicaFabricacion = res.UpdateEnvase.NormaTecnicaFabricacion
                data.Envases[i].Proveedor = res.UpdateEnvase.Proveedor
                data.Envases[i].FechaCompra = res.UpdateEnvase.FechaCompra
                data.Envases[i].Garantia = res.UpdateEnvase.Garantia
                data.Envases[i].FechaFabricacion = res.UpdateEnvase.FechaFabricacion
                data.Envases[i].PruebaHidrostatica = res.UpdateEnvase.PruebaHidrostatica
                data.Envases[i].EquipoAlquilado = res.UpdateEnvase.EquipoAlquilado
                data.Envases[i].FechaAlquiler = res.UpdateEnvase.FechaAlquiler
                data.Envases[i].Observaciones = res.UpdateEnvase.Observaciones
                data.Envases[i].Propietario = res.UpdateEnvase.Propietario
              }
            }
            
            store.writeQuery({
              query: ENVASES,
              data: data
            })
            
          } catch (Err) {
            
            data = {Envases: []}
            
            data.Envases.push(res.UpdateEnvase)
          
            store.writeQuery({
              query: ENVASES,
              data: data
            })
            
          }
          
        }
      }).then( data => {        
        //console.log(data)
      }).catch( Err => {
        //console.log(Err)
      })
    },
    Reset () {
      this.Estado = '';
      this.Propietario = {Nombre: '', NumeroDocumento: '', Id: -1};
      this.EnteId = '';
      this.Material = '';
      this.Producto = {Id: null, Nombre: null, UnidadDeMedida: null};
      this.Capacidad = '';
      this.Numero = '';
      this.NumeroInterno = '';
      this.Presion = '';
      this.AlturaConValvula = '';
      this.PesoConValvula = '';
      this.Valvula = '';
      this.TipoValvula = '';
      this.AcabadoColor = '';
      this.NormaTecnicaFabricacion = '';
      this.Proveedor = '';
      this.FechaCompra = '';
      this.Garantia = '';
      this.FechaFabricacion = '';
      this.PruebaHidrostatica = '';
      this.EquipoAlquilado = '';
      this.FechaAlquiler = '';
      this.Observaciones = '';
    },
    ResetPropietario () {
      this.Propietario = {Nombre: null, NumeroDocumento: null, Id: null}
    },
    ResetProducto () {
      this.Producto = {Nombre: null, UnidadDeMedida: null, Id: null}
    }
  }
};

</script>

<style lang="stylus" scoped>
.alert-especial
  position absolute

.application--dark .btn.btn--icon
  color red
</style>
