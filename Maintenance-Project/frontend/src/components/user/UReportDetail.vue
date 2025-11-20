<template>
  <CCard>
    <CCardHeader style="background-color: #8c1007" class="border-bottom">
      <h4 class="text-white card-title mb-0">
        <CIcon name="cil-description" size="xl" /> รายละเอียดใบแจ้งซ่อม
      </h4>
    </CCardHeader>
    <CCardBody class="p-4">
      <template>
        <div class="status-tracker">
          <div class="progress-line"></div>
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="step mt-1"
            :class="{ active: index <= currentStep }"
          >
            <div class="dot"></div>
            <div class="label">{{ step }}</div>
          </div>
        </div>
      </template>
      <CForm>
        <div class="d-flex align-items-center mb-4">
          <div class="icon-box bg-gradient-primary mr-3">
            <span style="font-size: 1.5rem">👤</span>
          </div>
          <div>
            <h5 class="m-0 font-weight-bold">ข้อมูลผู้แจ้ง</h5>
            <small class="text-muted">รายละเอียดผู้ติดต่อ</small>
          </div>
        </div>

        <div class="mb-4">
          <CRow>
            <CCol sm="4">
              <label class="lbl">ชื่อผู้แจ้ง</label>
              <CInput value="นายสมสมสม ชายชายชาย" class="mb-0" plaintext readonly
            /></CCol>
            <CCol sm="4">
              <label class="lbl">เบอร์โทรศัพท์</label>
              <CInput value="090-000-0000" class="mb-0" plaintext readonly />
            </CCol>
          </CRow>
        </div>

        <hr class="my-4 border-dashed" />

        <div class="d-flex align-items-center mb-4">
          <div class="icon-box bg-gradient-warning mr-3">
            <span style="font-size: 1.5rem">🛠️</span>
          </div>
          <div>
            <h5 class="m-0 font-weight-bold">รายละเอียดการซ่อม</h5>
            <small class="text-muted">ระบุปัญหาและสถานที่</small>
          </div>
        </div>

        <div class="mb-3">
          <label class="lbl">ประเภทการแจ้งซ่อม</label>
          <multiselect
            v-model="multi"
            :options="multiselectOptions"
            :multiple="true"
            label="label"
            track-by="label"
            placeholder="เลือกประเภทงานซ่อม"
            class="rounded-input"
          />
        </div>


        <hr class="my-4 border-dashed" />

        <CInput
          label="หมายเลขใบแจ้งซ่อม:"
          value="20250922-ELEC-001"
          horizontal
          plaintext
        />
        <CInput
          label="วันที่/เวลาแจ้งซ่อม:"
          value="22/09/2025 10:00 น."
          horizontal
          plaintext
        />
        <CInput label="ชื่อผู้แจ้ง:" value="นายสม ชาย" horizontal plaintext />
        <CInput
          label="เบอร์โทรผู้แจ้ง:"
          value="090-000-0000"
          horizontal
          plaintext
        />
        <CSelect
          label="หน่วยงานที่ต้องการแจ้งซ่อม:"
          horizontal
          :options="options"
          placeholder="Please select"
          disabled
        />
        <CSelect
          label="ประเภทการแจ้งซ่อม:"
          horizontal
          :options="options"
          placeholder="Please select"
          disabled
        />
        <CTextarea
          label="ปัญหา/งานซ่อม:"
          placeholder="Content..."
          horizontal
          value="-"
          plaintext
          rows="3"
        />
        <template>
          <CRow form class="form-group">
            <CCol sm="3"> พื้นที่ปฏิบัติงาน: </CCol>
            <CInputRadioGroup
              :options="[
                { label: 'ในอาคาร', value: 'ในอาคาร' },
                { label: 'นอกอาคาร', value: 'นอกอาคาร' },
              ]"
              inline
            />
          </CRow>
        </template>
        <CSelect
          label="อาคาร:"
          horizontal
          :options="options"
          placeholder="Please select"
          disabled
        />
        <CInput
          label="รายละเอียดเพิ่มเติม:"
          description="รายละเอียดสถานที่เพิ่มเติม"
          placeholder="Text"
          horizontal
        />
        <CInput label="วันที่ต้องการให้เริ่มซ่อม:" type="date" horizontal />
        <CInputFile label="ไฟล์แนบ:" horizontal multiple custom class="mb-3" />
        <CInput
          label="วันที่/เวลารับงาน:"
          value="23/09/2025 10:00 น."
          horizontal
          plaintext
        />
        <CInput
          label="ผู้รับผิดชอบงาน:"
          value="นายพง กร"
          horizontal
          plaintext
        />
        <CInput label="ผู้ดำเนินการ:" value="นายอะ ทิต" horizontal plaintext />
        <CInput
          label="วันที่/เวลาดำเนินการ:"
          value="24/09/2025 11:00 น."
          horizontal
          plaintext
        />
        <CInput
          label="วันที่/เวลาสำเร็จ:"
          value="24/09/2025 12:00 น."
          horizontal
          plaintext
        />
        <CTextarea
          label="หมายเหตุ:"
          placeholder="Content..."
          horizontal
          value="-"
          plaintext
          rows="3"
        />
        <CInputFile label="ไฟล์แนบ:" horizontal multiple custom class="mb-3" />
        <CInput label="สถานะ:" value="เสร็จสิ้น" horizontal plaintext />
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
</style>

