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
            v-btn( dark @click.native="Reset()" ) Cancelar
            v-btn( dark primary @click.native="CreateOrUpdate()" ) Guardar

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
                             @click.native="Eliminar(props.item)"
                             :disabled="props.item.EliminarDisable")
                        v-icon remove

                v-expansion-panel(class="mt-4")
                  v-expansion-panel-content(v-for="(Clase, cl) in Clases" :key="cl" @mousedown.native.stop="BuscarGrupo(Clase)")
                    div(slot="header") {{ Clase.Code }}
                    div(slot="default") <v-btn @click.native.stop="Agregar(Clase)" icon small class="grey--text text--lighten-4" :disabled="Boolean(Clase.Disabled)"><v-icon style="margin: 0 !important;">add_circle</v-icon></v-btn><span class="body-2">{{ Clase.Name }}</span>

                        v-expansion-panel-content(v-for="(Grupo, g) in Clase.Grupos" :key="g" @mousedown.native.stop="BuscarCuenta(Grupo)" class="teal darken-3" style="border-bottom: 1px solid #00493c !important")
                          div(slot="header") {{ Grupo.Code }}
                          div(slot="default") <v-btn @click.native.stop="Agregar(Grupo)" icon small class="grey--text text--lighten-4" :disabled="Boolean(Grupo.Disabled)"><v-icon style="margin: 0 !important">add_circle</v-icon></v-btn><span class="body-2">{{ Grupo.Name }}</span>

                              v-expansion-panel-content(v-for="(Cuenta, c) in Grupo.Cuentas" :key="c" @mousedown.native.stop="BuscarSubcuenta(Cuenta)" class="lime darken-3" style="border-bottom: 1px solid #6e6d04 !important")
                                div(slot="header" ) {{ Cuenta.Code }}
                                div(slot="default") <v-btn @click.native.stop="Agregar(Cuenta)" icon small class="grey--text text--lighten-4" :disabled="Boolean(Cuenta.Disabled)"><v-icon style="margin: 0 !important">add_circle</v-icon></v-btn><span class="body-2">{{ Cuenta.Name }}</span>

                                    v-expansion-panel-content(v-for="(Subcuenta, s) in Cuenta.Subcuentas" :key="s" class="blue darken-3" style="border-bottom: 1px solid #0545a0 !important")
                                      div(slot="header" ) {{ Subcuenta.Code }}
                                      div(slot="default") <v-btn @click.native.stop="Agregar(Subcuenta)" icon small class="grey--text text--lighten-4" :disabled="Boolean(Subcuenta.Disabled)"><v-icon style="margin: 0 !important">add_circle</v-icon></v-btn><span class="body-2">{{ Subcuenta.Name }}</span>

          v-card-actions
            v-spacer
            v-btn( dark @click.native="Reset()" ) Cancelar
            v-btn( dark primary @click.native="CreateOrUpdate()" ) Guardar

</template>


<style lang="stylus" scoped>
h5.bold
  font-weight bold

.alert-especial
  position absolute

.application .theme--dark.btn:disabled:not(.btn--icon):not(.btn--flat)
  background-color black !important

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
import TERCERO_ADD_CUENTA from '~/queries/TerceroAddCuenta.gql'
import TERCERO_REMOVE_CUENTA from '~/queries/TerceroRemoveCuenta.gql'

