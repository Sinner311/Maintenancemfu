<template>
  <CCardBody>
    <div class="ml-auto mr-3 mb-3 col-20">
      <CButton block color="info" shape="pill" @click="openAddModal"
        >เพิ่มอาคาร</CButton
      >
    </div>

    <CDataTable :items="buildingsData" :fields="fields" hover pagination>
      <!-- แสดงชื่อแผนก -->
      <template #departmentName="{ item }">
        <td>
          <strong>{{ item.departmentName }}</strong>
        </td>
      </template>

      <!-- Column: subCategories (table ย่อย) -->
      <template #subCategories="{ item }">
        <table class="table table-sm table-bordered mb-0 fixed-table">
          <thead>
            <tr>
              <th class="col-70">ชื่อประเภทงาน</th>
              <th class="col-30">SLA (ชั่วโมง)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(sub, index) in item.subCategories" :key="index">
              <td>{{ sub.name }}</td>
              <td>{{ sub.slaHours }}</td>
            </tr>
          </tbody>
        </table>
      </template>

      <!-- ปุ่มแสดงรายละเอียด -->
      <template #show_details="{ item }">
        <td class="py-2 text-center">
          <CCol>
            <CRow>
              <CButton
                size="sm"
                variant="outline"
                color="danger"
                class="ml-2"
                shape="pill"
                @click="deleteDepartment(item)"
              >
                ลบ
              </CButton></CRow
            >
          </CCol>
        </td>
      </template>
    </CDataTable>

    <!-- Modal เพิ่มหน่วยงานใหม่ -->
    <CModal title="เพิ่มอาคารใหม่" size="md" :show.sync="addModal">
      <div>
        <CInput
          label="ชื่ออาคาร"
          placeholder="กรอกชื่ออาคาร...."
          v-model="newDepartmentName"
        />
      </div>

      <template #footer>
        <CButton color="secondary" @click="addModal = false">ยกเลิก</CButton>
        <CButton color="success" @click="addDepartment">เพิ่ม</CButton>
      </template>
    </CModal>

    
  </CCardBody>
</template>

<script>
import { CCol } from "@coreui/vue-pro";
import buildingsData from "../data/BuildingsData";

export default {
  name: "JobTypeManagement",
  data() {
    return {
      buildingsData,
      fields: [
        { key: "building_name", label: "ชื่ออาคาร", _style: "width:20%" },
        {
          key: "show_details",
          label: "",
          _style: "width:5%",
          sorter: false,
          filter: false,
        },
      ],
      addModal: false,
      selectedDepartment: null,
      newDepartmentName: "",
    };
  },
  methods: {
    openAddModal() {
      this.newDepartmentName = "";
      this.addModal = true;
    },

    addDepartment() {
      if (!this.newDepartmentName.trim()) {
        alert("กรุณากรอกชื่อหน่วยงานก่อน");
        return;
      }

      const newDept = {
        _id: { $oid: new Date().getTime().toString() }, // สร้าง id จำลอง
        departmentName: this.newDepartmentName,
        subCategories: [],
      };

      this.buildingsData.push(newDept);
      this.addModal = false;
    },
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
