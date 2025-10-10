<template>
  <CModal
    title="แจ้งซ่อม"
    size="lg"
    :show.sync="localModal"
    @update:show="updateParent"
  >
    <CModalBody class="p-4">
      <CForm>
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
        />
        <CSelect
          label="ประเภทการแจ้งซ่อม:"
          horizontal
          :options="options"
          placeholder="Please select"
        />
        <CTextarea
          label="ปัญหา/งานซ่อม:"
          placeholder="Content..."
          horizontal
          value=""
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
        />
        <CInput
          label="รายละเอียดเพิ่มเติม:"
          description="รายละเอียดสถานที่เพิ่มเติม"
          placeholder="Text"
          horizontal
        />
        <CInput label="วันที่ต้องการให้เริ่มซ่อม:" type="date" horizontal />
        <CInputFile label="ไฟล์แนบ:" horizontal multiple custom class="mb-3" />
      </CForm>
    </CModalBody>
    <template #footer>
        <CButton color="secondary" @click="localModal = false">ยกเลิก</CButton>
        <CButton color="success" @click="sendReport">ส่ง</CButton>
      </template>
  </CModal>
</template>

<script>
export default {
  name: "Forms",
  props: {
    value: { type: Boolean, default: false }, // รับค่าจาก v-model
  },
  data() {
    return {
      localModal: this.value, // ใช้ภายใน component
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
  watch: {
    value(val) {
      this.localModal = val; // อัปเดตค่าภายในเมื่อ parent เปลี่ยน
    },
    localModal(val) {
      this.$emit("input", val); // แจ้ง parent เมื่อ modal ปิด/เปิด
    },
  },
  methods: {
    validator(val) {
      return val ? val.length >= 4 : false;
    },
    sendReport() {
      alert("ส่งใบแจ้งซ่อมเรียบร้อย!");
      this.localModal = false;
    },
    updateParent(val) {
      this.localModal = val;
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

