<template>
  <div>
    <!-- ส่วนเนื้อหาหลัก -->
    <CRow>
      <CCol md="12">
        <CCard>
          <CCardHeader style="background-color: #8C1007;" class="border-bottom d-flex justify-content-between align-items-center">
            <h4 class="card-title mb-0 text-white">
              <CIcon name="cil-window-restore" size="xl"/> แจ้งซ่อม
            </h4>
            <button class="report-btn" @click="sendReportModal = true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="12" y1="18" x2="12" y2="12"/>
                <line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
              <span>แจ้งซ่อม</span>
            </button>
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
                  <Ureportable @show-detail="handleShowDetail" />
                </div>
                <div v-show="activeTab === 'history'" class="tab-panel">
                  <Uhistorytable @show-detail="handleShowDetail" />
                </div>
              </div>
            </div>
          </CCardBody>
        </CCard>

        <!-- Report Detail Card - แสดงเมื่อมีการเลือก -->
        <CCard v-if="selectedReport" class="mt-4">
          <CCardHeader style="background-color: #8c1007" class="border-bottom d-flex justify-content-between align-items-center">
            <h4 class="text-white card-title mb-0">
              <CIcon name="cil-description" size="xl" /> รายละเอียดใบแจ้งซ่อม
            </h4>
            <CButton color="light" size="sm" @click="closeDetail">
              <CIcon name="cil-x" />
            </CButton>
          </CCardHeader>
          
          <CCardBody class="p-4">
            <!-- Timeline Work Order -->
            <div class="work-order-timeline">
              <div class="timeline-line" :style="getTimelineStyle()"></div>
              
              <div :class="['timeline-step', { active: selectedReport.currentStep >= 1 }]">
                <div class="step-circle"></div>
                <div class="step-label">
                  <div class="step-status">{{ selectedReport.currentStep >= 1 ? 'รับเรื่องแล้ว' : 'N/A' }}</div>
                  <div class="step-role">User/ผู้แจ้ง</div>
                </div>
              </div>

              <div :class="['timeline-step', { active: selectedReport.currentStep >= 2 }]">
                <div class="step-circle"></div>
                <div class="step-label">
                  <div class="step-status">{{ selectedReport.currentStep >= 2 ? 'รับงานแล้ว' : 'N/A' }}</div>
                  <div class="step-role">Supervisor/ผู้รับเรื่อง</div>
                </div>
              </div>

              <div :class="['timeline-step', { active: selectedReport.currentStep >= 3 }]">
                <div class="step-circle"></div>
                <div class="step-label">
                  <div class="step-status">{{ selectedReport.currentStep >= 3 ? 'กำลังดำเนินการ' : 'N/A' }}</div>
                  <div class="step-role">Technician/ช่างซ่อม</div>
                </div>
              </div>

              <div :class="['timeline-step', { active: selectedReport.currentStep >= 4 }]">
                <div class="step-circle"></div>
                <div class="step-label">
                  <div class="step-status">{{ selectedReport.currentStep >= 4 ? 'เสร็จสิ้น' : 'N/A' }}</div>
                  <div class="step-role">เสร็จสิ้น</div>
                </div>
              </div>
            </div>

            <!-- รายละเอียด -->
            <CForm class="mx-5 my-2">
              <!-- ส่วนของผู้ขอใช้ใบงาน -->
              <div class="d-flex align-items-center mb-4">
                <div class="icon-box mr-3" style="background-color: #fff0c4">
                  <span style="font-size: 1.5rem">🛠️</span>
                </div>
                <div>
                  <h5 class="m-0 font-weight-bold">ส่วนของผู้ขอใช้ใบงาน</h5>
                  <small class="text-muted">รายละเอียดผู้แจ้ง ปัญหาและสถานที่</small>
                </div>
              </div>

              <div class="mb-4">
                <CRow>
                  <CCol sm="4">
                    <label class="lbl">วันที่/เวลา แจ้ง:</label>
                    <CInput :value="`${selectedReport.reported_at_date} ${selectedReport.reported_at_time} น.`" plaintext readonly />
                  </CCol>
                  <CCol sm="4">
                    <label class="lbl">ชื่อผู้แจ้ง:</label>
                    <CInput :value="selectedReport.username" plaintext readonly />
                  </CCol>
                  <CCol sm="4">
                    <label class="lbl">เลขที่แจ้งซ่อม:</label>
                    <CInput :value="selectedReport.ticket_number" plaintext readonly />
                  </CCol>
                </CRow>
                <CRow class="mt-3">
                  <CCol sm="6">
                    <label class="lbl">ประเภทงาน:</label>
                    <CInput :value="selectedReport.category" plaintext readonly />
                  </CCol>
                  <CCol sm="6">
                    <label class="lbl">สถานะ:</label>
                    <CBadge :color="getBadge(selectedReport.status)" style="font-size: 14px; padding: 6px 12px;">
                      {{ selectedReport.status }}
                    </CBadge>
                  </CCol>
                </CRow>
                <CRow class="mt-3">
                  <CCol>
                    <label class="lbl">รายละเอียดปัญหา:</label>
                    <CInput :value="selectedReport.issue_detail" plaintext readonly />
                  </CCol>
                </CRow>
              </div>

              <hr class="my-4 border-dashed" />

              <!-- ปุ่มกลับ -->
              <div class="text-center">
                <CButton color="secondary" @click="closeDetail" size="lg">
                  ปิดรายละเอียด
                </CButton>
              </div>
            </CForm>
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
import SendReport from "../../components/user/SendReport";

