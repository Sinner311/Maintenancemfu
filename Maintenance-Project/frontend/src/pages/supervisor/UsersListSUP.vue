<template>
  <CCard class="shadow-sm rounded-3 bg-white">
    <CRow>
      <CCol>
        <CCardHeader class="bg-white border-bottom">
          <h4 class="card-title mb-0">จัดการข้อมูลพนักงานช่าง</h4>
        </CCardHeader>

        <CCardBody>
          <CDataTable
            :items="tableUsers"
            :fields="tableFields"
            hover
            striped
            sorter
            pagination
            :items-per-page="5"
            column-filter
            table-filter
            items-per-page-select
          >
            <template #user_info="{ item }">
              <td>
                <div><strong>{{ item.username }}</strong> | {{ item.role }}</div>
                <div class="small text-muted">{{ item.email }} | {{ item.phone }}</div>
              </td>
            </template>

            <template #category="{ item }">
              <td>{{ item.category || '—' }}</td>
            </template>

            <template #actions="{ item }">
              <td class="text-center">
                <CButton size="lg" color="primary" shape="pill" @click="openEditModal(item)">
                  Edit
                </CButton>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </CCol>
    </CRow>

    <!-- Modal -->
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

<script>
export default {
  name: 'UsersList',
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
        { key: 'user_info', label: 'User Info', _style: 'width:50%' },
        { key: 'role', label: 'Role', _style: 'width:15%' },
        { key: 'category', label: 'Category', _style: 'width:15%' },
        { key: 'actions', label: 'Actions', _style: 'width:20%', sorter: false, filter: false, _classes: 'text-center' },
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
    tableUsers() {
      return this.users.map(u => ({
        ...u,
        user_info: `${u.username} ${u.email} ${u.phone}`
      }))
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
