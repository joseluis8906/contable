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
            v-icon(ma) book
            | Informe
      v-card-text
        v-layout( row wrap)
          v-flex( xs12 )
            v-select( v-bind:items="ItemsTipo"
                      v-model="Tipo"
                      label="Tipo"
                      item-value="value"
                      item-text="text"
                      dark )

      v-card-actions
        v-spacer
        v-btn( dark @click.native="Reset" ) Cancelar
        v-btn( dark primary @click.native="CreateOrUpdate" ) Guardar
</template>

<script>

import TERCEROS from '~/queries/Terceros.gql'
import CREATE_TERCERO from '~/queries/CreateTercero.gql'
import UPDATE_TERCERO from '~/queries/UpdateTercero.gql'


export default {
  data: () => ({
    snackbar: {
      context: 'secondary',
      mode: '',
      timeout: 6000,
      text: 'Cargando'
    },
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
    ItemsTipo: [
      {text: 'Causación', value: '01'},
      {text: 'Comprobante de Egreso', value: '02'},
      {text: 'Comprobante de diario', value: '03'},
      {text: 'Auxiliar Contable', value: '04'},
      {text: 'Libro de Banco', value: '05'},
      {text: 'Estado de Resultado', value: '06'},
      {text: 'Estado de Situación Financiera', value: '07'},
    ],
    Tipo: null,
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
  }
};


</script>

<style lang="stylus" scoped>
h5.bold
  font-weight bold

.alert-especial
  position absolute

</style>
