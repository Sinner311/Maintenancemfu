<template>
  <div>
    <CRow>
      <CCol md="12">
        <CCard>
          <CCardHeader class="bg-primary border-bottom">
            <h4 class="text-white card-title mb-0"><CIcon name="cil-briefcase" size="xl"/> จัดการข้อมูล ประเภทงาน</h4>
          </CCardHeader>
          <JobList/>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import JobList from '../../components/admin/JobList'

export default {
  name: 'Dashboard',
  components: {
    JobList
  },
}
</script>
