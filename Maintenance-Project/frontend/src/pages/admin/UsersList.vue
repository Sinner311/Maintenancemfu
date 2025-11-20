<template>
  <CCard class=" shadow-sm rounded-3 bg-white">
    <CRow class="">
      <CCol md="">
          <CCardHeader style="background-color: #8C1007;" class="border-bottom d-flex justify-content-between align-items-center">
            <h4 class="card-title mb-0 text-white"><CIcon name="cil-people" size="xl"/> จัดการข้อมูลเจ้าหน้าที่</h4>
            <CButton color="success" shape="pill">เพิ่มเจ้าหน้าที่</CButton>
          </CCardHeader>

          <CCardBody>
          <CDataTable
            class="custom-pagination"
            :items="tableUsers"
            :fields="tableFields"
            hover
            striped
            sorter
            pagination
            :items-per-page="5"
            table-filter
            items-per-page-select
          >
            <template #category="{ item }">
              <td>{{ item.category || '—' }}</td>
            </template>

            <template #actions="{ item }">
              <td class="text-center">
                <CButton size="sm" color="primary" shape="pill" @click="openEditModal(item)"> 
                  Edit
                </CButton>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </CCol>
    </CRow>

    <CModal title="Edit User" :show.sync="showModal" size="lg" color="warning" centered>
      <CModalBody v-if="editUser">
        <CForm>
          <CCardBody>
            <CInput label="Name" v-model="editUser.username" />
            <CInput label="Email" v-model="editUser.email" />
            <CInput label="Phone" v-model="editUser.phone" />

            <CRow>
              <CCol sm="6">
                <CSelect
                  label="Role"
                  :options="roleOptions"
                  :value="editUser.role"
                  @change="e => editUser.role = e.target.value"
                  disabled
                />
              </CCol>
              <CCol sm="6">
                <CSelect
                  label="Category"
                  :options="categoryOptions"
                  :value="editUser.category"
                  @change="e => editUser.category = e.target.value"
                  disabled
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CForm>
      </CModalBody>

      <template #footer>
        <CButton @click="showModal = false" color="danger">Cancel</CButton>
        <CButton @click="saveUser" color="success">Save</CButton>
      </template>
    </CModal>
  </CCard>
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
import { CIcon } from '@coreui/icons-vue';
import * as icon from '@coreui/icons';
export default {
  name: 'UsersList',
  data() {
    return {
      showModal: false,
      editUser: null,
      users: [
        { id: 1, username: 'Wichai Somchai', email: 'PT00000001@mfu.ac.th', phone: '0912345678', role: 'Technician', category: 'ระบบไฟฟ้า' },
        { id: 2, username: 'Thanaporn Kittipong', email: 'PT00000002@mfu.ac.th', phone: '0934567890', role: 'Technician', category: 'ระบบปะปา' },
        { id: 3, username: 'Kittisak Channarong', email: 'PT00000003@mfu.ac.th', phone: '0923456789', role: 'Technician', category: 'ระบบ IT' },
        { id: 4, username: 'Nattapong Phichit', email: 'PT00000004@mfu.ac.th', phone: '0956789012', role: 'Technician', category: 'ระบบไฟฟ้า' },
        { id: 5, username: 'Somsak Wattanachai', email: 'SPV0000001@mfu.ac.th', phone: '0876543210', role: 'Supervisor', category: 'ระบบไฟฟ้า' },
        { id: 6, username: 'Suchada Meesri', email: 'SPV0000002@mfu.ac.th', phone: '0855554444', role: 'Supervisor', category: 'ระบบ IT' },
        { id: 7, username: 'Preecha Boonmee', email: 'SPV0000003@mfu.ac.th', phone: '0890001111', role: 'Supervisor', category: 'ระบบไฟฟ้า' },
        { id: 8, username: 'Rungnapa Suthida', email: 'SPV0000004@mfu.ac.th', phone: '0867778888', role: 'Supervisor', category: 'ระบบปะปา' },
      ],
      tableFields: [
        // New fields for separating User Info
        { key: 'username', label: 'Name', _style: 'width:15%', sorter: true },
        { key: 'email', label: 'Email', _style: 'width:20%', sorter: true },
        { key: 'phone', label: 'Phone', label: 'Phone', _style: 'width:15%', sorter: true },
        // Existing fields
        { key: 'role', label: 'Role', _style: 'width:10%', sorter: true },
        { key: 'category', label: 'Category', _style: 'width:15%', sorter: true },
        { key: 'actions', label: 'Actions', _style: 'width:10%', sorter: false, filter: false, _classes: 'text-center' },
      ],
      roleOptions: [
        { value: 'Supervisor', label: 'Supervisor' },
        { value: 'Technician', label: 'Technician' },
      ],
      categoryOptions: [
        { value: 'ระบบไฟฟ้า', label: 'ระบบไฟฟ้า' },
        { value: 'ระบบปะปา', label: 'ระบบปะปา' },
        { value: 'ระบบ IT', label: 'ระบบ IT' },
      ],
    }
  },
  computed: {
    // สร้าง property user_info สำหรับการค้นหา/กรอง
    tableUsers() {
      return this.users.map(u => ({
        ...u,
        user_info: `${u.username} ${u.email} ${u.phone}`
      }))
    }
  },
  methods: {
    openEditModal(user) {
      // clone user data เพื่อไม่ให้แก้ไขของจริงก่อนกด save
      this.editUser = { ...user }
      this.showModal = true
    },
    saveUser() {
      const index = this.users.findIndex(u => u.id === this.editUser.id)
      if (index !== -1) {
        // แทนที่ข้อมูลเก่าด้วยข้อมูลใหม่ที่แก้ไขแล้ว
        this.users.splice(index, 1, { ...this.editUser })
      }
      this.showModal = false
    },
  },
}
</script>
