<template>
  <CSidebar
      class="bg-style1 sidebar-below-header"
      :minimize="minimize"
      unfoldable
      :show="show"
      @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >

    <CRenderFunction flat :contentToRender="navs"/>

  </CSidebar>
</template>

<script>
export default {
  name: 'TheSidebar',
  components: {},


  // nav,
  computed: {
    show() {
      return this.$store.state.sidebarShow
    },
    minimize() {
      return this.$store.state.sidebarMinimize
    }
  },
  data: function () {
    return {
      navs: [{
        _name: 'CSidebarNav',
        _children: [
          
          {
            _name: 'CSidebarNavItem',
            name: 'test',
            to: '/mockup/supervisor/test',
            icon: 'cil-window-restore'
          },
          {
            _name: 'CSidebarNavItem',
            name: 'จัดการข้อมูลพนักงานช่าง',
            to: '/mockup/supervisor/UsersListSUP',
            icon: 'cil-people'
          },
          
        ]
      }]
    }
  }
}
</script>

<style scoped>
.bg-style1{
  background: linear-gradient(30deg,#FEC260 0%,#8c1515 60%);
}
</style>

