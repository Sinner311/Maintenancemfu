<template>
  <div class="c-app" :class="{ 'c-dark-theme': $store.state.darkMode }">
    <Uheader />
    <Usidebar />

    <div
      class="c-wrapper"
      :class="{ 'sidebar-open': $store.state.sidebarShow }"
    >
      
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </CContainer>
        </main>
        <TheFooter />
      </div>
    </div>

    <CenterLoading />
    <DialogMessage />
    <SignIn />
  </div>
</template>


<script>
import Usidebar from './Usidebar'
import Uheader from './Uheader'
import TheFooter from '../TheFooter'
import {mapGetters} from "vuex";

import DialogMessage from "@/projects/components/dialog/DialogMessage.vue";
import CenterLoading from "@/projects/components/dialog/CenterLoading.vue";
import SignIn from "@/projects/components/dialog/SignIn.vue";
//
export default {
  name: 'TheContainer',
  components: {
    SignIn,
    CenterLoading,
    DialogMessage,
    Usidebar,
    Uheader,
    TheFooter,
  },

  mounted() {

    // this.notifyUser();
    this.showNotification();

//     const socket = io("127.0.0.1:8082",{
//       transports: ["websocket", "polling"],
//       withCredentials: true,
//       extraHeaders: {
//         "my-custom-header": "abcd"
//       }
//     });
//     socket.on("connect", () => {
//       socket.emit('campus',{"sos":1122});
//
//       socket.on("campus", (reason) => {
//         console.log(reason)
//       })
//
//
//     });
//
//
//
// // กรณีการเชื่อมต่อถูกตัดขาด
//     socket.on("disconnect", (reason) => {
//       console.log("[socket disconnected]: ", reason);
//     });
// // กรณีการเชื่อมต่อเกิดความผิดพลาด
//     socket.on("connect_error", (error) => {
//       console.error("[connect error]: ", error);
//     });


    // localStorage.setItem('test','123444')

    // socket.on("connect", () => {
    //   console.log(12)
    // });
    //
    // socket.on("disconnect", () => {
    //   console.log(13)
    //
    // });
  },

  methods: {
    showNotification() {
      const title = 'Hello from Vue.js!';
      const options = {
        body: 'This is a simple notification example.',
        icon: 'https://via.placeholder.com/100', // Optional: Path to icon image
        vibrate: [200, 100, 200], // Optional: Vibration pattern
      };

      new Notification(title, options);
    }
  },
  computed: {
    ...mapGetters({
    })
  },

  watch: {

  }

}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}










.c-wrapper {
  transition: margin-left 0.3s ease;
  margin-left: 0;
}

/* ปรับขนาดเท่ากับ sidebar */
.sidebar-open {
  margin-left: 250px; /* ความกว้าง sidebar ของคุณ */
}
.sidebar-minimized {
  margin-left: 80px; /* กว้างตอน minimize */
}
/* เลื่อน body ลงมาใต้ header */

.c-body {
  padding-top: 66px; /* ความสูงของ CHeader */
}

</style>