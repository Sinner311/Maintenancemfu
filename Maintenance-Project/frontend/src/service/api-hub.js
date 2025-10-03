import axios from 'axios';
import store from '@/store/store'
import { route } from 'vue-router';
const instance = axios.create();

// instance.defaults.baseURL = 'https://api.example.com';
// instance.defaults.baseURL = 'https://api.competency.mfu.ac.th';
instance.defaults.baseURL = 'http://127.0.0.1:8081';
// instance.defaults.timeout = 5000;

instance.defaults.headers = {
  "Content-Type": "application/json",
  // "Api-version": "1.0",
  "X-Access-Token": "12e8ab2bb3eba6295fe28cb989f7d8973ccf0840a67973fda2d1206a2191c3b6",
}

//
// // เพิ่ม request interceptor
// instance.interceptors.request.use(
//     (config) => {
//       const token = `${store.state.XAccessToken}`;
//       if (token) {
//         config.headers.Authorization = `Bearer ${store.state.XAccessToken}`;
//       }
//
//       config.headers.lang  = `${store.getters['setting/lang']}`;
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
// );
//
// // เพิ่ม Interceptor สำหรับ Response
// instance.interceptors.response.use(
//     (response) => {
//       // คืนค่าปกติหาก response สำเร็จ
//       return response;
//     },
//     (error) => {
//       // ตรวจสอบสถานะ 401
//       if (error.response && error.response.status === 401) {
//         // แสดง Dialog หรือ Popup
//         router.push('/login');
//       }
//       return Promise.reject(error);
//     }
// );

export default {

  tenant(method, data, configs) {
    switch (method){
      case 'exp':
        return instance.get("/api/v1/application/tenant",data);
      default:
        break;
    }
  },
  type(method, data, configs) {
    switch (method){
      case 'exp':
        return instance.get("/api/v1/application/type",data);
      default:
        break;
    }
  },

  state(method, data, configs) {
    switch (method){
      case 'exp':
        return instance.get("/api/v1/application/state",data);
      default:
        break;
    }
  },

  mode(method, data, configs) {
    switch (method){
      case 'exp':
        return instance.get("/api/v1/application/mode",data);
      default:
        break;
    }
  },

  platform(method, data, configs) {
    switch (method){
      case 'exp':
        return instance.get("/api/v1/application/platform",data);
      default:
        break;
    }
  },

  infomation(method, data, configs) {
    switch (method){
      case 'exp':
        return instance.get("/api/v1/application/information",data);
      case 'expId':
        return instance.post("/api/v1/application/informations",data);
      case 'post':
        return instance.post("/api/v1/application/information",data);
      default:
        break;
    }
  },

  permissionn(method, data, configs) {

    switch (method){
      case 'expId':
        return instance.post(`/api/v1/application/permission/${data.application}`,data);
      default:
        break;
    }
  },




}
