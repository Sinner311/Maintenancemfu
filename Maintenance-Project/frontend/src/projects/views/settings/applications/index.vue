<template>
  <div>
    {{objs}}
<!--    {{objs.tenant}}-->
    <Information class="mb-4" caption="General" :objs="objs"/>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Information from "@/projects/views/management/applications/components/information.vue";


export default {
  name: 'Applications',
  components: {Information},
  props: {
    icon: {
      type: String,
      default: 'cil-user'
    },
    caption: {
      type: String,
      default: 'Member Details'
    },
    application: {
      type: String,
      default: '0'
    }

  },
  data() {
    return {
      objs:{
        title: [{key:"th", value:""},{key:"en", value:""}],
        description: [{key:"th", value:""},{key:"en", value:""}],
        tenant :"",
        version :"",
        endpoint :"",
        type :"",
        state :"",
        mode :"",
        platform : []
      }
    }
  },

  mounted() {
    console.log(this.application) // "boms-web"
  },

  created() {
    this.onInit();
  },

  beforeDestroy() {

  },

  methods: {
    onInit() {
      var body = {};
      body._id = this.application;
      console.log(body);
      this.$store.dispatch("application/information/expApplicationId",body)
    },
  },

  computed: {
    ...mapGetters({
      lang: 'setting/lang',
      applications: 'application/information/application',
    })
  },

  watch: {
    lang: function (value) {

    },

    applications: function (value) {
      this.objs = value.filter(item => {
        return (item._id === this.application.toString())
      }).at(-1);
    }
  }
}

</script>
