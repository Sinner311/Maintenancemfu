<template>
  <div>
    <CRow>
      <CCol md="12">
        <CCard>
          <CCardHeader style="background-color: #8C1007;" class="border-bottom">
            <h4 class="text-white card-title mb-0"><CIcon name="cil-book" size="xl"/> จัดการข้อมูล ประเภทงาน</h4>
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
