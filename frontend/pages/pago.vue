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

  v-flex( xs12 mt-3 md8 lg6 )
    v-card
      v-layout(row wrap pt-3 light-blue)
        v-flex( xs12 )
          h5(class="grey--text text--lighten-4 text-xs-center bold")
            v-icon(ma) assignment
            | Pago
      v-card-text
        v-layout( row wrap)
          v-flex( xs12 )
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

            v-select( v-bind:items="ItemsTercero"
                      v-model="Tercero"
                      label="Tercero"
                      item-value="text"
                      dark )

            v-data-table(v-bind:headers="headers"
                        :items="ItemsCausacion"
                        hide-actions
                        class="elevation-5 grey lighten-1 grey--text text--darken-4" )

              template(slot="headers" scope="props")
                th(v-for="header in props.headers" :key="header"
                  class="text-xs-center") {{ header.text }}

              template(slot="items" scope="props")
                td(class="text-xs-center" :style="{minWidth: ''+(props.item.Codigo.length*10)+'px'}") {{ props.item.Codigo }}
                td(class="text-xs-center" :style="{minWidth: ''+(props.item.Nombre.length*10)+'px'}") {{ props.item.Nombre }}
                td(class="text-xs-center" :style="{minWidth: ''+(props.item.Monto.length*10)+'px'}") {{ props.item.Monto | currency('$', 0) }}
                td(class="text-xs-center" :style="{minWidth: ''+(props.item.Monto.length*10)+'px'}")
                  v-btn( fab
                         dark
                         small
                         success
                         style="width: 16px; height:16px"
                         @click.native="eliminar(props.item)")
                    v-icon(dark) check

      v-card-actions
        v-spacer
        v-btn( dark warning @click.native="Reset" ) Limpiar
</template>

<script>

import TERCEROS from '~/queries/Terceros.gql'
import CREATE_TERCERO from '~/queries/CreateTercero.gql'
import UPDATE_TERCERO from '~/queries/UpdateTercero.gql'

