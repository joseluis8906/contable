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
            h5(class="grey--text text--lighten-4") Producción
            
          v-flex( xs12 )
            
            v-text-field( label="Orden Nº" v-model="Orden" dark )
            
            v-menu( lazy
                    :close-on-content-click="true"
                    v-model="menu5"
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
                           dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark warning @click.native="Fecha=null" ) Limpiar
            
            v-text-field( label="Turno" v-model="Turno" dark )
            
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
                             dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark warning @click.native="Fecha=null" ) Limpiar
            
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
                             dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark warning @click.native="Fecha=null" ) Limpiar
            
            v-menu( lazy
                    :close-on-content-click="false"
                    v-model="menu3"
                    transition="scale-transition"
                    offset-y
                    :nudge-left="40" )
                    
              v-text-field( slot="activator"
                            label="Hora Inicial"
                            v-model="HoraInicial"
                            readonly )
          
              v-time-picker(v-model="HoraInicial" autosave)
              
            v-menu( lazy
                    :close-on-content-click="false"
                    v-model="menu4"
                    transition="scale-transition"
                    offset-y
                    :nudge-left="40" )
                    
              v-text-field( slot="activator"
                            label="Hora Final"
                            v-model="HoraFinal"
                            readonly )
          
              v-time-picker(v-model="HoraFinal" autosave)
            
            
            v-text-field( label="Lote" v-model="Lote" dark readonly )
            
            v-select( v-bind:items="ItemsProducto"
                      v-model="Producto"
                      label="Producto"
                      item-text="Nombre"
                      item-value="Id"
                      return-object
                      autocomplete
                      :disabled="!ChangeProducto"
                      dark )
            
            v-menu( lazy
                    :close-on-content-click="true"
                    v-model="menu6"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
          
              v-text-field( slot="activator"
                            label="Fecha de Fabricacion"
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
                    v-model="menu7"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
          
              v-text-field( slot="activator"
                            label="Fecha de Vencimiento"
                            v-model="FechaVencimiento"
                            readonly )
              
              v-date-picker( :months="months"
                             :days="days"
                             first-day-of-week="D"
                             :header-date-format="({ monthName, year }) => { return `${monthName} ${year}` }"
                             v-model="FechaVencimiento" 
                             no-title 
                             autosave
                             dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark warning @click.native="FechaVencimiento=null" ) Limpiar
            
            v-text-field( label="Pureza Final (%)" v-model="PurezaFinal" dark )
            
            v-text-field( label="Presion Final (psi)" v-model="PresionFinal" dark )
            
            v-text-field( label="Observacion" v-model="Observacion" multi-line dark )
            
            v-data-table( v-bind:headers="headers"
                          v-bind:items="items"
                          class="elevation-5 grey lighten-1 grey--text text--darken-4" )
              
              template(slot="items" scope="props")
                td( class="text-xs-center subheading" ) {{ props.item.Envase.UnidadDeMedida }}
                td( class="text-xs-center subheading" 
                    style="border-left: 1px solid #999999" ) {{ props.item.Envase.Capacidad }}
                td( style="border-left: 1px solid #999999" )
                   v-select( v-bind:items="ItemsFilteredEnvase"
                             v-model="props.item.Envase"
                             item-text="Numero"
                             item-value="Id"
                             return-object
                             autocomplete
                             :disabled="props.item.EnvaseDisable"
                             light
                             class="input-tab mb-0 mt-0 pb-0"
                             style="width: 96px; font-size: 90%" )
                td( style="border-left: 1px solid #999999" )
                    v-text-field( v-model="props.item.Cantidad"
                                  light 
                                  @keyup.native="controlCantidad(props.item)"
                                  style="width: 48px; height:31px; text-align-last: center" 
                                  class="pt-0 pb-0 mt-0 mb-0 " )
                td( style="border-left: 1px solid #999999" class="pt-0 pb-0")
                  v-select( v-bind:items="ItemsCliente"
                      v-model="props.item.Cliente"
                      item-value="Id"
                      item-text="Nombre"
                      autocomplete
                      return-object
                      :disabled="props.item.ClienteDisable"
                      light
                      class="input-tab mb-0 mt-0 pb-0"
                      style="width: 148px" )
                td(style="width: 64px; border-left: 1px solid #999999" class="pl-1 pr-1")
                  v-btn( fab
                         dark
                         small
                         success
                         style="width: 16px; height:16px"
                         @click.native="guardar(props.item)")
                    v-icon(dark) {{ props.item.SaveUpdate }}
                    
                  v-btn( fab
                         dark
                         small
                         error
                         style="width: 16px; height:16px"
                         @click.native="eliminar(props.item)"
                         :disabled="props.item.EliminarDisable")
                    v-icon remove
                    
            v-btn(fab dark class="indigo" @click.native="agregar")
              v-icon(dark) add
      v-card-actions
        v-spacer
        v-btn( dark primary @click.native="generar" class="mt-0" ) Imprimir
        v-btn( dark warning @click.native="hardReset" ) Limpiar
</template>

<script>

import ENVASES from '~/queries/Envases.gql'
import PRODUCCIONS from '~/queries/Produccions.gql'
import CREATE_PRODUCCION from '~/queries/CreateProduccion.gql'
import UPDATE_ONE_PRODUCCION from '~/queries/UpdateOneProduccion.gql'
import DELETE_PRODUCCION from '~/queries/DeleteProduccion.gql'
import PRODUCTOS from '~/queries/Productos.gql'
import ENTES from '~/queries/Entes.gql'

export default {
  data: () => ({
    snackbar: {
      context: 'secondary',
      mode: '',
      timeout: 6000,
      text: 'Cargando'
    },
    Orden: null,
    Turno: null,
    Fecha: null,
    Lote: '01',
    FechaInicial: null,
    FechaFinal: null,
    HoraInicial: null,
    HoraFinal: null,
    FechaFabricacion: null,
    FechaVencimiento: null,
    Producto: {Id: null, Nombre: null},
    PurezaFinal: null,
    PresionFinal: null,
    Observacion: null,
    saveUpdate: 'save',
    ChangeProducto: true,
    ChangeProductoCounter: 0,
    headers: [
      { text: 'U. de Medida', align: 'center', sortable: false,  value: 'U. de Medida' },
      { text: 'Capacidad', align: 'center', sortable: false,  value: 'Capacidad' },
      { text: 'Envase', align: 'left', sortable: true,  value: 'Numero' },
      { text: 'Cantidad', align: 'center', sortable: false,  value: 'Cantidad' },
      { text: 'Cliente', align: 'center', sortable: false,  value: 'Cliente' },
      { text: 'Acción', align: 'center', sortable: false,  value: 'Acción' }
    ],
    items: [],
    pagination: {
      sortBy: 'Numero'
    },
    ItemsProducto: [], 
    ItemsAllEnvase: [],
    ItemsFilteredEnvase: [],
    ItemsCliente: [],
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
    
    menu1: false,
    menu2: false,
    menu3: false,
    menu4: false,
    menu5: false,
    menu6: false,
    menu7: false,
    loading: 0
  }),
  apollo: {
    Envases: {
      query: ENVASES,
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        if (data.Envases) {
          this.ItemsAllEnvase = []
          for (let i=0; i<data.Envases.length; i++) {
            var tmp = {}
            tmp.Id = data.Envases[i].Id
            tmp.Numero = data.Envases[i].Numero
            tmp.Capacidad = data.Envases[i].Capacidad
            tmp.UnidadDeMedida = data.Envases[i].Producto.UnidadDeMedida
            tmp.ProductoId = data.Envases[i].Producto.Id
            this.ItemsAllEnvase.push(tmp)
          }
        }
      }
    },
    Produccions: {
      query: PRODUCCIONS,
      variables () {
        return {
          Orden: this.Orden !== null ? this.Orden : '',
        }
      },
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        if (data.Produccions.length > 0) {
          this.Turno = data.Produccions[0].Turno
          this.Fecha = data.Produccions[0].Fecha
          this.Lote = data.Produccions[0].Lote
          this.FechaInicial = data.Produccions[0].FechaInicial
          this.FechaFinal = data.Produccions[0].FechaFinal
          this.HoraInicial = data.Produccions[0].HoraInicial
          this.HoraFinal = data.Produccions[0].HoraFinal
          this.FechaFabricacion = data.Produccions[0].FechaFabricacion
          this.FechaVencimiento = data.Produccions[0].FechaVencimiento
          this.Producto = data.Produccions[0].Producto
          this.PurezaFinal = data.Produccions[0].PurezaFinal
          this.PresionFinal = data.Produccions[0].PresionFinal
          this.Observacion = data.Produccions[0].Observacion
          this.items = []
          for ( let i=0; i<data.Produccions.length; i++ ) {
            var tmp = {
              Id: data.Produccions[i].Id,
              Envase: {
                Id: data.Produccions[i].Envase.Id,
                Numero: data.Produccions[i].Envase.Numero,
                Capacidad: data.Produccions[i].Envase.Capacidad,
                UnidadDeMedida: data.Produccions[i].Producto.UnidadDeMedida
              },
              Cliente: {
                Id: data.Produccions[i].Cliente.Id,
                Nombre: data.Produccions[i].Cliente.Nombre
              },
              Cantidad: data.Produccions[i].Cantidad,
              SaveUpdate: 'update',
              ClienteDisable: true,
              EnvaseDisable: true,
              EliminarDisable: data.Produccions[i].Despachado === 'Si' ? true : false,
              Despachado: data.Produccions[i].Despachado
            }
            this.items.push(tmp)
          }
          
        } else {
          this.reset ()
        }
      }
    },
    Productos: {
      query: PRODUCTOS,
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        this.ItemsProducto = data.Productos
      }
    },
    Entes: {
      query: ENTES,
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        this.ItemsCliente = data.Entes
      }
    }
  },
  watch: {
    Producto: {
      handler: function () {
        this.filtrarEnvases ()
      },
      deep: true
    }
  },
  
  methods: {
    agregar () {
      var tmp = {
        Id: null,
        Envase: {
          Id: null,
          Numero: null,
          Capacidad: null,
          UnidadDeMedida: null
        },
        Cliente: {
          Id: null,
          Nombre: null
        },
        Cantidad: null,
        SaveUpdate: 'save'
      }
      
      this.items.push(tmp)
    },
    guardar (item) {
      //console.log(item)
      if ( item.Envase.Id !== null && item.Envase.Cantidad !== null && item.Envase.Cantidad !== '' && item.Cliente.Id !== null ) {
        
        if ( item.Id === null ) {
          
          item.SaveUpdate = 'update'
          item.EnvaseDisable = true
          item.ClienteDisable = true
          
          const Produccion = {
            Orden: this.Orden,
            Turno: this.Turno,
            Fecha: this.Fecha,
            Lote: this.Lote,
            FechaInicial: this.FechaInicial,
            FechaFinal: this.FechaFinal,
            HoraInicial: this.HoraInicial,
            HoraFinal: this.HoraFinal,
            FechaFabricacion: this.FechaFabricacion,
            FechaVencimiento: this.FechaVencimiento,
            Cantidad: item.Cantidad,
            ProductoId: this.Producto.Id,
            EnvaseId: item.Envase.Id,
            ClienteId: item.Cliente.Id,
            PurezaFinal: this.PurezaFinal,
            PresionFinal: this.PresionFinal,
            Observacion: this.Observacion,
            Despachado: 'No'
          }
          
          this.$apollo.mutate ({
            mutation: CREATE_PRODUCCION,
            variables: {
              Orden: Produccion.Orden,
              Turno: Produccion.Turno,
              Fecha: Produccion.Fecha,
              Lote: Produccion.Lote,
              FechaInicial: Produccion.FechaInicial,
              FechaFinal: Produccion.FechaFinal,
              HoraInicial: Produccion.HoraInicial,
              HoraFinal: Produccion.HoraFinal,
              FechaFabricacion: Produccion.FechaFabricacion,
              FechaVencimiento: Produccion.FechaVencimiento,
              Cantidad: Produccion.Cantidad,
              ProductoId: Produccion.ProductoId,
              EnvaseId: Produccion.EnvaseId,
              ClienteId: Produccion.ClienteId,
              PurezaFinal: Produccion.PurezaFinal,
              PresionFinal: Produccion.PresionFinal,
              Observacion: Produccion.Observacion,
              Despachado: Produccion.Despachado
            },
            loadingKey: 'loading',
            update (store, {data: res}) {
              //console.log ('guardar')
              //console.log ({store: store, res: res})
              
              try{
                const data = store.readQuery({
                  query: PRODUCCIONS,
                  variables: {
                    Orden: Produccion.Orden,
                  }
                })
                
                data.Produccions.push(res.CreateProduccion)
                
                store.writeQuery({
                  query: PRODUCCIONS,
                  variables: {
                    Orden: Produccion.Orden,
                  },
                  data
                })
                
              } catch (Err) {
                
                data = {Produccions: []}
                
                data.Produccions.push(res.CreateProduccion)
                
                store.writeQuery({
                  query: PRODUCCIONS,
                  data: data
                })
                
              }
              
            }
          })
          
        } else {
        
          const Produccion = {
            Id: item.Id,
            Orden: this.Orden,
            Turno: this.Turno,
            Fecha: this.Fecha,
            Lote: this.Lote,
            FechaInicial: this.FechaInicial,
            FechaFinal: this.FechaFinal,
            HoraInicial: this.HoraInicial,
            HoraFinal: this.HoraFinal,
            FechaFabricacion: this.FechaFabricacion,
            FechaVencimiento: this.FechaVencimiento,
            Cantidad: item.Cantidad,
            ProductoId: this.Producto.Id,
            EnvaseId: item.Envase.Id,
            ClienteId: item.Cliente.Id,
            PurezaFinal: this.PurezaFinal,
            PresionFinal: this.PresionFinal,
            Observacion: this.Observacion,
            Despachado: item.Despachado
          }
          
          this.$apollo.mutate ({
            mutation: UPDATE_ONE_PRODUCCION,
            variables: {
              Id: Produccion.Id,
              Orden: Produccion.Orden,
              Turno: Produccion.Turno,
              Fecha: Produccion.Fecha,
              Lote: Produccion.Lote,
              FechaInicial: Produccion.FechaInicial,
              FechaFinal: Produccion.FechaFinal,
              HoraInicial: Produccion.HoraInicial,
              HoraFinal: Produccion.HoraFinal,
              FechaFabricacion: Produccion.FechaFabricacion,
              FechaVencimiento: Produccion.FechaVencimiento,
              Cantidad: Produccion.Cantidad,
              ProductoId: Produccion.ProductoId,
              EnvaseId: Produccion.EnvaseId,
              ClienteId: Produccion.ClienteId,
              PurezaFinal: Produccion.PurezaFinal,
              PresionFinal: Produccion.PresionFinal,
              Observacion: Produccion.Observacion
            },
            loadingKey: 'loading',
            update (store, {data: res}) {
              //console.log('actualizar')
              //console.log ({store: store, res: res})
              
              try{
                const data = store.readQuery({
                  query: PRODUCCIONS,
                  variables: {
                    Orden: Produccion.Orden,
                  }
                })
                
                for (let i=0; i<data.Produccions.length; i++) {
                  if (data.Produccions[i].Id === res.UpdateOneProduccion.Id) {
                    data.Produccions[i].Orden = res.UpdateOneProduccion.Orden
                    data.Produccions[i].Turno = res.UpdateOneProduccion.Turno
                    data.Produccions[i].Fecha = res.UpdateOneProduccion.Fecha
                    data.Produccions[i].Lote = res.UpdateOneProduccion.Lote
                    data.Produccions[i].FechaInicial = res.UpdateOneProduccion.FechaInicial
                    data.Produccions[i].FechaFinal = res.UpdateOneProduccion.FechaFinal
                    data.Produccions[i].HoraInicial = res.UpdateOneProduccion.HoraInicial
                    data.Produccions[i].HoraFinal = res.UpdateOneProduccion.HoraFinal
                    data.Produccions[i].FechaFabricacion = res.UpdateOneProduccion.FechaFabricacion
                    data.Produccions[i].FechaVencimiento = res.UpdateOneProduccion.FechaVencimiento
                    data.Produccions[i].Cantidad = res.UpdateOneProduccion.Cantidad
                    data.Produccions[i].ProductoId = res.UpdateOneProduccion.ProductoId
                    data.Produccions[i].EnvaseId = res.UpdateOneProduccion.EnvaseId
                    data.Produccions[i].ClienteId = res.UpdateOneProduccion.ClienteId
                    data.Produccions[i].PurezaFinal = res.UpdateOneProduccion.PurezaFinal
                    data.Produccions[i].PresionFinal = res.UpdateOneProduccion.PresionFinal
                    data.Produccions[i].Observacion = res.UpdateOneProduccion.Observacion
                    data.Produccions[i].Despachado = res.Despachado
                  }
                }
                
                store.writeQuery({
                  query: PRODUCCIONS,
                  variables: {
                    Orden: Produccion.Orden,
                  },
                  data
                })
                
              } catch (Err) {
                
                data = {Produccions: []}
                
                data.Produccions.push(res.UpdateOneProduccion)
                
                store.writeQuery({
                  query: PRODUCCIONS,
                  data: data
                })
                
              }
              
            }
            
          })
          
        }
      
      }
    },
    controlCantidad (item) {
      if (Number(item.Cantidad) >= item.Envase.Capacidad) {
        item.Cantidad = item.Envase.Capacidad
      }
    },
    eliminar (item) {
      
      if ( item.Id === null ) { 
        
        for (let i=0; i<this.items.length; i++) {
          if ( item.Envase.Id === this.items[i].Envase.Id ) {
            this.items.splice(i,1)
          }
        }
        
      } else {
        
        for (let i=0; i<this.items.length; i++) {
          if ( item.Id === this.items[i].Id ) {
            this.items.splice(i,1)
          }
        }
        
        const Produccion = {
          Id: item.Id,
          Orden: this.Orden,
          Turno: this.Turno,
          Fecha: this.Fecha,
          Lote: this.Lote,
          FechaInicial: this.FechaInicial,
          FechaFinal: this.FechaFinal,
          HoraInicial: this.HoraInicial,
          HoraFinal: this.HoraFinal,
          FechaFabricacion: this.FechaFabricacion,
          FechaVencimiento: this.FechaVencimiento,
          Cantidad: item.Cantidad,
          ProductoId: this.Producto.Id,
          EnvaseId: item.Envase.Id,
          ClienteId: item.Cliente.Id,
          PurezaFinal: this.PurezaFinal,
          PresionFinal: this.PresionFinal,
          Observacion: this.Observacion
        }
        
        this.$apollo.mutate ({
          mutation: DELETE_PRODUCCION,
          variables: {
            Id: Produccion.Id,
            Orden: Produccion.Orden,
            Turno: Produccion.Turno,
            Fecha: Produccion.Fecha,
            Lote: Produccion.Lote,
            FechaInicial: Produccion.FechaInicial,
            FechaFinal: Produccion.FechaFinal,
            HoraInicial: Produccion.HoraInicial,
            HoraFinal: Produccion.HoraFinal,
            FechaFabricacion: Produccion.FechaFabricacion,
            FechaVencimiento: Produccion.FechaVencimiento,
            Cantidad: Produccion.Cantidad,
            ProductoId: Produccion.ProductoId,
            EnvaseId: Produccion.EnvaseId,
            PurezaFinal: Produccion.PurezaFinal,
            PresionFinal: Produccion.PresionFinal,
            Observacion: Produccion.Observacion
          },
           loadingKey: 'loading',
           update (store, {data: res}) {
             //console.log ({store: store, res: res})
             
             try{
               const data = store.readQuery({
                 query: PRODUCCIONS,
                 variables: {
                   Orden: Produccion.Orden
                 }
               })
               
               for (let i=0; i<data.Produccions.length; i++) {
                 if (data.Produccions[i].Id === res.DeleteProduccion.Id) {
                   data.Produccions.splice(i, 1)
                 }
               }
               
               store.writeQuery({
                 query: PRODUCCIONS,
                 variables: {
                   Orden: Produccion.Orden
                 },
                 data
               })
               
             } catch (Err) {
               //console.log("`Error controlado: ${Err}`")
             }
             
           }
         })
        
      }
      
     },
    reset () {
      
      this.ChangeProducto=true
      this.Fecha = null,
      this.Turno = null,
      this.Lote = '01',
      this.FechaInicial = null,
      this.FechaFinal = null,
      this.HoraInicial = null,
      this.HoraFinal = null,
      this.FechaFabricacion = null,
      this.FechaVencimiento = null,
      this.Producto = {Id: null, Nombre: null},
      this.PurezaFinal = null,
      this.PresionFinal = null,
      this.Observacion = null,
      
      this.ItemsEnvase = []
      this.items = []
      this.ChangeProductoCounter=0
    },
    hardReset () {
      this.Orden = null
      this.reset ()
    },
    filtrarEnvases () {
      this.ChangeProductoCounter++
      if( this.ChangeProductoCounter === 2 ) {
        this.ChangeProducto=false
        this.ItemsFilteredEnvase = []
        for (let i=0; i<this.ItemsAllEnvase.length; i++) {
          if ( this.Producto.Id === this.ItemsAllEnvase[i].ProductoId ) {
            this.ItemsFilteredEnvase.push(this.ItemsAllEnvase[i])
          }
        }
      }
    },
    generar() {
      this.$store.commit('produccion/changeOrden', this.Orden)
      this.$router.push('/reporte/produccion')
    },
  }
};

</script>

<style lang="stylus" scoped>

.alert-especial
  position absolute
  
.input-group--select
  height: 31px

.application .theme--dark.btn:disabled:not(.btn--icon):not(.btn--flat)
  background-color rgba(25,25,25, 1) !important
</style>
