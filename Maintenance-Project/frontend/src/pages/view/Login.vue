<template>
  <div class="c-app flex-row align-items-center min-vh-100 position-relative overflow-hidden">
    
    <div class="bg-mesh-mfu">
      <div class="blob blob-gold"></div>
      <div class="blob blob-red"></div>
      
      <div class="floating-icon icon-wrench">
        <CIcon name="cil-settings" size="xl"/>
      </div>
      <div class="floating-icon icon-gear">
        <CIcon name="cil-cog" size="xl"/>
      </div>
      <div class="floating-icon icon-hammer">
        <CIcon name="cil-laptop" size="xl"/>
      </div>
    </div>

    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8" lg="6" xl="5">
          
          <transition name="fade-up" appear>
            <CCard class="login-card border-0">
              <div class="card-top-stripe animated-stripe"></div>

              <CCardBody class="p-5 text-center position-relative z-index-1">
                
                <div class="mb-4 logo-wrapper">
                  <div class="d-flex justify-content-center align-items-center mb-3">
                    <img src="@/assets/logo.svg" height="100" class="logo-shadow" alt="MFU Logo" />
                  </div>

                  <h1 class="brand-title">ระบบแจ้งซ่อมออนไลน์</h1>
                  <h2 class="brand-subtitle">มหาวิทยาลัยแม่ฟ้าหลวง</h2>
                </div>

                <div class="my-4">
                  <button class="btn-google-premium mb-2" @click="handleLogin">
                    <div class="icon-box">
                      <span class="google-g">G</span>
                    </div>
                    <span class="btn-text">LOGIN เข้าใช้งานระบบ</span>
                  </button>

                  <small class="d-block mb-3 font-weight-bold" style="font-size: 0.85rem; color: #dc3545;">
                    * โปรดใช้ <strong>Lamduan mail</strong> ในการ login
                  </small>

                  <button class="btn-manual" @click="openManual">
                    <CIcon name="cil-book" size="sm" class="mr-2"/> คู่มือการใช้งาน
                  </button>
                </div>

                <hr class="my-4 separator">

                <div class="footer-info text-left">
                  <h6 class="font-weight-bold text-mfu-red mb-2">
                    <CIcon name="cil-contact" class="mr-1"/> ศูนย์บริการเทคโนโลยีสารสนเทศ
                  </h6>
                  
                  <ul class="list-unstyled small text-muted mb-3 contact-list">
                    <li><CIcon name="cil-location-pin" class="mr-2 icon-red"/> 333 หมู่ 1 ต.ท่าสุด อ.เมือง จ.เชียงราย 57100</li>
                    <li><CIcon name="cil-phone" class="mr-2 icon-red"/> 0-5391-6411</li>
                    <li><CIcon name="cil-envelope-closed" class="mr-2 icon-red"/> cits@mfu.ac.th</li>
                    <li>Facebook : CITS MFU</li>
                  </ul>

                  <div class="copyright-text text-center mt-4 pt-3 border-top">
                    <small>© 2025 ลิขสิทธิ์โดยศูนย์บริการเทคโนโลยีสารสนเทศ มหาวิทยาลัยแม่ฟ้าหลวง สงวนลิขสิทธิ์ทั้งหมด<br>© 2025 Center for Information Technology Services, Mae Fah Luang University. All rights reserved. </small>
                  </div>
                </div>

              </CCardBody>
              <div class="card-top-stripe animated-stripe"></div>
            </CCard>
          </transition>

        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    handleLogin() {
      this.$router.push('/dashboard'); 
    },
    openManual() {
      // ยังไม่ทำอะไร (ว่างไว้)
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600;700&display=swap');

/* --- 1. MFU Background + Repair Theme --- */
.c-app {
  font-family: 'Sarabun', sans-serif;
  background-color: #800000;
}

.bg-mesh-mfu {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(circle at center, #b31b1b 0%, #5e0d0d 100%);
  z-index: 0;
  overflow: hidden;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: float 15s infinite ease-in-out;
}
.blob-gold {
  top: -20%; left: -10%; width: 600px; height: 600px;
  background: #d4af37;
}
.blob-red {
  bottom: -20%; right: -10%; width: 500px; height: 500px;
  background: #ff3333;
}

.floating-icon {
  position: absolute;
  color: rgba(255, 255, 255, 0.05);
  z-index: 0;
  animation: floatIcon 20s infinite linear;
}
.icon-wrench { top: 15%; left: 10%; transform: rotate(-15deg) scale(4); }
.icon-gear { bottom: 10%; left: 80%; transform: rotate(20deg) scale(5); animation-duration: 30s; }
.icon-hammer { top: 60%; right: 85%; transform: rotate(45deg) scale(3); }

@keyframes floatIcon {
  0% { transform: translateY(0) rotate(0deg) scale(4); }
  50% { transform: translateY(-20px) rotate(10deg) scale(4); }
  100% { transform: translateY(0) rotate(0deg) scale(4); }
}

/* --- 2. Card Styling --- */
.login-card {
  background: rgba(255, 255, 255, 0.98);
  border-radius: 16px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
  overflow: hidden;
}

/* --- Animated Stripe (แถบเลื่อนได้) --- */
.animated-stripe {
  height: 8px;
  background: repeating-linear-gradient(
    45deg,
    #d4af37,
    #d4af37 10px,
    #b31b1b 10px,
    #b31b1b 20px
  );
  background-size: 40px 100%; 
  animation: stripe-flow 1.5s linear infinite; 
}

@keyframes stripe-flow {
  from { background-position: 0 0; }
  to { background-position: 40px 0; } 
}


/* --- 3. Branding & Repair Badge --- */
.brand-title {
  color: #800000;
  font-weight: 800;
  margin-bottom: 0;
  font-size: 1.75rem;
}
.brand-subtitle {
  color: #555;
  font-weight: 800;
  margin-bottom: 0;
  font-size: 1.1rem;
}

/* --- 4. Buttons --- */
.btn-google-premium {
  width: 100%;
  height: 56px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 6px;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
}
.btn-google-premium:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4);
}

/* ปุ่มคู่มือ (ปุ่มรอง) */
.btn-manual {
  background: transparent;
  border: 1px solid #e0e0e0;
  color: #757575;
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
}
.btn-manual:hover {
  background-color: #f5f5f5;
  border-color: #b31b1b;
  color: #b31b1b;
}
.btn-manual:active {
  transform: translateY(1px);
}

.icon-box {
  width: 44px;
  height: 44px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.google-g {
  font-family: 'Arial', sans-serif;
  font-weight: 900;
  font-size: 26px;
  background: linear-gradient(45deg, #4285F4, #34A853, #FBBC05, #EA4335);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.btn-text {
  flex-grow: 1;
  text-align: center;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  padding-right: 44px;
}

/* --- 5. Footer --- */
.text-mfu-red { color: #b31b1b; }
.icon-red { color: #b31b1b; font-size: 0.9rem; }
.contact-list li { margin-bottom: 6px; display: flex; align-items: flex-start; }
.separator { border-top: 1px dashed #ddd; }

.copyright-text small { color: #aaa; font-size: 0.7rem; }

/* --- Animation --- */
.fade-up-enter-active { transition: all 0.8s ease; }
.fade-up-enter { opacity: 0; transform: translateY(30px); }
</style>