import axios from 'axios';
import store from '@/store/store'
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


  campus(method, data, configs) {
    switch (method){
      case 'exp':
        return instance.post("/api/v1/setting/explore/campus",data);
      case 'get':
        return instance.get("/api/v1/setting/campus");
      case 'post':
        delete data._id;
        return instance.post("/api/v1/setting/campus", data);
      case 'put':
        return instance.put("/api/v1/setting/campus", data);
      case 'delete':
        return instance.delete("/api/v1/setting/campus");
      default:
        break;
    }
  },

  facultys(method, data, configs) {
    switch (method){
      case 'get':
        return instance.get("/api/v1/setting/faculty");
      case 'post':
        delete data._id;
        return instance.post("/api/v1/setting/faculty", data);
      case 'put':
        return instance.put("/api/v1/setting/faculty", data);
      case 'delete':
        return instance.delete("/api/v1/setting/faculty");
      default:
        break;
    }
  },

  departments(method, data, configs) {
    switch (method){
      case 'exp':
        return instance.post("/api/v1/explore/departments",data);
      case 'get':
        return instance.get("/api/v1/setting/department");
      case 'post':
        delete data._id;
        return instance.post("/api/v1/setting/department", data);
      case 'put':
        return instance.put("/api/v1/setting/department", data);
      case 'delete':
        return instance.delete("/api/v1/setting/department");
      default:
        break;
    }
  },



  members(method, data, configs) {
    switch (method){
      case 'exp':
        return instance.post("/api/v1/explore/profile",data);

      default:
        break;
    }
  },


  //
  roles(method, data, configs) {
    switch (method){
      case 'exp':
        return instance.get("/api/v1/setting/role",data);
      case 'post':
        return instance.post("/api/v1/setting/role",data);
      case 'put':
        return instance.put("/api/v1/setting/role",data);

      default:
        break;
    }
  },


}
