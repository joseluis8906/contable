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
            v-icon(ma) group_work
            | Tercero

      v-tabs(dark fixed icons centered v-model="TabActive")
        v-tabs-bar(slot="activators" class="light-blue darken-4")
          v-tabs-slider(class="success")
          v-tabs-item(href="#tab-1" @click.native="")
            v-icon assignment
            h6(class="body-2 grey--text text--lighten-4") Datos

          v-tabs-item(href="#tab-2" @click.native="")
            v-icon chrome_reader_mode
            h6(class="body-2 grey--text text--lighten-4") Cuentas

        v-tabs-content(id="tab-1")
          v-card-text
            v-layout( row wrap)
              v-flex( xs12 )
                v-select( v-bind:items="ItemsDianIdentificacion"
                          v-model="Tercero.DianIdentificacionId"
                          label="Tipo de Identificación"
                          item-value="Id"
                          item-text="Nombre"
                          dark )

                v-text-field( label="Numero de Identificación" v-model="Tercero.NumeroDeIdentificacion" dark )

                v-text-field( label="Primer Apellido" v-model="Tercero.PrimerApellido" dark )

                v-text-field( label="Segundo Apellido" v-model="Tercero.SegundoApellido" dark )

                v-text-field( label="Primer Nombre" v-model="Tercero.PrimerNombre" dark )

                v-text-field( label="Otros Nombres" v-model="Tercero.OtrosNombres" dark )

                v-text-field( label="Razón Social" v-model="Tercero.RazonSocial" dark )

                v-text-field( label="Dirección" v-model="Tercero.Direccion" dark )

                v-select( v-bind:items="ItemsDianPais"
                          v-model="Tercero.DianPaisId"
                          label="Pais"
                          item-value="Id"
                          item-text="Nombre"
                          dark )

                v-select( v-bind:items="ItemsDianDepartamento"
                          v-model="Tercero.DianDepartamentoId"
                          label="Departamento"
                          item-value="Id"
                          item-text="Nombre"
                          dark )

                v-select( v-bind:items="ItemsDianCiudad"
                          v-model="Tercero.DianCiudadId"
                          label="Ciudad"
                          item-value="Id"
                          item-text="Nombre"
                          dark )

          v-card-actions
            v-spacer
            v-btn( dark @click.native="Reset" ) Cancelar
            v-btn( dark primary @click.native="CreateOrUpdate" ) Guardar

        v-tabs-content(id="tab-2")
          v-card-text
            v-layout( row wrap)
              v-flex( xs12 )
                v-data-table( v-bind:headers="headers"
                              v-bind:items="Tercero.Cuentas"
                              class="elevation-5 grey lighten-1 grey--text text--darken-4" )

                  template(slot="items" scope="props")
                    td( style="border-left: 1px solid #999999" class="text-xs-center" ) {{ props.item.Numero }}
                    td( style="border-left: 1px solid #999999" class="text-xs-center" ) {{ props.item.Code }}
                    td( style="border-left: 1px solid #999999" class="text-xs-center" ) {{ props.item.Name }}
                    td(style="border-left: 1px solid #999999" class="text-xs-center pl-1 pr-1")
                      v-btn( fab
                             dark
                             small
                             error
                             style="width: 16px; height:16px"
                             @click.native="eliminar(props.item)"
                             :disabled="props.item.EliminarDisable")
                        v-icon remove

                v-expansion-panel(class="mt-4")
                  v-expansion-panel-content(v-for="(ItemClase, cl) in ItemsClase" :key="cl" @mousedown.native.stop="Buscar(ItemClase.Code)")
                    div(slot="header") <v-btn @click.stop="Agregar(ItemClase)" icon small class="grey--text text--lighten-4"><v-icon style="margin: 0 !important">add_circle</v-icon></v-btn> {{ ItemClase.Code }} - {{ ItemClase.Name }}
                    div(slot="default")
                      v-expansion-panel
                        v-expansion-panel-content(v-for="(ItemGrupo, g) in ItemsGrupo" :key="g" @mousedown.native.stop="Buscar(ItemGrupo.Code)" class="teal darken-3" style="border-bottom: 1px solid #00493c !important")
                          div(slot="header") <v-btn @click.stop="Agregar(ItemGrupo)" icon small class="grey--text text--lighten-4"><v-icon style="margin: 0 !important">add_circle</v-icon></v-btn> {{ ItemGrupo.Code }} - {{ ItemGrupo.Name }}
                          div(slot="default")
                            v-expansion-panel
                              v-expansion-panel-content(v-for="(ItemCuenta, c) in ItemsCuenta" :key="c" @mousedown.native.stop="Buscar(ItemCuenta.Code)" class="lime darken-3" style="border-bottom: 1px solid #6e6d04 !important")
                                div(slot="header" ) <v-btn @click.stop="Agregar(ItemCuenta)" icon small class="grey--text text--lighten-4"><v-icon style="margin: 0 !important">add_circle</v-icon></v-btn> {{ ItemCuenta.Code }} - {{ ItemCuenta.Name }}
                                div(slot="default")
                                  v-expansion-panel
                                    v-expansion-panel-content(v-for="(ItemSubcuenta, s) in ItemsSubcuenta" :key="s" class="blue darken-3" style="border-bottom: 1px solid #0545a0 !important")
                                      div(slot="header" ) <v-btn @click.stop="Agregar(ItemSubcuenta)" icon small class="grey--text text--lighten-4"><v-icon style="margin: 0 !important">add_circle</v-icon></v-btn> {{ ItemSubcuenta.Code }} - {{ ItemSubcuenta.Name }}
                                      div(slot="default")
