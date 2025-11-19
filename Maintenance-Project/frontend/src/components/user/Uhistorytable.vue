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
    <template #reported_datetime="{ item }">
        <td>
          <div>{{ item.reported_at_time }} น.</div>
          <div class="small">{{ item.reported_at_date }}</div>
        </td>
      </template>
      <template #issue_user="{ item }">
        <td>
          <div>{{ item.category }} | {{ item.issue_detail }}</div>
          <div class="small text-muted">ผู้แจ้ง: {{ item.username }}</div>
        </td>
      </template>
      <template #status="{ item }">
        <td>
          <CBadge :color="getBadge(item.status)">
            {{ item.status }}
          </CBadge>
        </td>
      </template>
      <template #show_details="{ item, index }">
        <td class="py-2">
<CButton
  color="primary"
  variant="outline"
  square
  size="sm"
  @click="toggleDetails(item, index)"
>
  +
</CButton>

        </td>
      </template>
      <template #details="{ item }">
        <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
          <CCardBody>
            <CMedia :aside-image-props="{ height: 102 }">
              <h4>
                {{ item.username }}
              </h4>
              <p class="text-muted">User since: {{ item.reported_at }}</p>
              <CButton size="sm" color="info" class=""> User Settings </CButton>
              <CButton size="sm" color="danger" class="ml-1"> Delete </CButton>
            </CMedia>
          </CCardBody>
        </CCollapse>
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
  { key: "status", label: "สถาณะ", _style: "width:10%;" },
  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
];

export default {
  name: "AdvancedTables",
  data() {
    return {
      ticketsData: ticketsData.map((item, id) => {
        return { ...item, id,issue_user: `${item.category} ${item.issue_detail} ${item.username}`};
      }),
      fields,
      details: [],
      collapseDuration: 0,
    };
  },
  methods: {
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
          "primary";
      }
    },
  toggleDetails(item) {
    // ไปยังหน้าใหม่ตาม ticket_id
    // this.$router.push(`/mockup/admin/reportlist/${item.ticket_id}`);
  },
  },
};
</script>
