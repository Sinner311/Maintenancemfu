<template>
  <CCardBody>
    <CDataTable
      :items="ticketsData"
      :fields="fields"
      table-filter
      items-per-page-select
      :items-per-page="5"
      hover
      pagination
    >
      <!-- วันที่ -->
      <template #reported_datetime="{ item }">
        <td>
          <div>{{ item.reported_at_time }} น.</div>
          <div class="small">{{ item.reported_at_date }}</div>
        </td>
      </template>

      <!-- รายละเอียด -->
      <template #issue_user="{ item }">
        <td>
          <div>{{ item.category }} | {{ item.issue_detail }}</div>
          <div class="small text-muted">ผู้แจ้ง: {{ item.username }}</div>
        </td>
      </template>

      <!-- สถานะ -->
      <template #status="{ item }">
        <td>
          <CBadge :color="getBadge(item.status)">
            {{ item.status }}
          </CBadge>
        </td>
      </template>

      <!-- ปุ่มติดตาม -->
      <template #show_details="{ item , index }">
        <td class="text-center">
          <button
            class="btn btn-outline-primary btn-sm"
            @click="toggleDetails(index)"
          >
            ติดตาม
          </button>
        </td>
      </template>

      <!-- รายละเอียดเพิ่มเติม -->
      <template #details="{ item, index }">
        <tr v-if="details.includes(index)">
          <td colspan="5" class="p-0">
            <CCollapse :show="details.includes(index)">
              <div class="p-4 bg-light">
                
                <!-- 🔹 รายละเอียดการแจ้งซ่อม ด้านบน Timeline -->
                <div class="mb-4">
                  <h6 class="fw-bold mb-2 text-primary">รายละเอียดการแจ้งซ่อม</h6>
                  <div><strong>Ticket ID:</strong> {{ item.id + 1 }}</div>
                  <div><strong>เลขที่แจ้งซ่อม:</strong> {{ item.ticket_number }}</div>
                  <div><strong>ประเภท:</strong> {{ item.category }}</div>
                  <div><strong>รายละเอียด:</strong> {{ item.issue_detail }}</div>
                  <div><strong>ผู้แจ้ง:</strong> {{ item.username }}</div>
                  <div><strong>วันที่แจ้ง:</strong> {{ item.reported_at_date }} {{ item.reported_at_time }} น.</div>
                  <div><strong>สถานะ:</strong> {{ item.status }}</div>
                </div>

                <!-- 🔹 Timeline -->
                <ul class="timeline">
                  <li>
                    <div class="timeline-date text-success">
                      17 มกราคม 2568 <br />12.30 pm
                    </div>
                    <div class="timeline-content text-success fw-bold">
                      มอบหมายงานให้ช่างเรียบร้อย
                    </div>
                  </li>
                  <li><div class="timeline-content">ตรวจเช็คหน้างานเรียบร้อย</div></li>
                  <li><div class="timeline-content">กำลังดำเนินการซ่อมแซม</div></li>
                  <li><div class="timeline-content">งานซ่อมล่าช้า</div></li>
                  <li><div class="timeline-content">งานเสร็จสิ้น</div></li>
                </ul>

              </div>
            </CCollapse>
          </td>
        </tr>
      </template>
    </CDataTable>
  </CCardBody>
</template>

<script>
import ticketsData from "../data/TicketsData";

const fields = [
  { key: "ticket_number", label: "เลขที่แจ้งซ่อม", _style: "width:20%" },
  { key: "reported_datetime", label: "วันที่แจ้ง", _style: "width:10%;" },
  { key: "issue_user", label: "รายละเอียด", _style: "width:60%;" },
  { key: "status", label: "สถานะ", _style: "width:10%;" },
  { key: "show_details", label: "", _style: "width:5%;" },
];

export default {
  name: "AdvancedTables",
  data() {
    return {
      ticketsData: ticketsData.map((item, id) => ({
        ...item,
        id,
        issue_user: `${item.category} ${item.issue_detail} ${item.username}`,
      })),
      fields,
      details: [], // เก็บ index ของแถวที่ถูกเปิด
    };
  },
  methods: {
    toggleDetails(index) {
      const position = this.details.indexOf(index);
      position !== -1 ? this.details.splice(position, 1) : this.details.push(index);
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
/* Timeline Style */
.timeline {
  position: relative;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-left: 50%;
  transform: translateX(-50%);
}

.timeline::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #666;
  transform: translateX(-50%);
  border-radius: 10px;
}

.timeline li {
  position: relative;
  margin: 50px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.timeline li::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  width: 18px;
  height: 18px;
  background: #666;
  border-radius: 50%;
  transform: translate(-50%, 0);
  z-index: 2;
  border: 2px solid white;
}

.timeline li:first-child::before {
  background: #007bff;
}

.timeline-date {
  width: 45%;
  text-align: right;
  font-size: 14px;
  color: #2eb85c;
  font-weight: 600;
  padding-right: 20px;
}

.timeline-content {
  width: 45%;
  text-align: left;
  padding-left: 20px;
  color: #333;
}
</style>
