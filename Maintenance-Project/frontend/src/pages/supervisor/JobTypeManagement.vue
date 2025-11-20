<template>
  <div>
    <CRow>
      <CCol md="12">
        <CCard>
          <CCardHeader style="background-color: #8C1007;" class="border-bottom d-flex justify-content-between align-items-center">
            <h4 class="card-title mb-0 text-white"><CIcon name="cil-book" size="xl"/> จัดการข้อมูล ประเภทงาน</h4>
            <CButton 
              color="info" 
              shape="pill"
              @click="openAddModal"
            >
            เพิ่มประเภทงาน</CButton>
          </CCardHeader>
          
          <JobList/>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import JobList from '../../components/supervisor/JobList'

export default {
  name: 'Dashboard',
  components: {
    JobList
  },
}
</script>
