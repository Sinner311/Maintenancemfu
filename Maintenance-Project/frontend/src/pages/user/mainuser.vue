<template>
  <div>
    <!-- ส่วนเนื้อหาหลัก -->
    <CRow>
      <CCol md="12">
        <CCard>
          <CCardHeader>
            <h4 class="card-title mb-0">รายการแจ้งซ่อมของฉัน</h4>
          </CCardHeader>
          <Ureportable />
        </CCard>
      </CCol>
    </CRow>

    <CRow>
      <CCol md="12">
        <CCard>
          <CCardHeader>
            <h4 class="card-title mb-0">ประวัติแจ้งซ่อมของฉัน</h4>
          </CCardHeader>
          <Uhistorytable />
        </CCard>
      </CCol>
    </CRow>

    <button class="sticky-btn" @click="sendReportModal = true">
       + แจ้งซ่อม 
    </button>
    <SendReport v-model="sendReportModal" />
  </div>
</template>

<script>
import Uhistorytable from '../../components/user/Uhistorytable.vue';
import Ureportable from '../../components/user/Ureportable.vue';
import Ureportbutton from '../../components/user/Ureportbutton.vue';
import SendReport from '../../components/user/SendReport';

export default {
  name: 'Dashboard',
  components: {
    Ureportable,
    Ureportbutton,
    Uhistorytable,
    SendReport
  },
  data() {
    return {
      selected: 'Month',
      sendReportModal: false,
    }
  },
  methods: {
    color(value) {
      let $color
      if (value <= 25) $color = 'info'
      else if (value > 25 && value <= 50) $color = 'success'
      else if (value > 50 && value <= 75) $color = 'warning'
      else if (value > 75 && value <= 100) $color = 'danger'
      return $color
    }
  }
}
</script>

<style scoped>
/* Sticky Button*/
.sticky-btn {
  position: fixed;
  bottom: 35px;
  right: 35px;
  background-color: #2eb85c;
  color: white;
  border: none;
  border-radius: 20px;
  border: 2px solid #000000;
  padding: 18px 36px;
  font-size: 20px;          
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sticky-btn:hover {
  background-color: #24994a;
  transform: translateY(-3px);
}
</style>
