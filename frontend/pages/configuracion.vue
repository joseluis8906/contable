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
          h5(class="grey--text text--lighten-4 text-xs-center" style="font-weight: bold")
            v-icon settings
            |  Configuración
      v-tabs(dark fixed icons grow v-model="TabActive")
        v-tabs-bar(slot="activators" class="light-blue darken-4")
          v-tabs-slider(class="success")
          v-tabs-item(href="#tab-1" @click.native="Reset")
            v-icon timeline
            h6(class="body-2 grey--text text--lighten-4") Periodo

          v-tabs-item(href="#tab-2" @click.native="Reset")
            v-icon(fa) usd
            h6(class="body-2 grey--text text--lighten-4") Saldo Inicial

        v-tabs-content(id="tab-1")
          v-card-text
            v-layout( row wrap)
              v-flex( xs12 )

                v-text-field( v-model="Periodo.Nombre"
                              label="Nombre"
                              dark )

                v-menu( lazy
                        :close-on-content-click="true"
                        v-model="Menus.Menu1"
                        transition="scale-transition"
                        offset-y
                        full-width
                        :nudge-left="40"
                        max-width="290px" )

                  v-text-field( slot="activator"
                                label="Fecha Inicial"
                                v-model="Periodo.FechaInicial"
                                readonly
                                dark )

                  v-date-picker( :months="months"
                                 :days="days"
                                 first-day-of-week="Dom"
                                 :header-date-format="({ monthName, year }) => { return `${monthName} ${year}` }"
                                 v-model="Periodo.FechaInicial"
                                 autosave
                                 dark )
                   template( scope="{ save, cancel }" )
                     v-card-actions
                       v-btn( dark warning @click.native="Periodo.FechaInicial=null" ) Limpiar


                v-menu( lazy
                       :close-on-content-click="true"
                       v-model="Menus.Menu2"
                       transition="scale-transition"
                       offset-y
                       full-width
                       :nudge-left="40"
                       max-width="290px" )

                 v-text-field( slot="activator"
                               label="Fecha Final"
                               v-model="Periodo.FechaFinal"
                               readonly
                               dark )

                 v-date-picker( :months="months"
                                :days="days"
                                first-day-of-week="Dom"
                                :header-date-format="({ monthName, year }) => { return `${monthName} ${year}` }"
                                v-model="Periodo.FechaFinal"
                                autosave
                                dark )
                  template( scope="{ save, cancel }" )
                    v-card-actions
                      v-btn( dark warning @click.native="Periodo.FechaFinal=null" ) Limpiar

                v-select( v-model="Periodo.Estado"
                          :items="Periodo.EstadoOptions"
                          label="Estado"
                          :disabled="Periodo.Estado === 'Cerrado' ? true : false"
                          dark )

          v-card-actions
            v-spacer
            v-btn( dark @click.native="Reset" ) Cancelar
            v-btn( dark primary @click.native="Guardar" ) Guardar

        v-tabs-content(id="tab-2")
          v-card-text
            v-layout( row wrap)
              v-flex( xs12 )

</template>

<style lang="stylus" scoped>
</style>

<script>
import PERIODOS from '~/queries/Periodos.gql';
import CREATE_PERIODO from '~/queries/CreatePeriodo.gql';
import UPDATE_PERIODO from '~/queries/UpdatePeriodo.gql';

export default {
  data () {
    return {
      snackbar: {
        context: 'secondary',
        mode: '',
        timeout: 6000,
        text: 'Cargando'
      },
      Menus: {
        Menu1: false,
        Menu2: false,
      },
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
        'Diciembre'
      ],
      days: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
      Periodo: {
        Id: null,
        Nombre: null,
        FechaInicial: null,
        FechaFinal: null,
        Estado: null,
        EstadoOptions: ["Abierto", "Cerrado"],
      },
      TabActive: null,
      loading: 0
    }
  },
  apollo: {
    Periodos: {
      query: PERIODOS,
      variables () {
        return {
          Nombre: this.Periodo.Nombre
        }
      },
      loadingKey: 'loading',
      update (data) {
        if(data.Periodos.length  > 0){
          this.Periodo.Id = data.Periodos[0].Id;
          this.Periodo.FechaInicial = data.Periodos[0].FechaInicial;
          this.Periodo.FechaFinal = data.Periodos[0].FechaFinal;
          this.Periodo.Estado = data.Periodos[0].Estado;
        }
        else{
          this.Periodo.Id = null;
          this.Periodo.FechaInicial = null;
          this.Periodo.FechaFinal = null;
          this.Periodo.Estado = null;
        }
      }
    }
  },
  methods: {
    Reset () {
      this.Periodo.Id = null;
      this.Periodo.Nombre = null;
      this.Periodo.FechaInicial = null;
      this.Periodo.FechaFinal = null;
      this.Periodo.Estado = null;
    },
    Guardar () {

      const NewPeriodo = {
        Id: this.Periodo.Id,
        Nombre: this.Periodo.Nombre,
        FechaInicial: this.Periodo.FechaInicial,
        FechaFinal: this.Periodo.FechaFinal,
        Estado: this.Periodo.Estado,
      }

      this.Reset ();

      if(NewPeriodo.Id === null){

        this.$apollo.mutate({
          mutation: CREATE_PERIODO,
          variables: {
            Nombre: NewPeriodo.Nombre,
            FechaInicial: NewPeriodo.FechaInicial,
            FechaFinal: NewPeriodo.FechaFinal,
            Estado: NewPeriodo.Estado,
          },
          update: (store, { data: res }) => {

            try {

              var data = store.readQuery({
                query: PERIODOS
              });

              data.Periodos.push(res.CreatePeriodo);

              store.writeQuery({
                query: PERIODOS,
                data
              })

            }catch (Err) { console.log(Err) };
          }
        });

      }
      else {

        this.$apollo.mutate({
          mutation: UPDATE_PERIODO,
          variables: {
            Id: NewPeriodo.Id,
            Nombre: NewPeriodo.Nombre,
            FechaInicial: NewPeriodo.FechaInicial,
            FechaFinal: NewPeriodo.FechaFinal,
            Estado: NewPeriodo.Estado,
          },
          update: (store, { data: res }) => {

            try {

              var data = store.readQuery({
                query: PERIODOS
              });

              for(let i=0; i < data.Periodos.length; i++){
                if(res.UpdatePeriodo.Id === data.Periodos[i].Id){
                  data.Periodos[i] = res.UpdatePeriodo;
                }
              }

              store.writeQuery({
                query: PERIODOS,
                data
              })

            }catch (Err) { console.log(Err) };
          }
        });

      }
    },
  },
}
</script>