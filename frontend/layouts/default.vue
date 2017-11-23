<template lang="pug">
doctype html
v-app(id="sandbox" :dark="dark" :light="!dark" standalone)
  v-navigation-drawer(v-model="primaryDrawer.model" persistent='persistent')
    v-list(dense)
      template(v-for="(item, i) in items")
        v-list-tile(:key="i" nuxt link :to="item.to")
          v-list-tile-action
            v-icon {{ item.icon }}

          v-list-tile-content
            v-list-tile-title {{ item.text }}

      v-list-tile(@click.native="logout")
        v-list-tile-action
          v-icon exit_to_app

        v-list-tile-content
          v-list-tile-title Salir

  v-toolbar(fixed)
    v-toolbar-side-icon(@click.native.stop="primaryDrawer.model = !primaryDrawer.model" v-if="primaryDrawer.type !== 'permanent'")
    v-toolbar-title {{ title }}

  main
    v-container(fluid mb-5 pt-0)
      nuxt

  v-footer(fixed)
    <span> © {{ new Date().getFullYear() }} </span> Jose Luis Cáceres Escudero

</template>

<script>
  export default {
    data: () => {
      return {
        dark: true,
        primaryDrawer: {
          model: true,
          type: 'persistent',
          clipped: false,
          floating: true,
          mini: false
        },
        footer: {
          fixed: true
        },
        items: [
          { icon: 'person', text: 'Usuario', to: '/usuario' },
          { icon: 'group', text: 'Grupo', to: '/grupo' },
          { icon: 'group_work', text: 'Tercero', to: '/tercero' },
          { icon: 'assignment', text: 'Cuenta', to: '/cuenta' },
          { icon: 'assignment_returned', text: 'Ingreso', to: '/ingreso' },
          { icon: 'assignment_late', text: 'Causación', to: '/causacion' },
          { icon: 'assignment_return', text: 'Pago', to: '/pago' },
          { icon: 'perm_contact_calendar', text: 'Nómina', to: '/nomina' },
          { icon: 'book', text: 'Informe', to: '/informe' },
          { icon: 'settings', text: 'Configuración', to: '/configuracion' },
        ],
        title: 'Administración Contable'
      }
    },
    methods: {
      logout () {
        sessionStorage.removeItem("x-access-token")
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="stylus" scoped>

#sandbox
  border 1px solid rgba(0, 0, 0, .25)
  overflow hidden

</style>
