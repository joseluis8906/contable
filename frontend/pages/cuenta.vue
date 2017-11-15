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
              v-text-field( label="Tipo" v-model="Cuenta.Type" dark )

        v-card-actions
          v-spacer
          v-btn( dark @click.native="Reset" ) Cancelar
          v-btn( dark primary @click.native="CreateOrUpdate" ) Guardar

      v-tabs-content(id="tab-2")
        v-card-text
          v-layout( row wrap)
            v-flex( xs12 )
</template>

<script>

import CUENTAS from '~/queries/Cuentas.gql'
import CREATE_CUENTA from '~/queries/CreateCuenta.gql'
import UPDATE_CUENTA from '~/queries/UpdateCuenta.gql'

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
  }
};


</script>

<style lang="stylus" scoped>
h5.bold
  font-weight bold

.alert-especial
  position absolute

</style>
