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

          v-tabs-item(href="#tab-3" @click.native="Reset")
            v-icon assignment_returned
            h6(class="body-2 grey--text text--lighten-4") Ingresos

          v-tabs-item(href="#tab-4" @click.native="Reset")
            v-icon assignment_return
            h6(class="body-2 grey--text text--lighten-4") Gastos

        //- Periodo
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

        //- Saldo Inicial
        v-tabs-content(id="tab-2")
          v-card-text
            v-layout( row wrap)
              v-flex( xs12 )
                v-select( v-model="SaldoInicial.Periodo"
                          :items="Periodos"
                          label="Periodo"
                          item-text="Nombre"
                          return-object
                          dark )

                v-select( v-model="SaldoInicial.Cuenta"
                          :items="Cuentas"
                          label="Cuenta"
                          item-text="Buscar"
                          return-object
                          autocomplete
                          dark )

                v-money( v-model="SaldoInicial.Monto"
                         label="Monto"
                         maskType="currency" dark)


          v-card-actions
            v-spacer
            v-btn( dark @click.native="Reset" ) Cancelar
            v-btn( dark primary @click.native="Cargar" ) Cargar


        //- ingresos
        v-tabs-content(id="tab-3")
          v-card-text
            v-layout( row wrap)
              v-flex( xs12 )
                v-text-field(label="Nombre")

                v-select()


          v-card-actions
            v-spacer
            v-btn( dark @click.native="Reset" ) Cancelar
            v-btn( dark primary @click.native="Cargar" ) Cargar
</template>

<style lang="stylus" scoped>
</style>

<script>
import PERIODOS from '~/queries/Periodos.gql';
import CREATE_PERIODO from '~/queries/CreatePeriodo.gql';
import UPDATE_PERIODO from '~/queries/UpdatePeriodo.gql';

import SALDOS_INICIALES from '~/queries/SaldosIniciales.gql';
import CREATE_SALDO_INICIAL from '~/queries/CreateSaldoInicial.gql';

import CUENTAS from '~/queries/Cuentas.gql';
import VMoney from '~/components/MonetaryInput.vue'

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
      Cuentas: [],
      Periodos: [],
      Periodo: {
        Id: null,
        Nombre: null,
        FechaInicial: null,
        FechaFinal: null,
        Estado: null,
        EstadoOptions: ["Abierto", "Cerrado"],
      },
      SaldoInicial: {
        Periodo: {
          Id: null,
          Nombre: null,
        },
        Cuenta: {
          Id: null,
          Buscar: null,
          Type: null,
          Code: null,
          Name: null,
        },
        Monto: null
      },
      TabActive: null,
      loading: 0
    }
  },
  apollo: {
    OnePeriodos: {
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
    },
    Periodos: {
      query: PERIODOS,
      loadingKey: 'loading',
      update (data) {
        this.Periodos = data.Periodos;
      }
    },
    Cuentas: {
      query: CUENTAS,
      variables:{
        Type: 'Supersolidaria'
      },
      loadingKey: 'loading',
      update (data) {
        this.Cuentas = [];
        for(let i=0; i < data.Cuentas.length; i++){
          let tmp = {
            Id: data.Cuentas[i].Id,
            Buscar: `${data.Cuentas[i].Code} - ${data.Cuentas[i].Name.substr(0, 48)}`,
            Type: data.Cuentas[i].Type,
            Code: data.Cuentas[i].Code,
            Name: data.Cuentas[i].Name,
          }
          this.Cuentas.push(tmp)
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
      this.SaldoInicial.Periodo = {
        Id: null,
        Nombre: null,
      };
      this.SaldoInicial.Cuenta = {
        Id: null,
        Buscar: null,
        Type: null,
        Code: null,
        Name: null,
      };
      this.SaldoInicial.Monto = null;
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
    Cargar () {
      const NewSaldoInicial = {
        PeriodoId: this.SaldoInicial.Periodo.Id,
        CuentaId: this.SaldoInicial.Cuenta.Id,
        Monto: this.SaldoInicial.Monto
      }

      this.Reset();

      this.$apollo.mutate({
        mutation: CREATE_SALDO_INICIAL,
        variables: {
          PeriodoId: NewSaldoInicial.PeriodoId,
          CuentaId: NewSaldoInicial.CuentaId,
          Monto: NewSaldoInicial.Monto
        },
        update: (store, {data: res}) => {
          try{
            var data = store.readQuery({
              query: SALDOS_INICIALES
            });

            data.SaldosIniciales.push (res.SaldoInicial);

            store.writeQuery({
              query: SALDOS_INICIALES,
              data
            })

          }catch(Err){ console.log(Err) }
        }
      })
    }
  },
  components: {VMoney},
}
</script>
