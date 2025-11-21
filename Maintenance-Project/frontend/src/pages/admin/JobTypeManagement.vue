<template>
  <div>
    <CRow>
      <CCol md="12">
        
          <JobList/>
      
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
