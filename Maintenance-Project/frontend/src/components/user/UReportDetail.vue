<template>
  <CCard>
    <CCardHeader style="background-color: #8c1007" class="border-bottom">
      <h4 class="text-white card-title mb-0">
        <CIcon name="cil-description" size="xl" /> รายละเอียดใบแจ้งซ่อม
      </h4>
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
      <CForm class="mx-5 my-2">
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
              <CRow class="mb-4">
                <CCol>
                  <label class="lbl">วันที่/เวลา แจ้ง:</label>
                  <CInput
                    value="20/09/2025 10:00 น."
                    class="mb-0"
                    plaintext
                    readonly
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <label class="lbl">เบอร์โทรศัพท์:</label>
                  <CInput
                    value="090-000-0000"
                    class="mb-0"
                    plaintext
                    readonly
                  />
                </CCol>
              </CRow>
            </CCol>
            <CCol sm="4">
              <CRow class="mb-4">
                <CCol>
                  <label class="lbl">ชื่อผู้แจ้ง:</label>
                  <CInput
                    value="นายสมสมสม ชายชายชาย"
                    class="mb-0"
                    plaintext
                    readonly
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <label class="lbl">หน่วยงาน:</label>
                  <CInput value="ไฟฟ้า" class="mb-0" plaintext readonly />
                </CCol>
              </CRow>
            </CCol>
            <CCol sm="4">
              <CRow class="mb-4">
                <CCol>
                  <label class="lbl">สถานที่/ตึก:</label>
                  <CInput value="C2" class="mb-0" plaintext readonly />
                </CCol>
              </CRow>
              <CRow class="mb-4">
                <CCol>
                  <label class="lbl">หมายเลขห้อง:</label>
                  <CInput value="C2-204" class="mb-0" plaintext readonly />
                </CCol>
              </CRow>
            </CCol>
          </CRow>
          <CRow class="mb-4">
            <CCol>
              <label class="lbl">ประเภทงาน:</label>
              <CInput value="ปลั๊กไฟชำรุด" class="mb-0" plaintext readonly />
            </CCol>
          </CRow>
          <CRow class="mb-4">
            <CCol>
              <label class="lbl">รายละเอียดปัญหา:</label>
              <CInput value="ปลั๊กไฟชำรุด" class="mb-0" plaintext readonly />
            </CCol>
          </CRow>
        </div>

        <hr class="my-4 border-dashed" />

        <div class="d-flex align-items-center mb-4">
          <div class="icon-box mr-3" style="background-color: #fff0c4">
            <span style="font-size: 1.5rem">🏢</span>
          </div>
          <div>
            <h5 class="m-0 font-weight-bold">ส่วนของผู้รับใบงาน</h5>
          </div>
        </div>
        <CRow>
          <CCol sm="4">
            <CRow>
              <CCol>
                <label class="lbl">วันที่/เวลา รับใบงาน:</label>
                <CInput
                  value="20/09/2025 10:00 น."
                  class="mb-0"
                  plaintext
                  readonly
                />
              </CCol>
            </CRow>
          </CCol>
          <CCol sm="4">
            <CRow>
              <CCol>
                <label class="lbl">ชื่อผู้รับผิดชอบงาน:</label>
                <CInput value="นายพง กร" class="mb-0" plaintext readonly />
              </CCol>
            </CRow>
          </CCol>
          <CCol sm="4">
            <CRow>
              <CCol>
                <label class="lbl">ชื่อผู้ดำเนินการ:</label>
                <CInput value="นายอะ ทิต" class="mb-0" plaintext readonly />
              </CCol>
            </CRow>
          </CCol>
        </CRow>

        <hr class="my-4 border-dashed" />

        <div class="d-flex align-items-center mb-4">
          <div class="icon-box mr-3" style="background-color: #fff0c4">
            <span style="font-size: 1.5rem">🧑‍🔧</span>
          </div>
          <div>
            <h5 class="m-0 font-weight-bold">ส่วนของช่างผู้รับงาน</h5>
            <small class="text-muted">รายละเอียดงานซ่อม</small>
          </div>
        </div>


        <CRow class="mb-4">
          <CCol sm="4">
            <CRow>
              <CCol>
                <label class="lbl">วันที่/เวลา รับงาน:</label>
                <CInput
                  value="20/09/2025 10:00 น."
                  class="mb-0"
                  plaintext
                  readonly
                />
              </CCol>
            </CRow>
          </CCol>
          <CCol sm="4">
            <CRow>
              <CCol>
                <label class="lbl">วันที่/เวลา เริ่มงาน:</label>
                <CInput
                  value="20/09/2025 10:00 น."
                  class="mb-0"
                  plaintext
                  readonly
                />
              </CCol>
            </CRow>
          </CCol>
          <CCol sm="4">
            <CRow>
              <CCol>
                <label class="lbl">วันที่/เวลา เสร็จงาน:</label>
                <CInput
                  value="20/09/2025 10:00 น."
                  class="mb-0"
                  plaintext
                  readonly
                />
              </CCol>
            </CRow>
          </CCol>
        </CRow>
          <CRow class="mb-4">
            <CCol>
              <label class="lbl">รายละเอียดผลการซ่อม:</label>
              <CInput value="ปลั๊กไฟชำรุด" class="mb-0" plaintext readonly />
            </CCol>
          </CRow>
        <hr class="my-4 border-dashed" />

      </CForm>
      <div class="ml-auto mr-3 mb-3 col-20">
        <CButton
          block
          color="info"
          shape="pill"
          @click="$router.push('/mockup/admin/reportlist')"
          size="lg"
          >กลับไปหน้าหลัก</CButton
        >
      </div>
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  name: "Forms",
  data() {
    return {
      steps: ["รับเรื่องแล้ว", "รอดำเนินการ", "กำลังดำเนินการ", "เสร็จสิ้น"],
      currentStep: 3,
      selected: [], // Must be an array reference!
      show: true,
      horizontal: { label: "col-3", input: "col-9" },
      options: ["Option 1", "Option 2", "Option 3"],
      selectOptions: [
        "Option 1",
        "Option 2",
        "Option 3",
        {
          value: ["some value", "another value"],
          label: "Selected option",
        },
      ],
      selectedOption: ["some value", "another value"],

      formCollapsed: true,
      checkboxNames: [
        "Checkboxes",
        "Inline Checkboxes",
        "Checkboxes - custom",
        "Inline Checkboxes - custom",
      ],
      radioNames: [
        "Radios",
        "Inline Radios",
        "Radios - custom",
        "Inline Radios - custom",
      ],
    };
  },
  methods: {
    validator(val) {
      return val ? val.length >= 4 : false;
    },
    getTimelineStyle() {
      const progress = ((this.selectedReport.currentStep - 1) / 3) * 100;
      return {
        background: `linear-gradient(to right, #007bff ${progress}%, #e0e0e0 ${progress}%)`
      };
    },
  },
};
</script>

