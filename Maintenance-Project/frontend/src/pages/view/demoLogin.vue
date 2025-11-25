<template>
  <div class="login-container">
    <div class="login-box">
      <h2>mockup Login</h2>

      <div class="form-group">
        <label>Usercode</label>
        <input v-model="usercode" type="text" placeholder="Enter usercode" />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="Enter password" />
      </div>

      <button @click="login" :disabled="loading">
        <span v-if="loading">Loading...</span>
        <span v-else>Login</span>
      </button>

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",

  data() {
    return {
      usercode: "",
      password: "",
      loading: false,
      errorMsg: "",
    };
  },

  methods: {
    async login() {
      this.errorMsg = "";
      this.loading = true;

      try {
        const res = await axios.post("http://localhost:3000/auth/login", {
          usercode: this.usercode,
          password: this.password,
        });

        // ยืนยันว่ามีข้อมูล user
        const user = res.data.user;
        const role = user.role;

        // เก็บ Token
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect ตาม role
        if (role === "admin") {
          this.$router.push("/mockup/admin");
        } else if (role === "supervisor") {
          this.$router.push("/mockup/supervisor");
        } else if (role === "technician") {
          this.$router.push("/mockup/technician");
        } else {
          this.$router.push("/mockup/user");
        }

      } catch (err) {
        this.errorMsg =
          err.response?.data?.msg || "Login failed. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #f6f6f6;
}

.login-box {
  width: 350px;
  padding: 25px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #bbb;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 12px;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  margin-top: 10px;
  color: red;
  text-align: center;
}
</style>
