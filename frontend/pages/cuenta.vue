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

  v-snackbar( :timeout="$store.state.notificaciones.Timeout"
              :success="$store.state.notificaciones.Context === 'success'"
              :info="$store.state.notificaciones.Context === 'info'"
              :warning="$store.state.notificaciones.Context === 'warning'"
              :error="$store.state.notificaciones.Context === 'error'"
              :primary="$store.state.notificaciones.Context === 'primary'"
              :secondary="$store.state.notificaciones.Context === 'secondary'"
              :multi-line="$store.state.notificaciones.Mode === 'multi-line'"
              :vertical="$store.state.notificaciones.Mode === 'vertical'"
              :top="true"
              v-model="$store.state.notificaciones.State" )
      h6(class="grey--text text--lighten-4 mb-0") {{ $store.state.notificaciones.Msg }}
      v-icon {{ $store.state.notificaciones.Icon }}

  v-flex( xs12 mt-3 )
    v-card
      v-layout(row wrap pt-3 light-blue)
        v-flex( xs12 )
          h5(class="grey--text text--lighten-4 text-xs-center bold")
            v-icon(ma) assignment
            |  Cuenta

      v-tabs(dark fixed icons centered v-model="TabActive")
        v-tabs-bar(slot="activators" class="light-blue darken-4")
          v-tabs-slider(class="success")
          v-tabs-item(href="#tab-1" @click.native="Reset")
            v-icon create
            h6(class="body-2 grey--text text--lighten-4") Editar

          v-tabs-item(href="#tab-2" @click.native="Reset")
            v-icon search
            h6(class="body-2 grey--text text--lighten-4") Listar

        v-tabs-content(id="tab-1")
          v-card-text
            v-layout( row wrap)
              v-flex( xs12 )
                v-text-field( label="Codigo" v-model="Cuenta.Code" dark )
                v-text-field( label="Nombre" v-model="Cuenta.Name" dark )

          v-card-actions
            v-spacer
            v-btn( dark @click.native="Reset" ) Cancelar
            v-btn( dark primary @click.native="CreateOrUpdate" ) Guardar

        v-tabs-content(id="tab-2")
          v-card-text
            v-layout( row wrap)
              v-flex( xs12 )
                v-expansion-panel
                  v-expansion-panel-content(v-for="(ItemClase, cl) in ItemsClase" :key="cl" @mousedown.native.stop="Buscar(ItemClase.Code)")
                    div(slot="header") <v-icon @click.stop="Editar(ItemClase)" class="editover">edit</v-icon> {{ ItemClase.Code }} - {{ ItemClase.Name }}
                    div(slot="default")
                      v-expansion-panel
                        v-expansion-panel-content(v-for="(ItemGrupo, g) in ItemsGrupo" :key="g" @mousedown.native.stop="Buscar(ItemGrupo.Code)" class="teal darken-3" style="border-bottom: 1px solid #00493c !important")
                          div(slot="header") <v-icon @click.stop="Editar(ItemGrupo)" class="editover">edit</v-icon> {{ ItemGrupo.Code }} - {{ ItemGrupo.Name }}
                          div(slot="default")
                            v-expansion-panel
                              v-expansion-panel-content(v-for="(ItemCuenta, c) in ItemsCuenta" :key="c" @mousedown.native.stop="Buscar(ItemCuenta.Code)" class="blue darken-3" style="border-bottom: 1px solid #0545a0 !important")
                                div(slot="header" ) <v-icon @click.stop="Editar(ItemCuenta)" class="editover">edit</v-icon> {{ ItemCuenta.Code }} - {{ ItemCuenta.Name }}
                                div(slot="default")
                                  v-expansion-panel
                                    v-expansion-panel-content(v-for="(ItemSubcuenta, s) in ItemsSubcuenta" :key="s" class="lime darken-3" style="border-bottom: 1px solid #6e6d04 !important")
                                      div(slot="header" ) <v-icon @click.stop="Editar(ItemSubcuenta)" class="editover">edit</v-icon> {{ ItemSubcuenta.Code }} - {{ ItemSubcuenta.Name }}
                                      div(slot="default")
</template>

<script>

import CUENTAS from '~/queries/Cuentas.gql'
import CREATE_CUENTA from '~/queries/CreateCuenta.gql'
import UPDATE_CUENTA from '~/queries/UpdateCuenta.gql'

import CUENTASLIKE from '~/queries/CuentasLike.gql'

export default {
  data: () => ({
    snackbar: {
      context: 'primary',
      mode: '',
      timeout: 3000,
      text: 'Cargando'
    },
    Cuenta: {
      Id: null,
      Type: null,
      Code: null,
      Name: null
    },
    OldCode: null,
    Code: null,
    Length: null,
    ItemsClase: [],
    ItemsGrupo: [],
    ItemsCuenta: [],
    ItemsSubcuenta: [],
    TabActive: null,
    loading: 0
  }),
  beforeMount () {
    if (sessionStorage.getItem('x-access-token') === null || sessionStorage.getItem('x-access-token') === null) {
      this.$router.push('/')
    } else {
      var Roles = JSON.parse(sessionStorage.getItem('x-access-roles'))
      this.$store.commit('security/AddRoles', Roles);
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.BuscarInicial()
    })
  },
  apollo: {
    /*Cuentas: {
      query: CUENTAS,
      variables () {
        return {
          Type: 'Supersolidaria',
          Code: this.Cuenta.Code
        }
      },
      loadingKey: 'loading',
      update (data) {
        if(data.Cuentas.length > 0){
          for(let i=0; i<data.Cuentas.length; i++){
            this.Cuenta.Name = data.Cuentas[i].Name;
            this.Cuenta.Type = data.Cuentas[i].Type;
          }
        }
        else {
          this.Cuenta.Id = null;
          this.Cuenta.Type = null;
          this.Cuenta.Name = null;
        }
      }
    },*/
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
      let Length = this.Code.length;

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

        default:
          this.Length = 1
      }

      this.Code = this.Code + '%';

      if(this.OldCode === this.Code){
        return
      }else {
        //console.log('viejo: '+this.OldCode+' nuevo: '+this.Code)
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
        console.log()
        let length = res.data.CuentasLike.length > 0 ? res.data.CuentasLike[0].Code.length : 0

        switch (length) {
          case 2:
            this.ItemsGrupo = []
            this.ItemsCuenta = []
            this.ItemsSubcuenta = []
            break;

          case 4:
            this.ItemsCuenta = []
            this.ItemsSubcuenta = []
            break;

          case 6:
            this.ItemsSubcuenta = []
            break;

          default:
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
      })

    },
    Editar (Item) {
      this.TabActive = 'tab-1'
      this.Cuenta = Item
    },
    Reset () {

    }
  }
};


</script>

<style lang="stylus" scoped>
h5.bold
  font-weight bold

.alert-especial
  position absolute

.editover:hover
  color: orange

</style>
