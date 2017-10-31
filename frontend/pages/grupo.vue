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
            v-icon(ma) group
            |  Grupo
      v-card-text
        v-layout( row wrap)
          v-flex( xs12 )
            v-text-field( label="Nombre" v-model="Name" dark )

      v-card-actions
        v-spacer
        v-btn( dark @click.native="Reset" ) Cancelar
        v-btn( dark primary @click.native="CreateOrUpdate" ) Guardar
</template>

<script>

import GROUPS from '~/queries/Groups.gql'
import CREATE_GROUP from '~/queries/CreateGroup.gql'
import UPDATE_GROUP from '~/queries/UpdateGroup.gql'

export default {
  data: () => ({
    snackbar: {
      context: 'secondary',
      mode: '',
      timeout: 6000,
      text: 'Cargando'
    },
    Id: null,
    Name: null,
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
    Groups: {
      query: GROUPS,
      variables () {
        return {
          Name: this.Name
        }
      },
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        this.LoadUi(data.Groups)
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
      const Group = {
        Name: this.Name
      };

      this.Reset ();

      this.$apollo.mutate ({
        mutation: CREATE_GROUP,
        variables: {
          Name: Group.Name
      },
      loadingKey: 'loading',
      update: (store, { data: res }) => {
        //console.log(Ente);
        try{
          var data = store.readQuery({
            query: GROUPS,
          })

          data.Groups.push(res.CreateGroup)

          store.writeQuery({
            query: GROUPS,
            data: data
          })

        } catch (Err) {

          var data = {Groups: []}

          data.Groups.push(res.CreateGroup)

          store.writeQuery({
            query: GROUPS,
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
      //console.log(this.Password)
      const Group = {
        Id: this.Id,
        Name: this.Name,
      };

      this.Reset ();

      this.$apollo.mutate ({
        mutation: UPDATE_GROUP,
        variables: {
          Id: Group.Id,
          Name: Group.Name
        },
        loadingKey: 'loading',
        update: (store, { data: res }) => {
          //console.log(Ente);
          try {
            var data = store.readQuery({
              query: GROUPS,
            })

            for (let i=0; i<data.Groups.length; i++) {
              if (data.Groups[i].Id === res.UpdateGroup.Id) {
                data.Groups[i].Name = res.UpdateGroup.Name
              }
            }

            store.writeQuery({
              query: GROUPS,
              data: data
            })

          } catch (Err) {

            var data = {Groups: []}

            data.Groups.push(res.UpdateGroup)

            store.writeQuery({
              query: GROUPS,
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
      this.Name = null
    },
    LoadUi (Groups) {
      if( Groups.length === 0 ) {
        this.Id = null
      }

      for (let i=0; i<Groups.length; i++) {
        if ( this.Name === Groups[i].Name ) {
          this.Id = Groups[i].Id
          this.Name = Groups[i].Name
          break
        }else{
          this.Id = null
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
