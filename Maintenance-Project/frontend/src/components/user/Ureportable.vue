<template>
  <CCardBody>
    <CDataTable
      class="custom-pagination"
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
          <div>{{ item.reported_at_date }} {{ item.reported_at_time }} น.</div>
        </td>
      </template>

      <!-- รายละเอียด -->
      <template #issue_user="{ item }">
        <td>
          <div>{{ item.category }} | {{ item.issue_detail }}</div>
        </td>
      </template>

      <!-- สถานะ -->
      <template #status="{ item }">
        <td>
          <CBadge
            :style="{
              backgroundColor: getBadge(item.status),
            }"
            class="text-white"
          >
            {{ item.status }}
          </CBadge>
        </td>
      </template>

      <!-- ปุ่มติดตาม -->
      <template #show_details="{ item, index }">
        <td class="text-center">
          <button
            class="btn btn-outline-primary btn-sm"
            @click="showDetail(item)"
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
                <!-- Header Section -->
                <div
                  class="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom"
                >
                  <h5 class="mb-0 fw-bold">ใบแจ้งซ่อม / ใบงาน (WORK ORDER)</h5>
                  <div
                    class="badge bg-primary text-white px-3 py-2"
                    style="font-size: 14px"
                  >
                    หมายเลขในงาน<br />{{ item.ticket_number }}
                  </div>
                </div>

                <!-- Timeline Work Order (แนวนอน) -->
                <div class="work-order-timeline">
                  <div class="timeline-line"></div>

                  <!-- Step 1: User/ผู้แจ้ง -->
                  <div class="timeline-step active">
                    <div class="step-circle"></div>
                    <div class="step-label">
                      <div class="step-status">กำลังดำเนินการ</div>
                      <div class="step-role">User/ผู้แจ้ง</div>
                    </div>
                  </div>

                  <!-- Step 2: Supervisor/ผู้รับเรื่อง -->
                  <div class="timeline-step">
                    <div class="step-circle"></div>
                    <div class="step-label">
                      <div class="step-status">N/A</div>
                      <div class="step-role">Supervisor/ผู้รับเรื่อง</div>
                    </div>
                  </div>

                  <!-- Step 3: Technician/ช่างซ่อม -->
                  <div class="timeline-step">
                    <div class="step-circle"></div>
                    <div class="step-label">
                      <div class="step-status">N/A</div>
                      <div class="step-role">Technician/ช่างซ่อม</div>
                    </div>
                  </div>

                  <!-- Step 4: เสร็จสิ้น -->
                  <div class="timeline-step">
                    <div class="step-circle"></div>
                    <div class="step-label">
                      <div class="step-status">N/A</div>
                      <div class="step-role">เสร็จสิ้น</div>
                    </div>
                  </div>
                </div>

                <!-- รายละเอียดการแจ้งซ่อม -->
                <div class="mb-4 p-3 bg-white rounded">
                  <h6
                    class="mb-3"
                    style="font-size: 14px; font-weight: 600; color: #6c757d"
                  >
                    รายละเอียดการแจ้งซ่อม
                  </h6>
                  <div class="row" style="font-size: 13px">
                    <div class="col-md-6 mb-2">
                      <span class="text-muted">Ticket ID:</span>
                      <span class="ms-2">{{ item.id + 1 }}</span>
                    </div>
                    <div class="col-md-6 mb-2">
                      <span class="text-muted">เลขที่แจ้งซ่อม:</span>
                      <span class="ms-2">{{ item.ticket_number }}</span>
                    </div>
                    <div class="col-md-6 mb-2">
                      <span class="text-muted">ประเภท:</span>
                      <span class="ms-2">{{ item.category }}</span>
                    </div>
                    <div class="col-md-6 mb-2">
                      <span class="text-muted">ผู้แจ้ง:</span>
                      <span class="ms-2">{{ item.username }}</span>
                    </div>
                    <div class="col-12 mb-2">
                      <span class="text-muted">รายละเอียด:</span>
                      <span class="ms-2">{{ item.issue_detail }}</span>
                    </div>
                    <div class="col-md-6 mb-2">
                      <span class="text-muted">วันที่แจ้ง:</span>
                      <span class="ms-2"
                        >{{ item.reported_at_date }}
                        {{ item.reported_at_time }} น.</span
                      >
                    </div>
                    <div class="col-md-6 mb-2">
                      <span class="text-muted">สถานะ:</span>
                      <CBadge
                        :color="getBadge(item.status)"
                        class="ms-2"
                        style="font-size: 11px"
                      >
                        {{ item.status }}
                      </CBadge>
                    </div>
                  </div>
                </div>
              </div>
            </CCollapse>
          </td>
        </tr>
      </template>
    </CDataTable>
  </CCardBody>
</template>

<style>
.custom-pagination .page-item.active .page-link {
  background-color: #8c1007 !important; /* Example custom color */
  border-color: #8c1007 !important;
  color: #ffffff;
}

/* Target the text color of inactive buttons */
.custom-pagination .page-item .page-link {
  color: #414141; /* Dark gray for inactive text */
}

/* Target the hover state of buttons */
.custom-pagination .page-item:not(.active) .page-link:hover {
  background-color: #f0f0f0; /* Light gray on hover */
}
</style>

<script>
import ticketsData from "../data/CTicketsData";

const fields = [
  { key: "reported_datetime", label: "วัน/เวลา แจ้ง", _style: "width:20%;" },
  { key: "ticket_number", label: "เลขที่แจ้งซ่อม", _style: "width:20%" },
  { key: "issue_user", label: "รายละเอียด", _style: "width:55%;" },
  // { key: "username", label: "ผู้แจ้ง", _style: "width:60%;" },
  { key: "status", label: "สถานะ", _style: "width:15%;" },
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
      details: [],
    };
  },
  methods: {
    showDetail(item) {
      this.$emit("show-detail", item);
    },
    toggleDetails(index) {
      const position = this.details.indexOf(index);
      position !== -1
        ? this.details.splice(position, 1)
        : this.details.push(index);
    },
    getBadge(status) {
      switch (status) {
        case "กำลังดำเนินการ":
          return "#e09f3d";
        case "รอดำเนินการ":
          return "#dbd33b";
        case "รับเรื่องแล้ว":
          return "#22c9b3";
        case "ส่งเรื่องแล้ว":
          return "#3e9ce6";
        case "เสร็จสิ้น":
          return "#37d45e";
        default:
          return "#f8f9fa";
      }
    },
  },
};
</script>

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
