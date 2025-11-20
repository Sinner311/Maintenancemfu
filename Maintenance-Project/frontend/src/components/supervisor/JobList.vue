<template>
  <CCardBody>
    <h4 class="d-flex mb-3 justify-content-between align-items-center">
      หน่วยงาน: {{ selectedDepartment.departmentName }}
      
    </h4>

    <CDataTable
      :items="selectedDepartment.subCategories"
      :fields="subFields"
      hover
      :items-per-page="100"
      :no-footer="true"
      :no-items-view="true"
    >
      <template #name="{ item }">
        <td>
          <input
            v-model="item.name"
            type="text"
            class="form-control form-control-sm"
          />
        </td>
      </template>

      <template #slaHours="{ item }">
        <td>
          <input
            v-model.number="item.slaHours"
            type="number"
            min="1"
            class="form-control form-control-sm text-center"
          />
        </td>
      </template>

      <template #actions="{ item, index }">
        <td class="text-center">
          <CButton color="danger" size="sm" @click="removeSubCategory(index)">
            ลบ
          </CButton>
        </td>
      </template>
    </CDataTable>

    <CModal title="เพิ่มประเภทงานใหม่" size="md" :show.sync="addModal">
      <div>
        <CInput
          label="ชื่อประเภทงาน"
          placeholder="โปรดระบุชื่อประเภทงาน"
          v-model="newBuildingCode"
        />
        <CInput
          label="SLA (ชั่วโมง)"
          placeholder="โปรดระบุ SLA"
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

<script>
import { CCol } from "@coreui/vue-pro";
import categoriesData from "../data/CategoriesDataELEC";

export default {
  name: "JobTypeManagement",
  data() {
    return {
      selectedDepartment: categoriesData[0], 
      
      // Fields สำหรับตารางย่อย (Sub-Categories)
      subFields: [
        { key: 'name', label: 'ชื่อประเภทงาน', _style: 'width: 60%' },
        { key: 'slaHours', label: 'SLA (ชั่วโมง)', _style: 'width: 20%', class: 'text-center' },
        { key: 'actions', label: 'การจัดการ', _style: 'width: 20%', sorter: false, filter: false, class: 'text-center' },
      ],
      editModal: false,
      addModal: false,
      newCategorieName: "",
    };
  },
  methods: {
    openAddModal() {
      this.newCategorieName = "";
      this.addModal = true;
    },

    addDepartment() {
      if (!this.newCategorieName.trim()) {
        alert("กรุณากรอกชื่อหน่วยงานก่อน");
        return;
      }

      const newDept = {
        _id: { $oid: new Date().getTime().toString() }, // สร้าง id จำลอง
        departmentName: this.newCategorieName,
        subCategories: [],
      };

      this.categoriesData.push(newDept);
      this.addModal = false;
    },

    removeSubCategory(index) {
      this.selectedDepartment.subCategories.splice(index, 1);
    },
    saveChanges() {
      // update กลับไปยัง categoriesData
      const index = this.categoriesData.findIndex(
        (d) => d._id.$oid === this.selectedDepartment._id.$oid
      );
      if (index !== -1) {
        this.categoriesData.splice(index, 1, this.selectedDepartment);
      }
      this.editModal = false;
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