export default {
  name: "Dashboard",
  components: {
    Ureportable,
    Uhistorytable,
    SendReport,
  },
  data() {
    return {
      sendReportModal: false,
      activeTab: "report",
      selectedReport: null, // เก็บข้อมูลรายการที่เลือก
    };
  },
  methods: {
    handleShowDetail(item) {
      // กำหนด currentStep ตามสถานะ
      let currentStep = 1;
      switch(item.status) {
        case 'รอดำเนินการ':
          currentStep = 1;
          break;
        case 'รับเรื่องแล้ว':
          currentStep = 2;
          break;
        case 'กำลังดำเนินการ':
          currentStep = 3;
          break;
        case 'เสร็จสิ้น':
          currentStep = 4;
          break;
      }
      
      this.selectedReport = {
        ...item,
        currentStep
      };
      
      // Scroll to detail
      this.$nextTick(() => {
        const detailCard = document.querySelector('.mt-4');
        if (detailCard) {
          detailCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    },
    
    closeDetail() {
      this.selectedReport = null;
    },
    
    getTimelineStyle() {
      const progress = ((this.selectedReport.currentStep - 1) / 3) * 100;
      return {
        background: `linear-gradient(to right, #007bff ${progress}%, #e0e0e0 ${progress}%)`
      };
    },
    
    getBadge(status) {
      switch (status) {
        case "กำลังดำเนินการ":
          return "success";
        case "เสร็จสิ้น":
          return "secondary";
        case "รับเรื่องแล้ว":
          return "warning";
        case "รอดำเนินการ":
          return "danger";
        default:
          return "primary";
      }
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
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  position: relative;
  bottom: -2px;
}

.tab-item:hover {
  color: #495057;
  background: #f8f9fa;
}

.tab-item.active {
  color: #cd1212;
  font-weight: 600;
  border-bottom-color: #cd1212;
}

.lbl {
  font-weight: 600;
  color: #495057;
  display: block;
  margin-bottom: 4px;
}

.icon-box {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

/* Timeline Styles */
.work-order-timeline {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px 20px;
  margin: 30px 0;
}

.timeline-line {
  position: absolute;
  top: 50px;
  left: 12.5%;
  right: 12.5%;
  height: 3px;
  z-index: 0;
  transition: background 0.3s ease;
}

.timeline-step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  z-index: 1;
}

.step-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #fff;
  border: 4px solid #e0e0e0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

.timeline-step.active .step-circle {
  background: #007bff;
  border-color: #fff;
  box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.2);
}

.step-label {
  text-align: center;
  max-width: 120px;
}

.step-status {
  font-size: 12px;
  font-weight: 600;
  color: #6c757d;
  margin-bottom: 4px;
}

.timeline-step.active .step-status {
  color: #007bff;
  font-weight: 700;
}

.step-role {
  font-size: 11px;
  color: #6c757d;
  line-height: 1.3;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.mt-4 {
  animation: fadeIn 0.3s ease;
}
</style>