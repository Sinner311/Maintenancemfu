<template>
  <CCardBody>
    <div class="ml-auto mr-3 mb-3 col-20">
      <CButton block color="info" shape="pill" @click="openAddModal"
        >เพิ่มข้อมูลห้อง</CButton
      >
    </div>

    <CDataTable
    class="custom-pagination" 
    :items="groupedBuildingsData" 
    :fields="fields" 
    table-filter
    hover 
    pagination
    >
      
      <template #buildingCode="{ item }">
        <td class="p-2">
          <strong>{{ item.buildingCode }}</strong>
        </td>
      </template>

      <template #rooms="{ item }">
        <td class="p-0">
          <table class="table table-sm table-bordered mb-0 fixed-table">
            <tbody>
              <tr v-for="(room, index) in item.rooms" :key="room.ROOMID">
                <td>{{ room.ROOMNAME }}</td>
                <td class="text-center">
                  <CButton
                    size="sm"
                    variant="outline"
                    color="danger"
                    shape="pill"
                    @click="deleteRoom(room)" >
                    ลบ
                  </CButton>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </template>
    </CDataTable>

    <CModal title="เพิ่มอาคารใหม่" size="md" :show.sync="addModal">
      <div>
        <CInput
          label="ชื่ออาคาร"
          placeholder="กรอกชื่ออาคาร...."
          v-model="newBuildingCode"
        />
        <CInput
          label="ชื่อห้อง"
          placeholder="กรอกชื่อห้อง...."
          v-model="newRoomName"
        />
      </div>

      <template #footer>
        <CButton color="secondary" @click="addModal = false">ยกเลิก</CButton>
        <CButton color="success" @click="addDepartment">เพิ่ม</CButton>
      </template>
    </CModal>
  </CCardBody>
</template>

<style>
.custom-pagination .page-item.active .page-link {
  background-color: #8C1007 !important; /* Example custom color */
  border-color: #8C1007 !important;
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
import { CCol } from "@coreui/vue-pro";
// นำเข้าข้อมูลใหม่ของคุณ
import rawBuildingsData from "../data/BuildingsData"; // เปลี่ยนชื่อตัวแปรที่นำเข้า

export default {
  name: "JobTypeManagement",
  data() {
    return {
      // 1. เก็บข้อมูลดิบ
      rawBuildingsData, 
      // 2. กำหนด Fields ใหม่
      fields: [
        { 
          key: "buildingCode", 
          label: "อาคาร", 
          _style: "width:20%",
          // ทำให้กด Sort ได้ตามชื่ออาคาร
          sortUsing: (a, b) => a.buildingCode.localeCompare(b.buildingCode) 
        },
        { 
          key: "rooms", 
          label: "ห้อง", 
          _style: "width:75%", 
          sorter: false, 
          filter: false 
        },
      ],
      addModal: false,
      newDepartmentName: "", // ยังคงใช้ V-model เดิม
    };
  },
  
  // 3. Computed Property สำหรับจัดกลุ่มข้อมูล
  computed: {
    groupedBuildingsData() {
      // สร้าง Map เพื่อจัดกลุ่มห้องตาม BUILDINGCODE
      const grouped = rawBuildingsData.reduce((acc, room) => {
        const code = room.BUILDINGCODE;
        if (!acc[code]) {
          acc[code] = {
            buildingCode: code,
            _rowVariant: 'info', // ใช้สำหรับเน้นแถวหลักของอาคาร
            rooms: [], // เก็บรายการห้องในอาคารนี้
          };
        }
        
        // เพิ่มข้อมูลห้อง
        acc[code].rooms.push({
          ROOMCODE: room.ROOMCODE,
          ROOMNAME: room.ROOMNAME,
          ROOMID: room.ROOMID, // ใช้เป็น key ในการลบ
        });

        // จัดเรียงห้องภายในอาคารตาม ROOMCODE
        acc[code].rooms.sort((a, b) => a.ROOMCODE.localeCompare(b.ROOMCODE));
        
        return acc;
      }, {});

      // แปลง Map เป็น Array และจัดเรียงตาม BUILDINGCODE
      return Object.values(grouped).sort((a, b) => a.buildingCode.localeCompare(b.buildingCode));
    }
  },

  methods: {
    openAddModal() {
      this.newDepartmentName = "";
      this.addModal = true;
    },

    addDepartment() {
      if (!this.newDepartmentName.trim()) {
        alert("กรุณากรอกชื่ออาคารก่อน");
        return;
      }

      // สร้างข้อมูลห้องจำลองสำหรับอาคารใหม่
      const newBuildingCode = this.newDepartmentName.toUpperCase().replace(/\s/g, '');
      const newRoom = {
          "BUILDINGCODE": newBuildingCode,
          "CAPACITY": 0,
          "INDEX": this.rawBuildingsData.length,
          "ROOMCODE": "9999",
          "ROOMID": new Date().getTime(), // ใช้เวลาปัจจุบันเป็น ID
          "ROOMNAME": `${newBuildingCode} 9999 (New)`,
          "ROOMSTATUS": "N",
          "ROOMTYPECODE": "0",
          "ROOMTYPENAME": "New Building Default Room"
      };

      // เพิ่มข้อมูลเข้าไปในข้อมูลดิบ
      this.rawBuildingsData.push(newRoom);
      this.addModal = false;
    },

    deleteRoom(room) {
        // ลบห้องออกจากข้อมูลดิบโดยใช้ ROOMID
        const initialLength = this.rawBuildingsData.length;
        this.rawBuildingsData = this.rawBuildingsData.filter(r => r.ROOMID !== room.ROOMID);
        
        if (this.rawBuildingsData.length < initialLength) {
            alert(`ลบห้อง ${room.ROOMCODE} (ID: ${room.ROOMID}) เรียบร้อยแล้ว`);
        } else {
            alert(`ไม่พบห้อง ${room.ROOMCODE} (ID: ${room.ROOMID}) ที่จะลบ`);
        }
    },
    
    // Method สำหรับลบทั้งอาคาร (ลบทุกห้องที่มี BUILDINGCODE นี้)
    deleteBuilding(buildingCode) {
        if (confirm(`คุณต้องการลบอาคาร ${buildingCode} และห้องทั้งหมดในอาคารนี้หรือไม่?`)) {
            const initialLength = this.rawBuildingsData.length;
            this.rawBuildingsData = this.rawBuildingsData.filter(r => r.BUILDINGCODE !== buildingCode);
            alert(`ลบอาคาร ${buildingCode} (ห้องจำนวน ${initialLength - this.rawBuildingsData.length} ห้อง) เรียบร้อยแล้ว`);
        }
    }
  },
};
</script>

<style scoped>
ul {
  list-style-type: disc;
}
.fixed-table {
  table-layout: fixed;
  width: 100%;
}

.fixed-table th,
.fixed-table td {
  text-align: left;
  vertical-align: middle;
  word-wrap: break-word;
}

.col-70 {
  width: 70%;
}

.col-30 {
  width: 30%;
}
.col-20 {
  width: 20%;
}
.col-10 {
  width: 10%;
}
</style>
