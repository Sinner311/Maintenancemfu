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
