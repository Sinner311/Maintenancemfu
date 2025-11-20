<template>
  <div>
    <!-- ส่วนเนื้อหาหลัก -->
    <CRow>
      <CCol md="12">
        <CCard>
          <CCardHeader>
            <h4 class="card-title mb-0 d-flex justify-content-between align-items-center">
              แจ้งซ่อม
              <button class="report-btn" @click="sendReportModal = true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="12" y1="18" x2="12" y2="12"/>
                  <line x1="9" y1="15" x2="15" y2="15"/>
                </svg>
                <span>แจ้งซ่อม</span>
              </button>
            </h4>
          </CCardHeader>
          <CCardBody>
            <CTabs add-tab-classes="mt-1">
              <CTab>
                <template slot="title">
                  <CIcon name="cil-description" /> รายการแจ้งซ่อม
                </template>
                <Ureportable />
              </CTab>
              <CTab active>
                <template slot="title">
                  <CIcon name="cil-book" /> ประวัติแจ้งซ่อม
                </template>
                <Uhistorytable />
              </CTab>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <SendReport v-model="sendReportModal" />
  </div>
</template>

<script>
import Uhistorytable from "../../components/user/Uhistorytable.vue";
import Ureportable from "../../components/user/Ureportable.vue";
import Ureportbutton from "../../components/user/Ureportbutton.vue";
import SendReport from "../../components/user/SendReport";

export default {
  name: "Dashboard",
  components: {
    Ureportable,
    Ureportbutton,
    Uhistorytable,
    SendReport,
  },
  data() {
    return {
      selected: "Month",
      sendReportModal: false,
    };
  },
  methods: {
    color(value) {
      let $color;
      if (value <= 25) $color = "info";
      else if (value > 25 && value <= 50) $color = "success";
      else if (value > 50 && value <= 75) $color = "warning";
      else if (value > 75 && value <= 100) $color = "danger";
      return $color;
    },
  },
};
</script>

<style scoped>
.report-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 32px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
  transition: all 0.3s ease;
  animation: pulse-glow 2s ease-in-out infinite;
}

.report-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.5);
  animation: none;
}

.report-btn:active {
  transform: translateY(0);
}

.report-btn svg {
  width: 20px;
  height: 20px;
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 6px 30px rgba(16, 185, 129, 0.8), 0 0 50px rgba(16, 185, 129, 0.5);
    transform: scale(1.05);
  }
}
</style>