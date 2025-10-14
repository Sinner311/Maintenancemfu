<template>
  <CCard class=" shadow-sm rounded-3 bg-white">
    <CRow class="">
      <CCol md="">
          <CCardHeader class="bg-white border-bottom">
            <h4 class="card-title mb-0">จัดการข้อมูลเจ้าหน้าที่</h4>
          </CCardHeader>

          <CCardBody class="">

            <CDataTable
              :items="tableUsers"
              :fields="tableFields"
              hover
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
                />
              </CCol>
              <CCol sm="6">
                <CSelect
                  label="Category"
                  :options="categoryOptions"
                  :value="editUser.category"
                  @change="e => editUser.category = e.target.value"
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
        { id: 2, username: 'Thanaporn Kittipong', email: 'PT00000002@mfu.ac.th', phone: '0934567890', role: 'Technician', category: 'ระบบปะปา' },
        { id: 3, username: 'Kittisak Channarong', email: 'PT00000003@mfu.ac.th', phone: '0923456789', role: 'Technician', category: 'ระบบ IT' },
        { id: 4, username: 'Nattapong Phichit', email: 'PT00000004@mfu.ac.th', phone: '0956789012', role: 'Technician', category: 'ระบบไฟฟ้า' },
        { id: 5, username: 'Somsak Wattanachai', email: 'SPV0000001@mfu.ac.th', phone: '0876543210', role: 'Supervisor', category: 'ระบบไฟฟ้า' },
        { id: 6, username: 'Suchada Meesri', email: 'SPV0000002@mfu.ac.th', phone: '0855554444', role: 'Supervisor', category: 'ระบบ IT' },
        { id: 7, username: 'Preecha Boonmee', email: 'SPV0000003@mfu.ac.th', phone: '0890001111', role: 'Supervisor', category: 'ระบบไฟฟ้า' },
        { id: 8, username: 'Rungnapa Suthida', email: 'SPV0000004@mfu.ac.th', phone: '0867778888', role: 'Supervisor', category: 'ระบบปะปา' },
      ],
      tableFields: [
        { key: 'user_info', label: 'User Info', _style: 'width:50%' },
        { key: 'role', label: 'Role', _style: 'width:15%' },
        { key: 'category', label: 'Category', _style: 'width:15%' },
        { key: 'actions', label: 'Actions', _style: 'width:20%', sorter: false, filter: false, _classes: 'text-center' },
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