<style scoped>
.status-tracker {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0;
}

/* เส้นหลัก */
.progress-line {
  position: absolute;
  top: 12px;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #dcdcdc;
  z-index: 1;
}

.col-20 {
  width: 20%;
}
/* จุดแต่ละขั้น */
.step {
  position: relative;
  text-align: center;
  flex: 1;
  z-index: 2;
}

.dot {
  width: 20px;
  height: 20px;
  margin: 0 auto;
  border-radius: 50%;
  background-color: #dcdcdc;
  border: 2px solid #dcdcdc;
}

/* ข้อความใต้จุด */
.label {
  margin-top: 8px;
  font-size: 13px;
  white-space: nowrap;
}

/* จุดที่ active หรือผ่านแล้ว */
.step.active .dot {
  background-color: #20a8d8; /* สี info */
  border-color: #20a8d8;
}

/* เพิ่มเส้นไฮไลท์ตามสถานะปัจจุบัน */
.status-tracker::before {
  content: "";
  position: absolute;
  top: 12px;
  left: 0;
  height: 4px;
  background-color: #20a8d8;
  width: calc((100% / 3) * var(--progress));
  z-index: 1;
}

.lbl {
  font-weight: 600;
  color: #495057;
  display: block;
  margin-bottom: 4px;
}
</style>

<style scoped>
/* Work Order Timeline - แนวนอน */
.work-order-timeline {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px 20px;
  margin-top: 30px;
}

.timeline-line {
  position: absolute;
  top: 50px;
  left: 12.5%;
  right: 12.5%;
  height: 3px;
  background: linear-gradient(to right, #007bff 25%, #e0e0e0 25%);
  z-index: 0;
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

/* Responsive */
@media (max-width: 768px) {
  .work-order-timeline {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }

  .timeline-line {
    left: 20px;
    top: 0;
    bottom: 0;
    width: 3px;
    height: auto;
    background: linear-gradient(to bottom, #007bff 25%, #e0e0e0 25%);
  }

  .timeline-step {
    flex-direction: row;
    width: 100%;
    margin-bottom: 30px;
  }

  .step-circle {
    margin-right: 15px;
    margin-bottom: 0;
  }

  .step-label {
    text-align: left;
    max-width: none;
  }
}
</style>
