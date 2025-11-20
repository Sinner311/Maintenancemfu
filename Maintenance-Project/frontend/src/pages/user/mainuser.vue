<template>
  <div>
    <!-- ส่วนเนื้อหาหลัก -->
    <CRow>
      <CCol md="12">
        <CCard>
          <CCardHeader style="background-color: #8C1007;" class="border-bottom">
            <h4 class="card-title mb-0 d-flex justify-content-between align-items-center text-white">
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
            <!-- Custom Tabs -->
            <div class="custom-tabs">
              <div class="tabs-header">
                <button 
                  :class="['tab-item', { active: activeTab === 'report' }]"
                  @click="activeTab = 'report'"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <span style="font-size: 15px; font-weight: 500;">รายการแจ้งซ่อม</span>
                </button>
                <button 
                  :class="['tab-item', { active: activeTab === 'history' }]"
                  @click="activeTab = 'history'"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                  <span style="font-size: 15px; font-weight: 500;">ประวัติแจ้งซ่อม</span>
                </button>
              </div>
              <div class="tabs-content">
                <div v-show="activeTab === 'report'" class="tab-panel">
                  <Ureportable />
                </div>
                <div v-show="activeTab === 'history'" class="tab-panel">
                  <Uhistorytable />
                </div>
              </div>
            </div>
          </CCardBody>
        </CCard>
        <UReportDetail />
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
import UReportDetail from "../../components/user/UReportDetail";


export default {
  name: "Dashboard",
  components: {
    Ureportable,
    Ureportbutton,
    Uhistorytable,
    SendReport,
    UReportDetail,
  },
  data() {
    return {
      selected: "Month",
      sendReportModal: false,
      activeTab: "report", // เริ่มต้นที่ประวัติแจ้งซ่อม
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

/* Custom Tabs Styling */
.custom-tabs {
  margin-top: 20px;
}

.tabs-header {
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #e9ecef;
  margin-bottom: 20px;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  background: transparent;
  color: #6c757d;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  position: relative;
  bottom: -2px;
}

.tab-item svg {
  transition: all 0.3s ease;
}

.tab-item:hover {
  color: #495057;
  background: #f8f9fa;
}

.tab-item:hover svg {
  transform: translateY(-2px);
}

.tab-item.active {
  color: #cd1212;
  font-weight: 600;
  border-bottom-color: #cd1212;
  background: linear-gradient(to bottom, rgba(0, 123, 255, 0.05), transparent);
}

.tab-item.active svg {
  color: #cd1212;
}

.tabs-content {
  animation: fadeIn 0.3s ease;
}

.tab-panel {
  animation: slideIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>