import CUENTASLIKE from '~/queries/CuentasLike.gql'
import CREATE_CUENTA from '~/queries/CreateCuenta.gql'

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
    OldCode: null,
    Code: null,
    Clases: [],
    loading: 0
  }),
  beforeMount () {
    if (sessionStorage.getItem('x-access-token') === null || sessionStorage.getItem('x-access-token') === null) {
      this.$router.push('/')
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.BuscarClase ()
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
    BuscarClase () {

      this.$apollo.query({
        query: CUENTASLIKE,
        variables: {
          Type: 'Supersolidaria',
          Length: 1
        },
        loadingKey: 'loading',

      }).then(res => {

        this.Clases = [];

        for(let i = 0; i<res.data.CuentasLike.length; i++){
          let tmp = {
            Id: res.data.CuentasLike[i].Id,
            Type: res.data.CuentasLike[i].Type,
            Code: res.data.CuentasLike[i].Code,
            Name: res.data.CuentasLike[i].Name,
            Disabled: false,
            Grupos: []
          }
          this.Clases.push(tmp)
        }
      })
    },
    BuscarGrupo (Clase) {

      if(this.OldCode === Clase.Code){return}

      this.OldCode = Clase.Code;

      this.$apollo.query({
        query: CUENTASLIKE,
        variables: {
          Type: 'Supersolidaria',
          Code: Clase.Code + '%',
          Length: 2
        },
        loadingKey: 'loading',

      }).then(res => {

        Clase.Grupos = []

        for(let i = 0; i<res.data.CuentasLike.length; i++){
          let tmp = {
            Id: res.data.CuentasLike[i].Id,
            Type: res.data.CuentasLike[i].Type,
            Code: res.data.CuentasLike[i].Code,
            Name: res.data.CuentasLike[i].Name,
            Disabled: false,
            Cuentas: []
          }
          Clase.Grupos.push(tmp)
        }
      })
    },
    BuscarCuenta (Grupo) {

      if(this.OldCode === Grupo.Code){return}

      this.OldCode = Grupo.Code;

      this.$apollo.query({
        query: CUENTASLIKE,
        variables: {
          Type: 'Supersolidaria',
          Code: Grupo.Code + '%',
          Length: 4
        },
        loadingKey: 'loading',

      }).then(res => {

        Grupo.Cuentas = []

        for(let i = 0; i<res.data.CuentasLike.length; i++){
          let tmp = {
            Id: res.data.CuentasLike[i].Id,
            Type: res.data.CuentasLike[i].Type,
            Code: res.data.CuentasLike[i].Code,
            Name: res.data.CuentasLike[i].Name,
            Disabled: false,
            Subcuentas: []
          }
          let Cuentas = this.Tercero.Cuentas;
          for (let j = 0; j < Cuentas.length; j++){
            if(Cuentas[j].Code.length===6 && tmp.Code.startsWith(Cuentas[j].Code)){
              tmp.Disabled = true;
            }
          }
          Grupo.Cuentas.push(tmp)
        }
      });
    },
    BuscarSubcuenta (Cuenta) {

      if(this.OldCode === Cuenta.Code){return}

      this.OldCode = Cuenta.Code;

      this.$apollo.query({
        query: CUENTASLIKE,
        variables: {
          Type: 'Supersolidaria',
          Code: Cuenta.Code + '%',
          Length: 6
        },
        loadingKey: 'loading',

      }).then(res => {

        Cuenta.Subcuentas = []

        for(let i = 0; i<res.data.CuentasLike.length; i++){
          let tmp = {
            Id: res.data.CuentasLike[i].Id,
            Type: res.data.CuentasLike[i].Type,
            Code: res.data.CuentasLike[i].Code,
            Name: res.data.CuentasLike[i].Name,
            Disabled: false,
            Auxiliares: []
          }
          let Cuentas = this.Tercero.Cuentas;
          for (let j = 0; j < Cuentas.length; j++){
            if(Cuentas[j].Code.length===8 && Cuentas[j].Code.startsWith(tmp.Code)){
              tmp.Disabled = true;
            }
          }
          Cuenta.Subcuentas.push(tmp)
        }
      });
    },
    CreateOrUpdate () {
      if (this.Tercero.Id === null) {
        this.Create();
      }else{
        this.Update();
      }
    },
    Create () {

      const Tercero = {
        DianIdentificacionId: this.Tercero.DianIdentificacionId,
        NumeroDeIdentificacion: this.Tercero.NumeroDeIdentificacion,
        PrimerApellido: this.Tercero.PrimerApellido,
        SegundoApellido: this.Tercero.SegundoApellido,
        PrimerNombre: this.Tercero.PrimerNombre,
        OtrosNombres: this.Tercero.OtrosNombres,
        RazonSocial: this.Tercero.RazonSocial,
        Direccion: this.Tercero.Direccion,
        DianPaisId: this.Tercero.DianPaisId,
        DianDepartamentoId: this.Tercero.DianDepartamentoId,
        DianCiudadId: this.Tercero.DianCiudadId
      };

      this.Reset ();

      this.$apollo.mutate ({
        mutation: CREATE_TERCERO,
        variables: {
          DianIdentificacionId: Tercero.DianIdentificacionId,
          NumeroDeIdentificacion: Tercero.NumeroDeIdentificacion,
          DigitoDeVerificacion: Tercero.DigitoDeVerificacion,
          PrimerApellido: Tercero.PrimerApellido,
          SegundoApellido: Tercero.SegundoApellido,
          PrimerNombre: Tercero.PrimerNombre,
          OtrosNombres: Tercero.OtrosNombres,
          RazonSocial: Tercero.RazonSocial,
          Direccion: Tercero.Direccion,
          DianPaisId: Tercero.DianPaisId,
          DianDepartamentoId: Tercero.DianDepartamentoId,
          DianCiudadId: Tercero.DianCiudadId
      },
      loadingKey: 'loading',
      update: (store, { data: res }) => {
        //console.log(Ente);
        try{
          var data = store.readQuery({
            query: TERCEROS,
            variables: {
              DianIdentificacionId: res.CreteTercero.DianIdentificacionId,
              NumeroDeIdentificacion: res.CreateTercero.NumeroDeIdentificacion,
            }
          })

          console.log(data)
          data.Terceros.push(res.CreateTercero)

          store.writeQuery({
            query: TERCEROS,
            variables: {
              DianIdentificacionId: res.CreateTercero.DianIdentificacionId,
              NumeroDeIdentificacion: res.CreateTercero.NumeroDeIdentificacion,
            },
            data: data
          })

        } catch (Err) { console.log(Err) }

      },
      })

    },
    Update () {
      const Tercero = {
        Id: this.Tercero.Id,
        DianIdentificacionId: this.Tercero.DianIdentificacionId,
        NumeroDeIdentificacion: this.Tercero.NumeroDeIdentificacion,
        PrimerApellido: this.Tercero.PrimerApellido,
        SegundoApellido: this.Tercero.SegundoApellido,
        PrimerNombre: this.Tercero.PrimerNombre,
        OtrosNombres: this.Tercero.OtrosNombres,
        RazonSocial: this.Tercero.RazonSocial,
        Direccion: this.Tercero.Direccion,
        DianDepartamentoId: this.Tercero.DianDepartamentoId,
        DianCiudadId: this.Tercero.DianCiudadId,
        DianPaisId: this.Tercero.DianPaisId
      };

      this.Reset ();

      this.$apollo.mutate ({
        mutation: UPDATE_TERCERO,
        variables: {
          Id: Tercero.Id,
          DianIdentificacionId: Tercero.DianIdentificacionId,
          NumeroDeIdentificacion: Tercero.NumeroDeIdentificacion,
          DigitoDeVerificacion: Tercero.DigitoDeVerificacion,
          PrimerApellido: Tercero.PrimerApellido,
          SegundoApellido: Tercero.SegundoApellido,
          PrimerNombre: Tercero.PrimerNombre,
          OtrosNombres: Tercero.OtrosNombres,
          RazonSocial: Tercero.RazonSocial,
          Direccion: Tercero.Direccion,
          DianDepartamentoId: Tercero.DianDepartamentoId,
          DianCiudadId: Tercero.DianCiudadId,
          DianPaisId: Tercero.DianPaisId
        },
        loadingKey: 'loading',
        update: (store, { data: res }) => {
          //console.log(Ente);
          try {

            var data = store.readQuery({
              query: TERCEROS
            })

            for (let i=0; i<data.Terceros.length; i++) {
              if (data.Terceros[i].Id === res.UpdateTercero.Id) {
                data.Terceros[i] = res.UpdateTercero
              }
            }

            store.writeQuery({
              query: TERCEROS,
              data
            })

          } catch (Err) {console.log(Err)}

        },
      })
    },
    Reset () {
      this.Tercero.Id = null
      this.Tercero.DianIdentificacionId = null
      this.Tercero.NumeroDeIdentificacion = null
      this.Tercero.PrimerApellido = null
      this.Tercero.SegundoApellido = null
      this.Tercero.PrimerNombre = null
      this.Tercero.OtrosNombres = null
      this.Tercero.RazonSocial = null
      this.Tercero.Direccion = null
      this.Tercero.DianDepartamentoId = null
      this.Tercero.DianCiudadId = null
      this.Tercero.DianPaisId = null
      this.Tercero.Cuentas = []
      this.OldCode = null
      this.BuscarClase ()
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
    Agregar (Cuenta) {

      if(!this.Tercero.Id && !Cuenta.Id){return}

      Cuenta.Disabled = true;

      this.$apollo.query({
        query: CUENTASLIKE,
        variables: {
          Type: 'Supersolidaria',
          Code: Cuenta.Code + '%',
          Length: Cuenta.Code.length + 2
        }
      }).then(res => {

        let Cuentas = res.data.CuentasLike;

        let Postfix = Cuentas.length + 1;


        Postfix < 10 ? Postfix = '0' + Postfix.toString() : Postfix = Postfix.toString();

        let Name = this.Tercero.RazonSocial !== null && this.Tercero.RazonSocial !== '' ? this.Tercero.RazonSocial : `${this.Tercero.PrimerNombre} ${this.Tercero.OtrosNombres} ${this.Tercero.PrimerApellido} ${this.Tercero.SegundoApellido}`;

        Name = Name.toUpperCase();

        const NewCuenta = {
          Type: 'Supersolidaria',
          Code: Cuenta.Code + Postfix,
          Name: Name,
        };

        this.$apollo.mutate({
          mutation: CREATE_CUENTA,
          variables: {
            Type: NewCuenta.Type,
            Code: NewCuenta.Code,
            Name: NewCuenta.Name,
          },
          update: (store, { data: res }) => {

            try{

              var data = store.readQuery({
                query: CUENTAS
              });

              data.Cuentas.push(res.CreateCuenta);

              store.writeQuery({
                query: CUENTAS,
                data
              });

            } catch (Err) {console.log(Err)}

          }
        }).then( res => {

          const AddCuenta = {
            Id: this.Tercero.Id,
            CuentaId: res.data.CreateCuenta.Id
          }

          this.$apollo.mutate({
            mutation: TERCERO_ADD_CUENTA,
            variables: {
              Id: AddCuenta.Id,
              CuentaId: AddCuenta.CuentaId
            },
            loadingKey: "loading",
            update: (store, { data: res }) => {

              try{
                var data = store.readQuery({
                  query: TERCEROS
                })

                let existe = false;
                for (let i=0; i < data.Terceros.length; i++){
                  if(data.Terceros[i].Id === res.TerceroAddCuenta.Id){
                    data.Terceros[i] = res.TerceroAddCuenta;
                    existe = true
                  }
                }

                !existe ? data.Terceros.push(res.TerceroAddCuenta) : null;

                store.writeQuery({
                  query: TERCEROS,
                  data
                }).then( () => {
                  this.BuscarClase ()
                })

              } catch (Err) {console.log(Err)}

            }
          })
        })
      })
    },
    Eliminar (Cuenta) {

      var Code = Cuenta.Code.substr(0, Cuenta.Code.length-2)

      for(let h=0; h<this.Clases.length; h++){
        if(this.Clases[h].Grupos && Code.length>=2){
          for(let i=0; i<this.Clases[h].Grupos.length; i++){
            if(Code.length === 2 && Code === this.Clases[h].Grupos[i].Code){
              this.Clases[h].Grupos[i].Disabled = false
              break
            }
            if(this.Clases[h].Grupos[i].Cuentas && Code.length>=4){
              for(let j=0; j<this.Clases[h].Grupos[i].Cuentas.length; j++){
                if(Code.length === 4 && Code === this.Clases[h].Grupos[i].Cuentas[j].Code){
                  this.Clases[h].Grupos[i].Cuentas[j].Disabled = false
                  break
                }
                if(this.Clases[h].Grupos[i].Cuentas[j]){
                  for(let k=0; k<this.Clases[h].Grupos[i].Cuentas[j].Subcuentas.length; k++){
                    if(Code === this.Clases[h].Grupos[i].Cuentas[j].Subcuentas[k].Code){
                      this.Clases[h].Grupos[i].Cuentas[j].Subcuentas[k].Disabled = false
                      break
                    }
                  }
                }
              }
            }
          }
        }
      }

      const RemoveCuenta = {
        Id: this.Tercero.Id,
        CuentaId: Cuenta.Id
      }

      this.$apollo.mutate({
        mutation: TERCERO_REMOVE_CUENTA,
        variables: {
          Id: RemoveCuenta.Id,
          CuentaId: RemoveCuenta.CuentaId
        },
        loadingKey: "loading",
        update: (store, { data: res }) => {

          try{
            var data = store.readQuery({
              query: TERCEROS
            })

            let existe = false;
            for (let i=0; i < data.Terceros.length; i++){
              if(data.Terceros[i].Id === res.TerceroRemoveCuenta.Id){
                data.Terceros[i] = res.TerceroRemoveCuenta;
                existe = true
              }
            }

            !existe ? data.Terceros.push(res.TerceroRemoveCuenta) : null;

            store.writeQuery({
              query: TERCEROS,
              data
            }).then( () => {
              this.BuscarClase ()
            })

          } catch (Err) {console.log(Err)}
        }
      })
    }
  }
};


</script>
