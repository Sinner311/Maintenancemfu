<template>
  <CCard class="shadow-sm rounded-3 bg-white">
    <CRow>
      <CCol>
        <CCardHeader style="background-color: #145654;" class="border-bottom d-flex justify-content-between align-items-center">
          <h4 class="card-title mb-0 text-white"><CIcon name="cil-people" size="xl"/> จัดการข้อมูลพนักงานช่าง</h4>
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
  background-color: #2ba9a5 !important; /* Example custom color */
  border-color: #2ba9a5 !important;
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
  components: { CIcon }, // Explicitly register CIcon if not already global
  data() {
    return {
      showModal: false,
      editUser: null,
      users: [
        { id: 1, username: 'Wichai Somchai', email: 'PT00000001@mfu.ac.th', phone: '0912345678', role: 'Technician', category: 'ระบบไฟฟ้า' },
        { id: 2, username: 'Thanaporn Kittipong', email: 'PT00000002@mfu.ac.th', phone: '0934567890', role: 'Technician', category: 'ระบบไฟฟ้า' },
        { id: 3, username: 'Kittisak Channarong', email: 'PT00000003@mfu.ac.th', phone: '0923456789', role: 'Technician', category: 'ระบบไฟฟ้า' },
        { id: 4, username: 'Nattapong Phichit', email: 'PT00000004@mfu.ac.th', phone: '0956789012', role: 'Technician', category: 'ระบบไฟฟ้า' },
        { id: 5, username: 'Suchart Wongchai', email: 'PT00000005@mfu.ac.th', phone: '0891234567', role: 'Technician', category: 'ระบบไฟฟ้า' },
        { id: 6, username: 'Anucha Srisuk', email: 'PT00000006@mfu.ac.th', phone: '0889876543', role: 'Technician', category: 'ระบบไฟฟ้า' },
        { id: 7, username: 'Somchai Boonmee', email: 'PT00000007@mfu.ac.th', phone: '0945678901', role: 'Technician', category: 'ระบบไฟฟ้า' },
        { id: 8, username: 'Napat Thongchai', email: 'PT00000008@mfu.ac.th', phone: '0973456789', role: 'Technician', category: 'ระบบไฟฟ้า' },
        { id: 9, username: 'Prasert Decha', email: 'PT00000009@mfu.ac.th', phone: '0812345670', role: 'Technician', category: 'ระบบไฟฟ้า' },
        { id: 10, username: 'Tawan Phanuphong', email: 'PT00000010@mfu.ac.th', phone: '0998765432', role: 'Technician', category: 'ระบบไฟฟ้า' },
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
        { value: 'Technician', label: 'Technician' },
      ],
      categoryOptions: [
        { value: 'ระบบไฟฟ้า', label: 'ระบบไฟฟ้า' },
      ],
    }
  },
  computed: {
    // The tableUsers computed property is no longer strictly necessary 
    // for this change, but we'll simplify it back to just the users array.
    tableUsers() {
      return this.users;
    }
  },
  methods: {
    openEditModal(user) {
      this.editUser = { ...user }
      this.showModal = true
    },
    saveUser() {
      const index = this.users.findIndex(u => u.id === this.editUser.id)
      if (index !== -1) {
        this.users.splice(index, 1, { ...this.editUser })
      }
      this.showModal = false
    },
  },
}
</script>