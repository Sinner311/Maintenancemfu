<template>
  <CCardBody>
    <div class="ml-auto mr-3 mb-3 col-20">
      <CButton block color="info" shape="pill" @click="openAddModal"
        >เพิ่มหน่วยงาน</CButton
      >
    </div>

    <CDataTable :items="categoriesData" :fields="fields" hover pagination>
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
            <CRow class="mb-2">
              <CButton
                color="info"
                variant="outline"
                size="sm"
                @click="openEditModal(item)"
                shape="pill"
              >
                แก้ไข
              </CButton></CRow
            ><CRow>
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
    <CModal title="เพิ่มหน่วยงานใหม่" size="md" :show.sync="addModal">
      <div>
        <CInput
          label="ชื่อหน่วยงาน"
          placeholder="กรอกชื่อหน่วยงาน เช่น ไฟฟ้า, IT, อาคาร..."
          v-model="newDepartmentName"
        />
      </div>

      <template #footer>
        <CButton color="secondary" @click="addModal = false">ยกเลิก</CButton>
        <CButton color="success" @click="addDepartment">เพิ่ม</CButton>
      </template>
    </CModal>

    <!-- Modal -->
    <CModal title="แก้ไขข้อมูลประเภทงาน" size="lg" :show.sync="editModal">
      <CModalBody>
        <div v-if="selectedDepartment">
          <h5 class="mb-3">
            หน่วยงาน: {{ selectedDepartment.departmentName }}
          </h5>

          <table class="table table-sm table-bordered fixed-table">
            <thead>
              <tr>
                <th class="col-30">ชื่อประเภทงาน</th>
                <th class="col-10">SLA (ชั่วโมง)</th>
                <th class="col-10 text-center">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(sub, index) in selectedDepartment.subCategories"
                :key="index"
              >
                <td>
                  <input
                    v-model="sub.name"
                    type="text"
                    class="form-control form-control-sm"
                  />
                </td>
                <td>
                  <input
                    v-model.number="sub.slaHours"
                    type="number"
                    min="1"
                    class="form-control form-control-sm text-center"
                  />
                </td>
                <td class="text-center">
                  <CButton
                    color="danger"
                    size="sm"
                    @click="removeSubCategory(index)"
                  >
                    ลบ
                  </CButton>
                </td>
              </tr>
              <tr>
                <td colspan="3" class="text-center">
                  <CButton color="success" size="sm" @click="addSubCategory">
                    ➕ เพิ่มประเภทงานใหม่
                  </CButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CModalBody>
      <template #footer>
        <CButton color="secondary" @click="editModal = false">ยกเลิก</CButton>
        <CButton color="primary" @click="saveChanges">บันทึก</CButton>
      </template>
    </CModal>
  </CCardBody>
</template>

<script>
import { CCol } from "@coreui/vue-pro";
import categoriesData from "../data/CategoriesData";

export default {
  name: "JobTypeManagement",
  data() {
    return {
      categoriesData,
      fields: [
        { key: "departmentName", label: "ชื่อหน่วยงาน", _style: "width:20%" },
        { key: "subCategories", label: "ข้อมูลประเภทงาน", _style: "width:70%" },
        {
          key: "show_details",
          label: "",
          _style: "width:5%",
          sorter: false,
          filter: false,
        },
      ],
      editModal: false,
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

      this.categoriesData.push(newDept);
      this.addModal = false;
    },

    openEditModal(item) {
      // clone object เพื่อไม่ให้แก้ตรง array เดิมทันที
      this.selectedDepartment = JSON.parse(JSON.stringify(item));
      this.editModal = true;
    },
    addSubCategory() {
      this.selectedDepartment.subCategories.push({
        name: "",
        slaHours: 0,
      });
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
