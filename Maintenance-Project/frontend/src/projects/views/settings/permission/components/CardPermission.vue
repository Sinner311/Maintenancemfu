<template>
  <div>
    <CCard class="bg-style2">
      <CCardHeader class="bg-gradient-danger text-white" style="border-top-left-radius: 1rem; border-top-right-radius: 1rem ">
        <span class="font-weight-bold h6"> <CIcon class="mr-2" v-if="icon" :name="icon"/> {{ caption }} </span>
      </CCardHeader>
      <CCardBody color="p-0">
        <CTabs variant="pills" vertical >
          <CTab v-for="objs in item">
            <template slot="title">
              <CIcon name="cil-calculator"/>  <CIcon v-if="icon" :name="icon"/> {{ objs.title.filter(title => { if (title.key === lang) { return title } })[0].value }}
            </template>

            <CRow>
              <CCol>
                <CDataTable
                    :table-filter="{label:''}"
                    :hover="hover"
                    :striped="striped"
                    :bordered="bordered"
                    :small="small"
                    :fixed="fixed"
                    :items='objs.connect.map(items => { return { _id: items._id, name: items.by.userInfo.prefix.filter(title => { if (title.key === lang) { return title } })[0].value+" "+items.by.userInfo.firstName.filter(title => { if (title.key === lang) { return title } })[0].value+" "+items.by.userInfo.lastName.filter(title => { if (title.key === lang) { return title } })[0].value }; })'
                    :fields="fields"
                    :items-per-page="small ? 50 : 20"
                    :dark="dark"
                    pagination
                    :loading="loading"
                >
                  <template #index="{item,index}">
                    <td class="text-center"  @click="toggleDetails(item, index)"> {{ index + 1 }}</td>
                  </template>

                  <template #title="{item,index}">
                    <td class="text-center"  @click="toggleDetails(item, index)"> {{item.by}}</td>
                  </template>



                  <template #action="{item}">
                    <td style="width: 140px">
                      <CRow>
                        <CCol class="text-center">
                          <CButton class="mr-1" v-c-tooltip.hover.click="'Detail'" size="sm" color="info" shape="pill" variant="outline" @click="onUpdate(item)"  >
                            <CIcon name="cil-description"/>
                          </CButton>


                        </CCol>
                      </CRow>
                    </td>
                  </template>
                </CDataTable>
              </CCol>
            </CRow>
          </CTab>
        </CTabs>
      </CCardBody>
    </CCard>
<!--    <CRow v-for="objs in item">-->
<!--      <CCol>-->
<!--        <CCard class="bg-style2 mb-4">-->
<!--          <CCardHeader class="bg-gradient-danger text-white" style="border-top-left-radius: 1rem; border-top-right-radius: 1rem ">-->
<!--            <span class="font-weight-bold h6">-->
<!--              <CIcon v-if="icon" :name="icon"/> {{ objs.title.filter(title => { if (title.key === lang) { return title } })[0].value }}-->
<!--            </span>-->
<!--            <div class="card-header-actions">-->
<!--              <CIcon name="cil-settings"/>-->
<!--            </div>-->
<!--          </CCardHeader>-->

<!--          <CCardBody>-->
<!--            <CRow>-->
<!--              <CCol>-->
<!--               <span> {{$t('description')}} : </span> <label v-html="objs.description.filter(title => { if (title.key === lang) { return title } })[0].value"></label>-->
<!--              </CCol>-->
<!--            </CRow>-->

<!--            <CRow>-->
<!--              <CCol>-->
<!--                <CDataTable-->
<!--                    :table-filter="{label:''}"-->
<!--                    :hover="hover"-->
<!--                    :striped="striped"-->
<!--                    :bordered="bordered"-->
<!--                    :small="small"-->
<!--                    :fixed="fixed"-->
<!--                    :items='objs.connect.map(items => { return { _id: items._id, name: items.by.userInfo.prefix.filter(title => { if (title.key === lang) { return title } })[0].value+" "+items.by.userInfo.firstName.filter(title => { if (title.key === lang) { return title } })[0].value+" "+items.by.userInfo.lastName.filter(title => { if (title.key === lang) { return title } })[0].value }; })'-->
<!--                    :fields="fields"-->
<!--                    :items-per-page="small ? 50 : 20"-->
<!--                    :dark="dark"-->
<!--                    pagination-->
<!--                    :loading="loading"-->
<!--                >-->
<!--                  <template #index="{item,index}">-->
<!--                    <td class="text-center"  @click="toggleDetails(item, index)"> {{ index + 1 }}</td>-->
<!--                  </template>-->

<!--                  <template #title="{item,index}">-->
<!--                    <td class="text-center"  @click="toggleDetails(item, index)"> {{item.by}}</td>-->
<!--                  </template>-->



<!--                  <template #action="{item}">-->
<!--                    <td style="width: 140px">-->
<!--                      <CRow>-->
<!--                        <CCol class="text-center">-->
<!--                          <CButton class="mr-1" v-c-tooltip.hover.click="'Detail'" size="sm" color="info" shape="pill" variant="outline" @click="onUpdate(item)"  >-->
<!--                            <CIcon name="cil-description"/>-->
<!--                          </CButton>-->


<!--                        </CCol>-->
<!--                      </CRow>-->
<!--                    </td>-->
<!--                  </template>-->
<!--                </CDataTable>-->
<!--              </CCol>-->
<!--            </CRow>-->
<!--          </CCardBody>-->
<!--        </CCard>-->
<!--      </CCol>-->
<!--    </CRow>-->
  </div>

</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'CardPermission',
    props: {
      icon: {
        type: String,
        default: 'cil-user'
      },
      caption: {
        type: String,
        default: 'Create / Update'
      },

      item:{
        type: Array,
        default() {
          return []
        }
      },
      fields: {
        type: Array,
        default() {
          return [
            {key:"index", label: "ลำดับ",  _style: 'width:50px; text-align: center'},
            {key:"name", label:"ชื่อผู้ใช้งาน",},
            {key:"action", label: "#", _style: 'width:100px; text-align: center'}
          ]
        }
      },
      type: {
        type: String,
        default: 'cil-user'
      },
      hover: Boolean,
      striped: Boolean,
      bordered: Boolean,
      small: Boolean,
      fixed: Boolean,
      dark: Boolean,
      loading:{
        type: Boolean,
        default() {
          return false
        }
      },

    },
    data () {
      return {

      }
    },

    mounted() {

    },

    created() {
      this.onInit();
    },

    beforeDestroy() {

    },

    methods: {
      onInit(){

      },


    },

    computed:{
      ...mapGetters({
        lang:'setting/lang',
      })
    },

    watch: {
      lang:function (value) {
      },



    }
  }

</script>
