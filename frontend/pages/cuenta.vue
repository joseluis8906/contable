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
            v-btn( dark primary @click.native="Guardar" ) Guardar

        v-tabs-content(id="tab-2")
          v-card-text
            v-layout( row wrap)
              v-flex( xs12 )

                v-expansion-panel
                  v-expansion-panel-content(v-for="(Clase, cl) in Clases" :key="cl" @mousedown.native.stop="BuscarGrupo(Clase)")
                    div(slot="header") {{ Clase.Code }}
                    div <v-btn icon small class="grey--text text--lighten-4" @click.native.stop="Editar(Clase)"><v-icon>edit</v-icon></v-btn><span class="body-2">{{ Clase.Name }}</span>

                    v-expansion-panel-content(v-for="(Grupo, g) in Clase.Grupos" :key="g" @mousedown.native.stop="BuscarCuenta(Grupo)" class="teal darken-3" style="border-bottom: 1px solid #00493c !important")
                      div(slot="header") {{ Grupo.Code }}
                      div <v-btn icon small class="grey--text text--lighten-4" @click.native.stop="Editar(Grupo)"><v-icon>edit</v-icon></v-btn><span class="body-2">{{ Grupo.Name }}</span>

                      v-expansion-panel-content(v-for="(Cuenta, c) in Grupo.Cuentas" :key="c" @mousedown.native.stop="BuscarSubcuenta(Cuenta)" class="lime darken-3" style="border-bottom: 1px solid #6e6d04 !important")
                        div(slot="header" ) {{ Cuenta.Code }}
                        div <v-btn icon small class="grey--text text--lighten-4" @click.native.stop="Editar(Cuenta)"><v-icon>edit</v-icon></v-btn><span class="body-2">{{ Cuenta.Name }}</span>

                        v-expansion-panel-content(v-for="(Subcuenta, s) in Cuenta.Subcuentas" :key="s" @mousedown.native.stop="BuscarAuxiliar(Subcuenta)" class="blue darken-3" style="border-bottom: 1px solid #0545a0 !important")
                          div(slot="header" ) {{ Subcuenta.Code }}
                          div <v-btn  icon small class="grey--text text--lighten-4" @click.native.stop="Editar(Subcuenta)"><v-icon>edit</v-icon></v-btn><span class="body-2">{{ Subcuenta.Name }}</span>

                          v-expansion-panel-content(v-for="(Auxiliar, a) in Subcuenta.Auxiliares" :key="a" class="brown darken-3" style="border-bottom: 1px solid #6e6d04 !important")
                            div(slot="header" ) {{ Auxiliar.Code }}
                            div <v-btn icon small class="grey--text text--lighten-4" @click.native.stop="Editar(Auxiliar)"><v-icon>edit</v-icon></v-btn><span class="body-2">{{ Auxiliar.Name }}</span>

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
    Clases: [],
    TabActive: null,
    Clase: null,
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
      this.BuscarClase ()
    })
  },
  apollo: {
    Cuentas: {
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
            this.Cuenta.Id = data.Cuentas[i].Id;
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
            Subcuentas: []
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
            Auxiliares: []
          }
          Cuenta.Subcuentas.push(tmp)
        }

      });

    },
    BuscarAuxiliar (Subcuenta) {

      if(this.OldCodes === Subcuenta.Code){return}

      this.OldCode = Subcuenta.Code;

      this.$apollo.query({
        query: CUENTASLIKE,
        variables: {
          Type: 'Supersolidaria',
          Code: Subcuenta.Code + "%",
          Length: 8
        },
        loadingKey: 'loading',
        fetchPolicy: 'network-only',

      }).then(res => {

        Subcuenta.Auxiliares = []

        for(let i = 0; i<res.data.CuentasLike.length; i++){
          let tmp = {
            Id: res.data.CuentasLike[i].Id,
            Type: res.data.CuentasLike[i].Type,
            Code: res.data.CuentasLike[i].Code,
            Name: res.data.CuentasLike[i].Name,
          }
          Subcuenta.Auxiliares.push(tmp)
        }

      });

    },
    Editar (Item) {
      this.TabActive = 'tab-1'
      this.Cuenta.Code = Item.Code
      this.Clases = []
    },
    Guardar () {
      const Cuenta = {
        Id: this.Cuenta.Id,
        Type: 'Supersolidaria',
        Code: this.Cuenta.Code,
        Name: this.Cuenta.Name,
      }

      this.Reset ();

      if(!Cuenta.Id){

        this.$apollo.mutate ({
          mutation: CREATE_CUENTA,
          variables: {
            Type: 'Supersolidaria',
            Code: Cuenta.Code,
            Name: Cuenta.Name,
          },
          update: (store, { data: res }) => {
            try{
              const data = store.readQuery ({
                query: CUENTAS,
              });

              data.Cuentas.push(res.CreateCuenta);

              store.writeQuery({
                query: CUENTAS,
                data
              })

            }
            catch(Err) {
              console.log(Err)
            }

          }
        }).then(() => {}).catch(Err => {
          console.log(Err)
        });

      }
      else{

        this.$apollo.mutate ({
          mutation: UPDATE_CUENTA,
          variables: {
            Id: Cuenta.Id,
            Code: Cuenta.Code,
            Name: Cuenta.Name,
          },
          update: (store, { data: res }) => {

            try{
              const data = store.readQuery ({
                query: CUENTAS,
              });

              for (let i=0; i<data.Cuentas.length; i++) {
                if (data.Cuentas[i].Id === res.UpdateCuenta.Id) {
                  data.Cuentas[i] = res.UpdateCuenta
                }
              }

              store.writeQuery({
                query: CUENTAS,
                data
              })

            }
            catch(Err) {
              console.log(Err)
            }

          }
        }).then(() => {}).catch(Err => {
          console.log(Err)
        });
      }

    },
    Reset () {
      this.Cuenta.Code = null
      this.BuscarClase ()
      this.OldCodes=[]
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
