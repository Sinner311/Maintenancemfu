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
          // {
          //   _name: 'CSidebarNavTitle',
          //   _children: ['Admin']
          // },
          {
            _name: 'CSidebarNavItem',
            name: 'งานซ่อม',
            to: '/mockup/admin/reportlist',
            icon: 'cil-window-restore'
          },
          {
            _name: 'CSidebarNavItem',
            name: 'จัดการข้อมูล เจ้าหน้าที่',
            to: '/mockup/admin/UsersList',
            icon: 'cil-people'
          },
          {
            _name: 'CSidebarNavItem',
            name: 'จัดการข้อมูล ประเภทงาน',
            to: '/mockup/admin/job-type',
            icon: 'cil-briefcase'
          },
                    {
            _name: 'CSidebarNavItem',
            name: 'จัดการข้อมูล อาคาร',
            to: '/mockup/admin/building',
            icon: 'cil-building'
          },
        ]
      }]
    }
  }
}
</script>

<style scoped>
.bg-style1{
  background: linear-gradient(30deg,#FFF0C4 0%,#145654 40%);
}

</style>