</template>


<style lang="stylus" scoped>
h5.bold
  font-weight bold

.alert-especial
  position absolute

.editover:hover
  color: orange
</style>


<script>

import DIAN_IDENTIFICACIONES from '~/queries/DianIdentificaciones.gql'
import DIAN_PAISES from '~/queries/DianPaises.gql'
import DIAN_DEPARTAMENTOS from '~/queries/DianDepartamentos.gql'
import DIAN_CIUDADES from '~/queries/DianCiudades.gql'

import TERCEROS from '~/queries/Terceros.gql'
import CREATE_TERCERO from '~/queries/CreateTercero.gql'
import UPDATE_TERCERO from '~/queries/UpdateTercero.gql'

import CUENTASLIKE from '~/queries/CuentasLike.gql'

export default {
  data: () => ({
    snackbar: {
      context: 'secondary',
      mode: '',
      timeout: 6000,
      text: 'Cargando'
    },
    Tercero: {
      Id: null,
      DianIdentificacionId: null,
      NumeroDeIdentificacion: null,
      PrimerApellido: null,
      SegundoApellido: null,
      PrimerNombre: null,
      OtrosNombres: null,
      RazonSocial: null,
      Direccion: null,
      DianDepartamentoId: null,
      DianCiudadId: null,
      DianPaisId: null,
      Cuentas: [],
    },
    TabActive: null,
    ItemsDianIdentificacion: [],
    ItemsDianDepartamento: [],
    ItemsDianCiudad: [],
    ItemsDianPais: [],
    headers: [
      { text: 'N°', align: 'center', sortable: false,  value: 'Numero' },
      { text: 'Codigo', align: 'center', sortable: false,  value: 'Código' },
      { text: 'Nombre', align: 'center', sortable: false,  value: 'Nombre' },
      { text: 'Eliminar', align: 'center', sortable: false,  value: 'Eliminar' },
    ],
    Cuenta: null,
    ItemsClase: [],
    ItemsGrupo: [],
    ItemsCuenta: [],
    ItemsSubcuenta: [],
    loading: 0
  }),
  beforeMount () {
    if (sessionStorage.getItem('x-access-token') === null || sessionStorage.getItem('x-access-token') === null) {
      this.$router.push('/')
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.BuscarInicial()
    })
  },
  apollo: {
    DianIdentificaciones: {
      query: DIAN_IDENTIFICACIONES,
      update (data) {
        this.ItemsDianIdentificacion = data.DianIdentificaciones;
      }
    },
    DianPaises: {
      query: DIAN_PAISES,
      update (data) {
        this.ItemsDianPais = data.DianPaises;
      }
    },
    DianDepartamentos: {
      query: DIAN_DEPARTAMENTOS,
      update (data) {
        this.ItemsDianDepartamento = data.DianDepartamentos;
      }
    },
    DianCiudades: {
      query: DIAN_CIUDADES,
      update (data) {
        this.ItemsDianCiudad = data.DianCiudades;
      }
    },
    Terceros: {
      query: TERCEROS,
      variables () {
        return {
          TipoDeIdentificacion: this.Tercero.DianIdentificacionId,
          NumeroDeIdentificacion: this.Tercero.NumeroDeIdentificacion
        }
      },
      update (data) {
        this.LoadTercero(data.Terceros)
      }
    },
  },
  methods: {
    BuscarInicial () {

      this.$apollo.query({
        query: CUENTASLIKE,
        variables: {
          Type: 'Supersolidaria',
          Length: 1
        },
        loadingKey: 'loading',

      }).then(res => {
        this.Code = 0;
        this.ItemsClase = [];

        for(let i = 0; i<res.data.CuentasLike.length; i++){
          let tmp = {
            Id: res.data.CuentasLike[i].Id,
            Type: res.data.CuentasLike[i].Type,
            Code: res.data.CuentasLike[i].Code,
            Name: res.data.CuentasLike[i].Name,
          }
          this.ItemsClase.push(tmp)
        }
      })
    },
    Buscar (Code) {

      this.Code = Code;
      var Length = this.Code.length;

      switch (Length) {
        case 1:
          this.Length = 2
          break;

        case 2:
          this.Length = 4
          break;

        case 4:
          this.Length = 6
          break;

        //case 6:
          //this.Length = 8
          //break;

        default:
          this.Length = 1
      }

      this.Code = this.Code + '%';

      if(this.OldCode === this.Code){
        return
      }else {

        this.OldCode = this.Code
      }

      this.$apollo.query({
        query: CUENTASLIKE,
        variables: {
          Type: 'Supersolidaria',
          Code: this.Code,
          Length: this.Length
        },
        loadingKey: 'loading',

      }).then(res => {

        if(res.data.CuentasLike.length === 0){
          switch (Length) {
            case 2:
              this.ItemsCuenta = []
              this.ItemsSubcuenta = []
              break;

            case 4:
              this.ItemsSubcuenta = []
              //this.Auxiliar = []
              break;

            //case 6:
              //this.ItemsAuxiliar = []
              //break;

            default:
              return
          }
          return
        }

        let length = res.data.CuentasLike.length > 0 ? res.data.CuentasLike[0].Code.length : 0

        switch (length) {
          case 2:
            this.ItemsGrupo = []
            this.ItemsCuenta = []
            this.ItemsSubcuenta = []
            this.ItemsAuxiliar = []
            break;

          case 4:
            this.ItemsCuenta = []
            this.ItemsSubcuenta = []
            //this.ItemsAuxiliar = []
            break;

          case 6:
            this.ItemsSubcuenta = []
            //this.ItemsAuxiliar = []
            break;

          //case 8:
            //this.ItemsAuxiliar = []
            //break;

          default:
            //this.ItemsAuxiliar = []
            this.ItemsSubcuenta = []
            return
        }

        if(res.data.CuentasLike[0].Code.length === 2){
          for(let i = 0; i<res.data.CuentasLike.length; i++){
            let tmp = {
              Id: res.data.CuentasLike[i].Id,
              Type: res.data.CuentasLike[i].Type,
              Code: res.data.CuentasLike[i].Code,
              Name: res.data.CuentasLike[i].Name,
            }
            this.ItemsGrupo.push(tmp)
          }
        }
        else if(res.data.CuentasLike[0].Code.length === 4){
          for(let i = 0; i<res.data.CuentasLike.length; i++){
            let tmp = {
              Id: res.data.CuentasLike[i].Id,
              Type: res.data.CuentasLike[i].Type,
              Code: res.data.CuentasLike[i].Code,
              Name: res.data.CuentasLike[i].Name,
            }
            this.ItemsCuenta.push(tmp)
          }
        }
        else if(res.data.CuentasLike[0].Code.length === 6){
          for(let i = 0; i<res.data.CuentasLike.length; i++){
            let tmp = {
              Id: res.data.CuentasLike[i].Id,
              Type: res.data.CuentasLike[i].Type,
              Code: res.data.CuentasLike[i].Code,
              Name: res.data.CuentasLike[i].Name,
            }
            this.ItemsSubcuenta.push(tmp)
          }
        }
        /*else if(res.data.CuentasLike[0].Code.length === 8){
          for(let i = 0; i<res.data.CuentasLike.length; i++){
            let tmp = {
              Id: res.data.CuentasLike[i].Id,
              Type: res.data.CuentasLike[i].Type,
              Code: res.data.CuentasLike[i].Code,
              Name: res.data.CuentasLike[i].Name,
            }
            this.ItemsAuxiliar.push(tmp)
          }
        }*/
      })
    },
    /*CreateOrUpdate () {
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
      }).then( data => {}).catch( Err => {
        console.log(Err)
      })
    },
    Update () {
      const Tercero = {
        Id: this.Id,
        TipoDeIdentificacion: this.TipoDeIdentificacion,
        NumeroDeIdentificacion: this.NumeroDeIdentificacion,
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
      }).then( data => {}).catch( Err => {
        //console.log(Err)
      })
    },*/
    Reset () {
      this.Id = null
      this.TipoDeIdentificacion = null
      this.NumeroDeIdentificacion = null
      this.PrimerApellido = null
      this.SegundoApellido = null
      this.PrimerNombre = null
      this.OtrosNombres = null
      this.RazonSocial = null
      this.Direccion = null
      this.CodigoDepartamento = null
      this.CodigoMunicipio = null
      this.PaisDeResidencia = null
      this.Cuentas = []
    },
    LoadTercero (Terceros) {
      //console.log (Terceros)
      for (let i=0; i<Terceros.length; i++) {
        if (
          this.Tercero.DianIdentificacionId === Terceros[i].DianIdentificacion.Id
          &&
          this.Tercero.NumeroDeIdentificacion === Terceros[i].NumeroDeIdentificacion
        ) {
          this.Tercero.Id = Terceros[i].Id
          this.Tercero.PrimerApellido = Terceros[i].PrimerApellido
          this.Tercero.SegundoApellido = Terceros[i].SegundoApellido
          this.Tercero.PrimerNombre = Terceros[i].PrimerNombre
          this.Tercero.OtrosNombres = Terceros[i].OtrosNombres
          this.Tercero.RazonSocial = Terceros[i].RazonSocial
          this.Tercero.Direccion = Terceros[i].Direccion
          this.Tercero.DianPaisId = Terceros[i].DianPais.Id
          this.Tercero.DianDepartamentoId = Terceros[i].DianDepartamento.Id
          this.Tercero.DianCiudadId = Terceros[i].DianCiudad.Id
          this.Tercero.Cuentas = []
          for(let j=0; j < Terceros[i].Cuentas.length; j++){
            let tmp = {
              Numero: j+1,
              Id: Terceros[i].Cuentas[j].Id,
              Code: Terceros[i].Cuentas[j].Code,
              Name: Terceros[i].Cuentas[j].Name,
              EliminarDisable: false,
            }
            this.Tercero.Cuentas.push(tmp)
          }
          break
        }else{
          this.Tercero.Id = null
          this.Tercero.PrimerApellido = null
          this.Tercero.SegundoApellido = null
          this.Tercero.PrimerNombre = null
          this.Tercero.OtrosNombres = null
          this.Tercero.RazonSocial = null
          this.Tercero.Direccion = null
          this.Tercero.DianPaisId = null
          this.Tercero.DianDepartamentoId = null
          this.Tercero.DianCiudadId = null
          this.Tercero.Cuentas = []
        }
      }
    },
  }
};


</script>
