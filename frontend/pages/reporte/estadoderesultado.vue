<template lang="pug">
v-container(pt-0 pr-0 pb-0 pl-0 mt-0 mb-0)
  page(v-bind:size="page.Size" v-bind:layout="page.Layout" v-for="(page, i) in pages" :key="i")
    h6(class="title text-xs-center mt-5") ASOCIACIÓN DE HOGARES COMUNITARIOS GAMARRA TRADICIONAL
    h5(class="headline text-xs-center") NIT 800.203.503-6

    h6(class="title text-xs-center mt-5") ESTADO DE RESULTADO CORRESPONDIENTE AL CONTRATO
    h6(class="title text-xs-center mb-5") DEL 01 DE ENERO AL 31 DE DICIEMBRE

    table(style="width: 80%; height: auto; margin-left: auto; margin-right: auto;" class="mt-5" )
      thead
      tbody
        tr(style="font-weight: bold !important; border-bottom: 1px solid black" class="subheading")
          td(style="width: 55%;") 4 - TOTAL INGRESOS
          td(style="width: 2.5%;" class="text-xs-center") {{ false ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right")
          td(style="width: 2.5%;" class="text-xs-center") {{ true ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right") 677.503.206

        tr(style="font-weight: bold;")
          td(style="width: 55%;") 41 - INGRESOS POR VENTA DE BIENES Y DE SERVICIO
          td(style="width: 2.5%;" class="text-xs-center") {{ false ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right")
          td(style="width: 2.5%;" class="text-xs-center") {{ true ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right") 677.503.206

        tr
          td(style="width: 55%;") 4165 - INGRESOS SOCIALES Y DE SALUD
          td(style="width: 2.5%;" class="text-xs-center") {{ true ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right") 677.503.206
          td(style="width: 2.5%;" class="text-xs-center") {{ false ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right")

        br

        tr(style="font-weight: bold;")
          td(style="width: 50%;") 42 - NO OPERACIONALES
          td(style="width: 2.5%;" class="text-xs-center") {{ false ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right")
          td(style="width: 2.5%;" class="text-xs-center") {{ true ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right") 8


        tr
          td(style="width: 55%;") 4225 - RECUPERACIÓN DETERIORO
          td(style="width: 2.5%;" class="text-xs-center") {{ true ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right") 8
          td(style="width: 2.5%;" class="text-xs-center") {{ false ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right")

        br
        br

        tr(style="font-weight: bold !important; border-bottom: 1px solid black" class="subheading")
          td(style="width: 55%;") 5 - TOTAL GASTOS
          td(style="width: 2.5%;" class="text-xs-center") {{ false ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right")
          td(style="width: 2.5%;" class="text-xs-center") {{ true ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right") 658.916.670

        tr(style="font-weight: bold;")
          td(style="width: 55%;") 51 - GASTOS DE ADMINISTRACIÓN
          td(style="width: 2.5%;" class="text-xs-center") {{ false ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right")
          td(style="width: 2.5%;" class="text-xs-center") {{ true ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right") 658.916.670

        tr
          td(style="width: 55%;") 5105 - BENEFICIO A EMPLEADOS
          td(style="width: 2.5%;" class="text-xs-center") {{ true ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right") 396.299.444
          td(style="width: 2.5%;" class="text-xs-center") {{ false ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right")

        tr
          td(style="width: 55%;" class="pl-3") 510503 - SUELDOS
          td(style="width: 2.5%;" class="text-xs-center") {{ true ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right") 396.299.444
          td(style="width: 2.5%;" class="text-xs-center") {{ false ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right")

        br

        tr
          td(style="width: 55%;") 5110 - GASTOS GENERALES
          td(style="width: 2.5%;" class="text-xs-center") {{ true ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right") 9.525.690
          td(style="width: 2.5%;" class="text-xs-center") {{ false ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right")

        tr
          td(style="width: 55%;" class="pl-3") 511001 - HONORARIOS
          td(style="width: 2.5%;" class="text-xs-center") {{ true ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right") 396.299.444
          td(style="width: 2.5%;" class="text-xs-center") {{ false ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right")

        tr
          td(style="width: 55%;" class="pl-3") 511012 - SERVICIOS PUBLICOS
          td(style="width: 2.5%;" class="text-xs-center") {{ true ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right") 396.299.444
          td(style="width: 2.5%;" class="text-xs-center") {{ false ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right")

        tr
          td(style="width: 55%;" class="pl-3") 511033 - ADECUACIÓN E INSTALACIÓN
          td(style="width: 2.5%;" class="text-xs-center") {{ true ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right") 396.299.444
          td(style="width: 2.5%;" class="text-xs-center") {{ false ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right")

        tr
          td(style="width: 55%;" class="pl-3") 511012 - OTROS
          td(style="width: 2.5%;" class="text-xs-center") {{ true ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right") 396.299.444
          td(style="width: 2.5%;" class="text-xs-center") {{ false ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right")

        br

        tr
          td(style="width: 55%;") 5125 - DEPRECIACIÓN PROPIEDAD, PLANTA Y EQUIPO
          td(style="width: 2.5%;" class="text-xs-center") {{ true ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right") 9.525.690
          td(style="width: 2.5%;" class="text-xs-center") {{ false ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right")

        tr
          td(style="width: 55%;" class="pl-3") 512510 - MUEBLES Y EQUIPO DE OFICINA
          td(style="width: 2.5%;" class="text-xs-center") {{ true ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right") 7.582.357
          td(style="width: 2.5%;" class="text-xs-center") {{ false ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right")

        tr
          td(style="width: 55%;" class="pl-3") 512515 - EQUIPO DE COMPUTO Y COMUNICACIÓN
          td(style="width: 2.5%;" class="text-xs-center") {{ true ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right") 1.943.333
          td(style="width: 2.5%;" class="text-xs-center") {{ false ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right")

        br

        tr(style="font-weight: bold;")
          td(style="width: 55%;") 52 - OTROS GASTOS
          td(style="width: 2.5%;" class="text-xs-center") {{ false ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right")
          td(style="width: 2.5%;" class="text-xs-center") {{ true ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right") 658.916.670

        tr
          td(style="width: 55%;") 5110 - GASTOS FINANCIEROS
          td(style="width: 2.5%;" class="text-xs-center") {{ true ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right") 9.525.690
          td(style="width: 2.5%;" class="text-xs-center") {{ false ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right")

        br

        tr(style="border: 1px black; border-style: solid none double none")
          td UTILIDAD DEL EJERCICIO
          td(style="width: 2.5%;" class="text-xs-center") {{ false ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right")
          td(style="width: 2.5%;" class="text-xs-center") {{ true ? '$' : '' }}
          td(style="width: 20%;" class="text-xs-right") 18.000.000


</template>

<style lang="stylus" scoped>
@page
  size letter portrait
  margin 0mm
  padding 0mm

table
  font-size: 9pt
  border-spacing 0px
  border-collapse collapse

th.borderer, td.borderer
  border 1px solid black

th
  height 9mm
  line-height 10pt

td
  height 5mm
  padding-left 1mm
  padding-right 1mm

.lado
  height 4mm
  font-size 8pt
  padding-left 1mm
  padding-right 1mm
  text-align right
</style>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      pages: [{Size: 'Letter', Layout: 'Portrait', Items: []}],
      loading: 0
    }
  },
  layout: 'report',
  fetch ({ store }) {
    store.commit('reports/changeTitle', 'Estado De Resultado')
  },
  computed: {
    Fecha () {
      return this.$store.state.estadoderesultado.Fecha
    },
    FechaInicial () {
      return this.$store.state.estadoderesultado.FechaInicial
    },
    FechaFinal () {
      return this.$store.state.estadoderesultado.FechaFinal
    }
  },
  apollo: {
  },
  methods: {
    MaxLength (value) {
      if(value){
        //console.log(value.length)
        return value.length >= 26 ? value.substr(0, 20)+'...'+value.substr(-6, 6) : value;
      }
    }
  }
}
</script>
