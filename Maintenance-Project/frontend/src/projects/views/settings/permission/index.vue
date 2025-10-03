<template>
  <div>
    <CCard class="bg-style2">
      <CCardHeader  class="bg-gradient-danger text-white" style="border-top-left-radius: 1rem; border-top-right-radius: 1rem ">
        <span class="font-weight-bold h6"> <CIcon class="mr-2" v-if="icon" :name="icon"/> {{ caption }} </span>
      </CCardHeader>
      <CCardBody>
        <MultiLanguage caption="Title" :items="objs.title"/>
        <MLEditor caption="Descrption" :items="objs.description"/>

<!--        {{application}}-->
<!--        {{permission.permission}}-->
      </CCardBody>
    </CCard>

<!--    {{permission}}-->
    <CardPermission class="mt-4" :item="permission.permission"/>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Information from "@/projects/views/management/applications/components/information.vue";
import MultiLanguage from "@/projects/components/Util/MultiLanguage.vue";
import MLEditor from "@/projects/components/Util/MLEditor.vue";
import CardPermission from "@/projects/views/settings/permission/components/CardPermission.vue";


export default {
  name: 'Permission',
  components: {CardPermission, MLEditor, MultiLanguage, Information},
  props: {
    icon: {
      type: String,
      default: 'cil-user'
    },
    caption: {
      type: String,
      default: 'Permission'
    },
    application: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      objs: {
        title: [{key: "th", value: ""}, {key: "en", value: ""}],
        description: [{key: "th", value: ""}, {key: "en", value: ""}],
        tenant: "",
        version: "",
        endpoint: "",
        type: "",
        state: "",
        mode: "",
        platform: []
      },

      item:[]
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
    onInit() {
      var body = {};
      body.application = this.application;
      this.$store.dispatch("application/permission/expId",body);
    },

  },

  computed: {
    ...mapGetters({
      lang: 'setting/lang',
      permission: 'application/permission/objs',

    })
  },

  watch: {
    lang: function (value) {

    },

  }
}

</script>
