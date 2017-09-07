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
            h5(class="grey--text text--lighten-4") Ente
            
          v-flex( xs12 )
            v-select( v-bind:items="ItemsDocumento"
                      v-model="TipoDocumento"
                      label="Tipo de Documento"
                      item-value="text"
                      dark )

            v-text-field( label="Numero de Documento" v-model="NumeroDocumento" dark )
            
            v-text-field( label="Nombre" v-model="Nombre" dark )
            
            v-text-field( label="Ciudad" v-model="Ciudad" dark )

            v-text-field( label="Dirección" v-model="Direccion" dark )

            v-text-field( label="Teléfono" v-model="Telefono" dark )

            v-select( v-bind:items="ItemsRelacion"
                      v-model="Relacion"
                      label="Relacion"
                      item-value="text"
                      dark )
            
      v-card-actions
        v-spacer
        v-btn( dark @click.native="Reset" ) Cancelar
        v-btn( dark primary @click.native="CreateOrUpdate" ) Guardar
</template>

<script>

import ENTES from '~/queries/Entes.gql'
import ONE_ENTE from '~/queries/OneEnte.gql'
import CREATE_ENTE from '~/queries/CreateEnte.gql'
import UPDATE_ENTE from '~/queries/UpdateEnte.gql'


export default {
  data: () => ({
    snackbar: {
      context: 'secondary',
      mode: '',
      timeout: 6000,
      text: 'Cargando'
    },
    TipoDocumento: '',
    NumeroDocumento: '',
    Nombre: '',
    Ciudad: '',
    Direccion: '',
    Telefono: '',
    Relacion: '',
    ItemsDocumento: [
      {text: 'Nit'},
      {text: 'Cédula'}
    ],
    ItemsRelacion: [
      {text: 'Propia'},
      {text: 'Cliente'}
    ],
    
    loading: 0,
    update: false,
    UpdateDb: false
  }),
  apollo: {
    OneEnte: {
      query: ONE_ENTE,
      variables () {
        return {
          TipoDocumento: this.TipoDocumento,
          NumeroDocumento: this.NumeroDocumento
        }
      },
      loadingKey: 'loading',
      update (data) {
        this.Nombre = data.OneEnte ? data.OneEnte.Nombre : ''
        this.Ciudad = data.OneEnte ? data.OneEnte.Ciudad : ''
        this.Direccion = data.OneEnte ? data.OneEnte.Direccion : ''
        this.Telefono = data.OneEnte ? data.OneEnte.Telefono : ''
        this.Relacion = data.OneEnte ? data.OneEnte.Relacion : ''
        
        this.update = data.OneEnte ? true : false
      }
    }
  },
  beforeMount () {
    if (sessionStorage.getItem('x-access-token') === null || sessionStorage.getItem('x-access-token') === null) {
      this.$router.push('/')
    }
  },
  methods: {
    CreateOrUpdate () {
      if (this.update) {
        this.Update();
      }else{
        this.Create();
      }
    },
    Create () {
      const Ente = {
        TipoDocumento: this.TipoDocumento,
        NumeroDocumento: this.NumeroDocumento,
        Nombre: this.Nombre,
        Ciudad: this.Ciudad,
        Direccion: this.Direccion,
        Telefono: this.Telefono,
        Relacion: this.Relacion
      };
      
      this.Reset ();
      
      this.$apollo.mutate ({
        mutation: CREATE_ENTE,
        variables: {
          TipoDocumento: Ente.TipoDocumento,
          NumeroDocumento: Ente.NumeroDocumento,
          Nombre: Ente.Nombre,
          Ciudad: Ente.Ciudad,
          Direccion: Ente.Direccion,
          Telefono: Ente.Telefono,
          Relacion: Ente.Relacion
      },
      loadingKey: 'loading',
      update: (store, { data: res }) => {
        //console.log(Ente);
        var data = {OneEnte: res.CreateEnte}
        store.writeQuery({ 
          query: ONE_ENTE, 
          variables: {
            TipoDocumento: Ente.TipoDocumento,
            NumeroDocumento: Ente.NumeroDocumento
          },
          data: data
        })
       
        try{
          
          data = store.readQuery({
            query: ENTES
          })
        
          data.Entes.push(res.CreateEnte)
        
          store.writeQuery({
            query: ENTES,
            data: data
          })
          
        } catch (Err) {
          
          
          data = {Entes: []}
        
          data.Entes.push(res.CreateEnte)
        
          store.writeQuery({
            query: ENTES,
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
      const Ente = {
        TipoDocumento: this.TipoDocumento,
        NumeroDocumento: this.NumeroDocumento,
        Nombre: this.Nombre,
        Ciudad: this.Ciudad,
        Direccion: this.Direccion,
        Telefono: this.Telefono,
        Relacion: this.Relacion
      };
      
      this.Reset ();
      
      this.$apollo.mutate ({
        mutation: UPDATE_ENTE,
        variables: {
          TipoDocumento: Ente.TipoDocumento,
          NumeroDocumento: Ente.NumeroDocumento,
          Nombre: Ente.Nombre,
          Ciudad: Ente.Ciudad,
          Direccion: Ente.Direccion,
          Telefono: Ente.Telefono,
          Relacion: Ente.Relacion
      },
      loadingKey: 'loading',
      update: (store, { data: res }) => {
        //console.log(Ente);
        var data = {OneEnte: res.UpdateEnte}
        store.writeQuery({ 
          query: ONE_ENTE, 
          variables: {
            TipoDocumento: Ente.TipoDocumento,
            NumeroDocumento: Ente.NumeroDocumento
          },
          data: data
        })
        
        try {
          
          data = store.readQuery({
            query: ENTES
          })
          
          for (let i=0; i<data.Entes.length; i++) {
            if (data.Entes[i].Id === res.UpdateEnte.Id) {
              data.Entes[i].TipoDocumento = res.UpdateEnte.TipoDocumento
              data.Entes[i].NumeroDocumento = res.UpdateEnte.NumeroDocumento
              data.Entes[i].Nombre = res.UpdateEnte.Nombre
              data.Entes[i].Ciudad = res.UpdateEnte.Ciudad
              data.Entes[i].Direccion = res.UpdateEnte.Direccion
              data.Entes[i].Telefono = res.UpdateEnte.Telefono
              data.Entes[i].Relacion = res.UpdateEnte.Relacion
            }
          }
          
          store.writeQuery({
            query: ENTES,
            data: data
          })
          
        } catch (Err) {
        
          data = {Entes: []}
          
          data.Entes.push(res.UpdateEnte)
          
          store.writeQuery({
            query: ENTES,
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
      this.TipoDocumento = ''
      this.NumeroDocumento = ''
      this.Nombre = ''
      this.Ciudad = ''
      this.Direccion = ''
      this.Telefono = ''
      this.Relacion = ''
    }
  }
};


</script>

<style lang="stylus" scoped>
.alert-especial
  position absolute
    
</style>
