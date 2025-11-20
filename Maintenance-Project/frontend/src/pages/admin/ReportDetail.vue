<template>
  <CCard>
    <CCardHeader style="background-color: #8C1007;" class="border-bottom">
      <h4 class="text-white card-title mb-0"><CIcon name="cil-description" size="xl"/> รายละเอียดใบแจ้งซ่อม</h4>
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
        <CInput
          label="ชื่อผู้แจ้ง:"
          value="นายสม ชาย"
          horizontal
          plaintext
        />
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
                <CInputFile
          label="ไฟล์แนบ:"
          horizontal
          multiple
          custom
          class="mb-3"
        />
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
        <CInput
          label="ผู้ดำเนินการ:"
          value="นายอะ ทิต"
          horizontal
          plaintext
        />
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
                <CInputFile
          label="ไฟล์แนบ:"
          horizontal
          multiple
          custom
          class="mb-3"
        />
                <CInput
          label="สถานะ:"
          value="เสร็จสิ้น"
          horizontal
          plaintext
        />
       
      </CForm>
          <div class="ml-auto mr-3 mb-3 col-20">
      <CButton block color="info" shape="pill" @click="$router.push('/mockup/admin/reportlist')" size="lg"
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
      currentStep: 3 ,
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




<!-- 
 <template> 
    <CCard>
        <CCardHeader>
            <h4 class="card-title mb-0">รายละเอียดใบแจ้งซ่อม</h4>
        </CCardHeader>
  <div class="p-4">

    <p><strong>Ticket ID:</strong> {{ ticket_id }}</p>

    <div v-if="ticket">
      <p><strong>เลขที่แจ้งซ่อม:</strong> {{ ticket.ticket_number }}</p>
      <p><strong>ประเภท:</strong> {{ ticket.category }}</p>
      <p><strong>รายละเอียด:</strong> {{ ticket.issue_detail }}</p>
      <p><strong>ผู้แจ้ง:</strong> {{ ticket.username }}</p>
      <p><strong>สถานะ:</strong> {{ ticket.status }}</p>
      <p><strong>วันที่แจ้ง:</strong> {{ ticket.reported_at_date }} {{ ticket.reported_at_time }}</p>
    </div>
    <div v-else>
      <p class="text-muted">ไม่พบข้อมูลใบแจ้งซ่อมนี้</p>
    </div>

    <CButton color="secondary" @click="$router.push('/mockup/admin/reportlist')">
      กลับไปหน้ารายการแจ้งซ่อม
    </CButton>
  </div>
  </CCard>
</template>

<script>
import ticketsData from '../../components/data/TicketsData';

export default {
  name: 'TicketDetail',
  props: ['ticket_id'],
  data() {
    return {
      ticket: null,
    };
  },
  created() {
    // หาข้อมูลจาก ticketsData
    this.ticket = ticketsData.find(t => t.ticket_id == this.ticket_id);
  },
};
</script>
-->
