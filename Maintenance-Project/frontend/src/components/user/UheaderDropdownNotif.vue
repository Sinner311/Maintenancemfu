<template>
  <CDropdown 
    placement="bottom-end" 
    :caret="false" 
    in-nav 
    class="c-header-nav-item mx-2" 
    add-menu-classes="pt-0 border-0 shadow-lg"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="position-relative d-inline-block">
          <CIcon name="cil-bell" size="lg"/>
          
          <span 
            v-if="itemsCount > 0" 
            class="notification-dot"
          ></span>
        </div>
      </CHeaderNavLink>
    </template>

    <CDropdownHeader tag="div" class="text-center bg-light font-weight-bold py-2 rounded-top">
      การแจ้งเตือน ({{ itemsCount }})
    </CDropdownHeader>

    <CDropdownItem 
      v-for="(item, index) in notifications" 
      :key="index" 
      class="p-3 border-bottom d-flex align-items-start"
      href="#"
    >
      <div :class="`icon-circle bg-${item.color}-soft text-${item.color} mr-3`">
        <CIcon :name="item.icon" />
      </div>
      
      <div class="text-truncate" style="max-width: 200px;">
        <div class="small text-muted text-uppercase font-weight-bold mb-1">{{ item.id }}</div>
        <div class="font-weight-bold text-dark">{{ item.status }}</div>
        <small class="text-muted">{{ item.desc }}</small>
        <div class="small text-muted mt-1">
          <CIcon name="cil-clock" size="sm"/> {{ item.time }}
        </div>
      </div>
    </CDropdownItem>

    <CDropdownItem class="text-center p-2 font-weight-bold text-primary bg-light rounded-bottom">
      ดูรายการทั้งหมด
    </CDropdownItem>
  </CDropdown>
</template>

<script>
export default {
  name: 'TheHeaderDropdownNotif',
  data() {
    return {
      notifications: [
        { 
          id: 'REQ-2023-001', 
          status: 'ดำเนินการเสร็จสิ้น', 
          desc: 'ช่างซ่อมบำรุงปิดงานซ่อมแอร์แล้ว', 
          time: 'เมื่อสักครู่', 
          color: 'success', 
          icon: 'cil-check-circle' 
        },
        { 
          id: 'REQ-2023-005', 
          status: 'กำลังดำเนินการ', 
          desc: 'ช่างสมชาย รับเรื่องและกำลังเดินทาง', 
          time: '10 นาทีที่แล้ว', 
          color: 'info', 
          icon: 'cil-settings' 
        },
        { 
          id: 'REQ-2023-008', 
          status: 'รออะไหล่', 
          desc: 'แจ้งเปลี่ยนก๊อกน้ำ อาคาร A', 
          time: '1 ชั่วโมงที่แล้ว', 
          color: 'warning', 
          icon: 'cil-warning' 
        },
        { 
          id: 'REQ-2023-012', 
          status: 'ได้รับแจ้งซ่อมใหม่', 
          desc: 'ไฟทางเดินชั้น 2 ดับ', 
          time: '3 ชั่วโมงที่แล้ว', 
          color: 'primary', 
          icon: 'cil-lightbulb' 
        },
        { 
          id: 'SYSTEM', 
          status: 'อัปเดตระบบ', 
          desc: 'ระบบจะปิดปรับปรุงเวลา 24:00 น.', 
          time: 'เมื่อวานนี้', 
          color: 'danger', 
          icon: 'cil-cloud-download' 
        }
      ]
    }
  },
  computed: {
    itemsCount() {
      return this.notifications.length
    }
  }
}
</script>

<style scoped>
/* สไตล์จุดแดงกระพริบ */
.notification-dot {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: #e55353; /* สีแดง Danger */
  border-radius: 50%;
  border: 2px solid #fff; /* ขอบขาวตัดกับไอคอน */
  box-shadow: 0 0 0 0 rgba(229, 83, 83, 0.7);
  animation: pulse-red 1.5s infinite;
}

/* Animation การเต้น/กระพริบ */
@keyframes pulse-red {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(229, 83, 83, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 6px rgba(229, 83, 83, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(229, 83, 83, 0);
  }
}

/* สไตล์เดิม */
.icon-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.bg-success-soft { background-color: rgba(46, 184, 92, 0.1); }
.bg-info-soft    { background-color: rgba(57, 242, 255, 0.1); }
.bg-warning-soft { background-color: rgba(249, 177, 21, 0.1); }
.bg-primary-soft { background-color: rgba(50, 31, 219, 0.1); }
.bg-danger-soft  { background-color: rgba(229, 83, 83, 0.1); }
.dropdown-item:hover { background-color: #f8f9fa; }
</style>