import VMoney from '~/components/MonetaryInput.vue'

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
    days: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    ItemsTercero: [],
    Fecha: null,
    Tercero: null,
    headers: [
      {text: 'Código', value: 'Codigo'},
      {text: 'Nombre', value: 'Nombre'},
      {text: 'Monto', value: 'Monto'},
      {text: 'Pagar', value: 'Pagar'},
    ],
    ItemsCausacion: [
      {Codigo: '1110', Nombre: 'Banco', Monto: 200000}
    ],
    ItemsCuentas: [
      {Codigo: '1110', Nombre: 'Banco'}
    ],
    Cuenta: null,
    Monto: null,
    Id: null,
    TipoDeIdentificacion: null,
    NumeroDeIdentificacion: null,
    DigitoDeVerificacion: null,
    PrimerApellido: null,
    SegundoApellido: null,
    PrimerNombre: null,
    OtrosNombres: null,
    RazonSocial: null,
    Direccion: null,
    CodigoDepartamento: null,
    CodigoMunicipio: null,
    PaisDeResidencia: null,
    Cliente: null,
    Proveedor: null,
    Empleado: null,
    ItemsDeIdentificacion: [
      {text: 'Cédula de ciudadanía', value: '13'},
      {text: 'Tarjeta de extranjería', value: '21'},
      {text: 'Cédula de extranjería', value: '22'},
      {text: 'Nit', value: '31'},
      {text: 'Identificación de extranjeros diferente al Nit asignado DIAN', value: '33'},
      {text: 'Pasaporte', value: '41'},
      {text: 'Documento de identificación extranjero', value: '42'},
      {text: 'Sin identificación del exterior o para uso definido por la DIAN', value: '43'},
    ],
    ItemsDepartamento: [
      {nombre: 'Cesar', codigo: '20'},
    ],
    ItemsMunicipio: [
      {codigo: '20011', nombre: 'Aguachica'},
      {codigo: '20295', nombre: 'Gamarra'}
    ],
    ItemsPais: [
      {codigo: '169', nombre: 'Colombia'},
    ],
    loading: 0
  }),
  beforeMount () {
    if (sessionStorage.getItem('x-access-token') === null || sessionStorage.getItem('x-access-token') === null) {
      this.$router.push('/')
    }
  },
  apollo: {
    Terceros: {
      query: TERCEROS,
      variables () {
        return {
          TipoDeIdentificacion: this.TipoDeIdentificacion,
          NumeroDeIdentificacion: this.NumeroDeIdentificacion,
          DigitoDeVerificacion: this.DigitoDeVerificacion
        }
      },
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        this.LoadTercero(data.Terceros)
      }
    },
  },
  methods: {
    CreateOrUpdate () {
      if (this.Id === null) {
        this.Create();
      }else{
        this.Update();
      }
    },
    Create () {
      const Tercero = {
        TipoDeIdentificacion: this.TipoDeIdentificacion,
        NumeroDeIdentificacion: this.NumeroDeIdentificacion,
        DigitoDeVerificacion: this.DigitoDeVerificacion,
        PrimerApellido: this.PrimerApellido,
        SegundoApellido: this.SegundoApellido,
        PrimerNombre: this.PrimerNombre,
        OtrosNombres: this.OtrosNombres,
        RazonSocial: this.RazonSocial,
        Direccion: this.Direccion,
        CodigoDepartamento: this.CodigoDepartamento,
        CodigoMunicipio: this.CodigoMunicipio,
        PaisDeResidencia: this.PaisDeResidencia
      };

      this.Reset ();

      this.$apollo.mutate ({
        mutation: CREATE_TERCERO,
        variables: {
          TipoDeIdentificacion: Tercero.TipoDeIdentificacion,
          NumeroDeIdentificacion: Tercero.NumeroDeIdentificacion,
          DigitoDeVerificacion: Tercero.DigitoDeVerificacion,
          PrimerApellido: Tercero.PrimerApellido,
          SegundoApellido: Tercero.SegundoApellido,
          PrimerNombre: Tercero.PrimerNombre,
          OtrosNombres: Tercero.OtrosNombres,
          RazonSocial: Tercero.RazonSocial,
          Direccion: Tercero.Direccion,
          CodigoDepartamento: Tercero.CodigoDepartamento,
          CodigoMunicipio: Tercero.CodigoMunicipio,
          PaisDeResidencia: Tercero.PaisDeResidencia
      },
      loadingKey: 'loading',
      update: (store, { data: res }) => {
        //console.log(Ente);
        try{
          var data = store.readQuery({
            query: TERCEROS,
            variables: {
              TipoDeIdentificacion: res.CreteTercero.TipoDeIdentificacion,
              NumeroDeIdentificacion: res.CreateTercero.NumeroDeIdentificacion,
              DigitoDeVerificacion: res.CreateTercero.DigitoDeVerificacion
            }
          })

          console.log(data)
          data.Terceros.push(res.CreateTercero)

          store.writeQuery({
            query: TERCEROS,
            variables: {
              TipoDeIdentificacion: res.CreateTercero.TipoDeIdentificacion,
              NumeroDeIdentificacion: res.CreateTercero.NumeroDeIdentificacion,
              DigitoDeVerificacion: res.CreateTercero.DigitoDeVerificacion
            },
            data: data
          })

        } catch (Err) {

          var data = {Terceros: []}

          data.Terceros.push(res.CreateTercero)

          store.writeQuery({
            query: TERCEROS,
            variables: {
              TipoDeIdentificacion: res.CreateTercero.TipoDeIdentificacion,
              NumeroDeIdentificacion: res.CreateTercero.NumeroDeIdentificacion,
              DigitoDeVerificacion: res.CreateTercero.DigitoDeVerificacion
            },
            data: data
          })

        }

      },
      }).then( data => {
        //console.log(data)
      }).catch( Err => {
        //console.log(Err)
      })
    },
    Update () {
      const Tercero = {
        Id: this.Id,
        TipoDeIdentificacion: this.TipoDeIdentificacion,
        NumeroDeIdentificacion: this.NumeroDeIdentificacion,
        DigitoDeVerificacion: this.DigitoDeVerificacion,
        PrimerApellido: this.PrimerApellido,
        SegundoApellido: this.SegundoApellido,
        PrimerNombre: this.PrimerNombre,
        OtrosNombres: this.OtrosNombres,
        RazonSocial: this.RazonSocial,
        Direccion: this.Direccion,
        CodigoDepartamento: this.CodigoDepartamento,
        CodigoMunicipio: this.CodigoMunicipio,
        PaisDeResidencia: this.PaisDeResidencia
      };

      this.Reset ();

      this.$apollo.mutate ({
        mutation: UPDATE_TERCERO,
        variables: {
          Id: Tercero.Id,
          TipoDeIdentificacion: Tercero.TipoDeIdentificacion,
          NumeroDeIdentificacion: Tercero.NumeroDeIdentificacion,
          DigitoDeVerificacion: Tercero.DigitoDeVerificacion,
          PrimerApellido: Tercero.PrimerApellido,
          SegundoApellido: Tercero.SegundoApellido,
          PrimerNombre: Tercero.PrimerNombre,
          OtrosNombres: Tercero.OtrosNombres,
          RazonSocial: Tercero.RazonSocial,
          Direccion: Tercero.Direccion,
          CodigoDepartamento: Tercero.CodigoDepartamento,
          CodigoMunicipio: Tercero.CodigoMunicipio,
          PaisDeResidencia: Tercero.PaisDeResidencia
        },
        loadingKey: 'loading',
        update: (store, { data: res }) => {
          //console.log(Ente);
          try {
            var data = store.readQuery({
              query: TERCEROS,
              variables: {
                TipoDeIdentificacion: res.UpdateTercero.TipoDeIdentificacion,
                NumeroDeIdentificacion: res.UpdateTercero.NumeroDeIdentificacion,
                DigitoDeVerificacion: res.UpdateTercero.DigitoDeVerificacion
              }
            })

            for (let i=0; i<data.Terceros.length; i++) {
              if (data.Terceros[i].Id === res.UpdateTercero.Id) {
                data.Terceros[i].TipoDeIdentificacion = res.UpdateTercero.TipoDeIdentificacion
                data.Terceros[i].NumeroDeIdentificacion = res.UpdateTercero.NumeroDeIdentificacion
                data.Terceros[i].DigitoDeVerificacion = res.UpdateTercero.DigitoDeVerificacion
                data.Terceros[i].PrimerApellido = res.UpdateTercero.PrimerApellido
                data.Terceros[i].SegundoApellido = res.UpdateTercero.SegundoApellido
                data.Terceros[i].PrimerNombre = res.UpdateTercero.PrimerNombre
                data.Terceros[i].OtrosNombres = res.UpdateTercero.OtrosNombres
                data.Terceros[i].RazonSocial = res.UpdateTercero.RazonSocial
                data.Terceros[i].Direccion = res.UpdateTercero.Direccion
                data.Terceros[i].CodigoDepartamento = res.UpdateTercero.CodigoDepartamento
                data.Terceros[i].CodigoMunicipio = res.UpdateTercero.CodigoMunicipio
                data.Terceros[i].PaisDeResidencia = res.UpdateTercero.PaisDeResidencia
              }
            }

            store.writeQuery({
              query: TERCEROS,
              variables: {
                TipoDeIdentificacion: res.UpdateTercero.TipoDeIdentificacion,
                NumeroDeIdentificacion: res.UpdateTercero.NumeroDeIdentificacion,
                DigitoDeVerificacion: res.UpdateTercero.DigitoDeVerificacion
              },
              data: data
            })

          } catch (Err) {

            var data = {Terceros: []}

            data.Terceros.push(res.UpdateTercero)

            store.writeQuery({
              query: TERCEROS,
              variables: {
                TipoDeIdentificacion: res.UpdateTercero.TipoDeIdentificacion,
                NumeroDeIdentificacion: res.UpdateTercero.NumeroDeIdentificacion,
                DigitoDeVerificacion: res.UpdateTercero.DigitoDeVerificacion
              },
              data: data
            })

          }

        },
      }).then( data => {
        //console.log(data)
      }).catch( Err => {
        //console.log(Err)
      })
    },
    Reset () {
      this.Id = null
      this.TipoDeIdentificacion = null
      this.NumeroDeIdentificacion = null
      this.DigitoDeVerificacion = null
      this.PrimerApellido = null
      this.SegundoApellido = null
      this.PrimerNombre = null
      this.OtrosNombres = null
      this.RazonSocial = null
      this.Direccion = null
      this.CodigoDepartamento = null
      this.CodigoMunicipio = null
      this.PaisDeResidencia = null
    },
    LoadTercero (Terceros) {
      //console.log (Terceros)
      for (let i=0; i<Terceros.length; i++) {
        if (
          this.TipoDeIdentificacion === Terceros[i].TipoDeIdentificacion
          &&
          this.NumeroDeIdentificacion === Terceros[i].NumeroDeIdentificacion
          &&
          this.DigitoDeVerificacion === Terceros[i].DigitoDeVerificacion
        ) {
          this.Id = Terceros[i].Id
          this.PrimerApellido = Terceros[i].PrimerApellido
          this.SegundoApellido = Terceros[i].SegundoApellido
          this.PrimerNombre = Terceros[i].PrimerNombre
          this.OtrosNombres = Terceros[i].OtrosNombres
          this.RazonSocial = Terceros[i].RazonSocial
          this.Direccion = Terceros[i].Direccion
          this.CodigoDepartamento = Terceros[i].CodigoDepartamento
          this.CodigoMunicipio = Terceros[i].CodigoMunicipio
          this.PaisDeResidencia = Terceros[i].PaisDeResidencia
          break
        }else{
          this.Id = null
          this.PrimerApellido = null
          this.SegundoApellido = null
          this.PrimerNombre = null
          this.OtrosNombres = null
          this.RazonSocial = null
          this.Direccion = null
          this.CodigoDepartamento = null
          this.CodigoMunicipio = null
          this.PaisDeResidencia = null
        }
      }
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
