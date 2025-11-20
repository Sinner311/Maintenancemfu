<template>
  <CHeader with-subheader class="fixed-top">
   <CToggler
     in-header
     class="ml-3 d-lg-none"
     @click="$store.commit('toggleSidebarMobile')"
   />
   <CToggler
     in-header
     class="ml-3 d-md-down-none"
     @click="$store.commit('toggleSidebarDesktop')"
   />
    <CHeaderBrand class="ml-4 mr-auto" to="/mockup/supervisor">
          <CRow >
            <img class="pt-2 pb-2" src="@/assets/logo.svg" height="60px">
            <CCol class="text-black">
              <p class="font-weight-bold mb-0 mt-2 h5">MFU</p>
              <p class="font-weight-bold">Dashboard System</p>
            </CCol>
          </CRow>
    </CHeaderBrand>
    

    <CHeaderNav>
     <TheHeaderDropdownNotif/>
      <TheHeaderDropdownAccnt class="pr-3"/>
    </CHeaderNav>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'

import {mapGetters} from "vuex";

export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt,
  },
}
</script>


<style>
/* ให้ sidebar เริ่มใต้ header */
.sidebar-below-header {
  top: 66px !important; /* ความสูง CHeader + SubHeader (ปรับตามจริง) */
}


</style>