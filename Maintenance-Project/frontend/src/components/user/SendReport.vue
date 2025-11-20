<template>
  <CModal
    title="แจ้งซ่อม"
    size="lg"
    :show.sync="localModal"
    :close-on-backdrop="false"
  >
    <CModalBody class="p-4 body-font">
      <CForm>
        <div class="d-flex align-items-center mb-4">
          <div class="icon-box bg-gradient-primary mr-3">
            <span style="font-size: 1.5rem">👤</span>
          </div>
          <div>
            <h5 class="m-0 font-weight-bold">ข้อมูลผู้แจ้ง</h5>
            <small class="text-muted">รายละเอียดผู้ติดต่อ</small>
          </div>
        </div>

        <div class="mb-4">
          <CRow>
            <CCol sm="4">
              <label class="lbl">ชื่อผู้แจ้ง</label>
              <CInput value="นายสมสมสม ชายชายชาย" class="mb-0" plaintext readonly
            /></CCol>
            <CCol sm="4">
              <label class="lbl">เบอร์โทรศัพท์</label>
              <CInput value="090-000-0000" class="mb-0" />
            </CCol>
          </CRow>
        </div>

        <hr class="my-4 border-dashed" />

        <div class="d-flex align-items-center mb-4">
          <div class="icon-box bg-gradient-warning mr-3">
            <span style="font-size: 1.5rem">🛠️</span>
          </div>
          <div>
            <h5 class="m-0 font-weight-bold">รายละเอียดการซ่อม</h5>
            <small class="text-muted">ระบุปัญหาและสถานที่</small>
          </div>
        </div>

        <div class="mb-3">
          <label class="lbl">ประเภทการแจ้งซ่อม</label>
          <multiselect
            v-model="multi"
            :options="multiselectOptions"
            :multiple="true"
            label="label"
            track-by="label"
            placeholder="เลือกประเภทงานซ่อม"
            class="rounded-input"
          />
        </div>

       

        <div class="mb-3">
          <label class="lbl">พื้นที่ปฏิบัติงาน</label>
          <div class="area-grid">
            <label
              class="area-card"
              :class="{ active: workingArea === val }"
              v-for="val in ['indoor', 'outdoor']"
              :key="val"
            >
              <input
                type="radio"
                :value="val"
                v-model="workingArea"
                class="d-none"
              />
              <div class="h2 mb-1">{{ val === "indoor" ? "🏢" : "🌳" }}</div>
              <div>
                <strong>{{ val === "indoor" ? "ในอาคาร" : "นอกอาคาร" }}</strong
                ><br />
                <small class="text-muted capitalize">{{ val }}</small>
              </div>
              <div class="check">✓</div>
            </label>
          </div>
        </div>

        <transition name="fade">
          <div v-if="workingArea === 'indoor'" class="sub-box">
            <label class="lbl">ระบุอาคาร</label>
            <CSelect
              :options="options"
              placeholder="เลือกอาคาร..."
              class="mb-0"
            />
          </div>
          <div v-else-if="workingArea === 'outdoor'" class="sub-box">
            <label class="lbl">ปักหมุดตำแหน่ง</label>
            <div class="border rounded overflow-hidden">
              <GoogleMapsPicker v-model="outdoorLocation" />
            </div>
          </div>
        </transition>

         <div class="my-3">
          <label class="lbl">ปัญหา/งานซ่อม</label>
          <div class="editor-wrapper">
            <quill-editor
              :content="content"
              :options="editorOption"
              @change="onEditorChange($event)"
            />
          </div>
        </div>
      </CForm>
    </CModalBody>

    <template #footer>
      <div class="d-flex w-100">
        <CButton
          color="danger"
          variant="outline"
          class="flex-grow-1 mr-2 font-weight-bold"
          @click="localModal = false"
        >
          ยกเลิก
        </CButton>
        <CButton
          color="success"
          class="flex-grow-1 font-weight-bold text-white"
          @click="sendReport"
        >
          <i class="cil-send mr-1"></i> ยืนยัน
        </CButton>
      </div>
    </template>
  </CModal>
</template>

<script>
import Vue from "vue";
import Multiselect from "vue-multiselect";
import Quill from "vue-quill-editor";
import GoogleMapsPicker from "./UGoogleMapsPicker.vue";
import "vue-select/dist/vue-select.css";
import "vue-multiselect/dist/vue-multiselect.min.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

Vue.use(Quill);

export default {
  name: "Forms",
  components: { Multiselect, Quill, GoogleMapsPicker },
  props: { value: Boolean },
  data: () => ({
    localModal: false,
    workingArea: "",
    outdoorLocation: {},
    multi: [],
    content: "",
    options: ["Option 1", "Option 2", "Option 3"],
    multiselectOptions: [
      { label: "ไฟฟ้า", code: "ELEC" },
      { label: "ประปา", code: "PLUM" },
      { label: "แอร์", code: "AC" },
      { label: "เฟอร์นิเจอร์", code: "FURN" },
    ],
    editorOption: {
      theme: "snow",
      modules: { toolbar: [["link", "image"]] },
      placeholder: "รายละเอียด...",
    },
  }),
  watch: {
    value(val) {
      this.localModal = val;
    },
    localModal(val) {
      this.$emit("input", val);
    },
  },
  created() {
    this.localModal = this.value;
  },
  methods: {
    sendReport() {
      alert("ส่งเรียบร้อย!");
      this.localModal = false;
    },
    onEditorChange({ quill, html, text }) {
      this.content = html;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700&display=swap");

/* แก้ไขตรงนี้: เอา background: #f8f9fa ออกไปแล้ว */
.body-font {
  font-family: "Sarabun", sans-serif;
  background: white; /* บังคับให้เป็นสีขาว */
}

.lbl {
  font-weight: 600;
  color: #495057;
  display: block;
  margin-bottom: 4px;
}

.icon-box {
  min-width: 48px;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.bg-gradient-primary {
  background: linear-gradient(135deg, #321fdb, #1b0e8c);
}
.bg-gradient-warning {
  background: linear-gradient(135deg, #f9b115, #f6960b);
}

.border-dashed {
  border-top: 1px dashed #ccc;
}
.rounded-input >>> .multiselect__tags {
  border-radius: 6px;
  border-color: #ced4da;
}

.editor-wrapper {
  background: white;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  border: 1px solid #ced4da;
}
.quill-editor >>> .ql-container {
  min-height: 100px;
  font-size: 16px;
}
.quill-editor >>> .ql-toolbar {
  background-color: #f1f3f5;
  border-bottom: 1px solid #dee2e6;
}

.area-grid {
  display: flex;
  justify-content: space-between;
}
.area-card {
  width: 48%;
  background: #fff;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
}
.area-card:hover {
  border-color: #bdc3c7;
  transform: translateY(-2px);
}
.area-card.active {
  border-color: #2eb85c;
  background: #f0fff4;
  color: #2eb85c;
  box-shadow: 0 6px 12px rgba(46, 184, 92, 0.15);
}

.check {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #e9ecef;
  color: transparent;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.area-card.active .check {
  background: #2eb85c;
  border-color: #2eb85c;
  color: #fff;
}

.sub-box {
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e2e6ea;
  margin-top: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.fade-enter-active {
  transition: 0.3s;
}
.fade-enter,
.fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
.capitalize {
  text-transform: capitalize;
}
</style>
