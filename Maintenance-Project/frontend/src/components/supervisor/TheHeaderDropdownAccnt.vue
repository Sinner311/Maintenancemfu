<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0 mt-2"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img src="@/assets/avatars/1.jpg"  class="c-avatar-img" style="height: 100%"/>
        </div>
      </CHeaderNavLink>
    </template>


    <CDropdownItem>
      <CIcon name="cil-lock-locked" size="xl" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'TheHeaderDropdownAccnt',

  data () {
    return {
      defualt:"https://demo.zdrive.fund/assets/images/brand/logo.png",
      itemsCount: 42,
      cardCollapse: true,
      accountCollapse: false
    }
  },

  mounted () {

  },

  created () {
    this.$store.dispatch("profile/onGetPrfile")

  },
  beforeDestroy () {

  },

  methods: {
    replaceByDefault(e) {
      e.target.src = "https://demo.zdrive.fund/assets/images/brand/logo.png"
    },


    switAccount(subAccount){
      this.$store.commit("profile/setSubAccount",subAccount)
    },

    createSubAccount(){
      this.accountCollapse = !this.accountCollapse;
      this.$store.dispatch("profile/onCreateSubAccounts")
    },

    onAccounts(){
      // this.$store.commit("profile/showProfile", true)
      this.$store.commit("auth/isSignIn", true)
    }
  },

  computed:{
    ...mapGetters({
      subAccount:'profile/objSubAccount',
      profile:'profile/objProfile',
    })
  },

  watch: {

  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
  .c-header-nav .dropdown-item{
    min-width: 250px;
  }
</style>
