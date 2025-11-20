<template>
  <div>
    <CRow>
      <CCol md="12">
        <CCard>
          <CCardHeader>
            <h4 class="card-title mb-0">จัดการข้อมูล ประเภทงาน</h4>
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
