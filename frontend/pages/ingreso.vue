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

            v-text-field( label="Número" )


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
                            v-model="Causacion.Fecha"
                            readonly )

              v-date-picker( :months="months"
                           :days="days"
                           first-day-of-week="D"
                           :header-date-format="({ monthName, year }) => { return `${monthName} ${year}` }"
                           v-model="Causacion.Fecha"
                           dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark warning @click.native="Fecha=null" ) Limpiar


            v-text-field( label="Concepto"
                          v-model="Causacion.Concepto"
                          multi-line )

            v-data-table( :headers="Tabla.Headers"
                          :items="Causacion.Items"
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
                         @click.native="eliminar(props.item)")
                    v-icon(dark) remove

            v-select( label="Tipo"
                      :items="ConfIngresos"
                      item-text="Nombre"
                      return-object
                      class="mt-5"
                      v-model="ConfIngreso"
                      dark )

            v-money(label="Monto" v-model="Monto" maskType="currency")

            v-btn(fab dark class="indigo mt-0" @click.native="agregar")
              v-icon(dark) add

      v-card-actions
        v-spacer
        v-btn( dark warning @click.native="Reset" ) Limpiar
</template>

<script>

import TERCEROS from '~/queries/Terceros.gql';
import CREATE_TERCERO from '~/queries/CreateTercero.gql';
import UPDATE_TERCERO from '~/queries/UpdateTercero.gql';

import CONFINGRESOS from '~/queries/ConfIngresos.gql';

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
    Causacion: {
      Id: null,
      Numero: null,
      Fecha: null,
      Concepto: null,
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
  },
  methods: {
    agregar () {
      let tmp = Object.assign({Monto: this.Monto}, this.ConfIngreso);
      this.Causacion.Items.push(tmp);
    },
    eliminar(){
      this.ItemsCausacion = [];
    },
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
