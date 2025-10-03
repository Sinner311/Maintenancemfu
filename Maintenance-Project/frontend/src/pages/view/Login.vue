<template>
  <div>
    <div class="c-app flex-row align-items-center">
      <CContainer>
        <CRow class="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard>
                <CCardBody class="p-0 border-bottom">
                  <CRow>
                    <CCol class="px-5 py-4">
                      <CForm class="pl-2">
                        <img src="@/assets/logo.svg" height="150px" />
                        <h1>Login</h1>
                        <p class="text-muted">Sign In to your account</p>
                        <CInput
                          placeholder="Username"
                          autocomplete="username email"
                        >
                          <template #prepend-content
                            ><CIcon name="cil-user"
                          /></template>
                        </CInput>
                        <CInput
                          placeholder="Password"
                          type="password"
                          autocomplete="curent-password"
                        >
                          <template #prepend-content
                            ><CIcon name="cil-lock-locked"
                          /></template>
                        </CInput>
                        <CRow>
                          <CCol col="6" class="text-left">
                            <CButton
                              href="#/mockup/admin"
                              color="primary"
                              class="px-4"
                              >Login</CButton
                            >
                          </CCol>
                          <CCol col="6" class="text-right">
                            <CButton color="link" class="px-0"
                              >Forgot password?</CButton
                            >
                            <CButton color="link" class="d-lg-none"
                              >Register now!</CButton
                            >
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCol>
                    <CCol>
                      <CCard
                        color="primary"
                        text-color="white"
                        class="text-center py-5 d-md-down-none h-100"
                        body-wrapper
                      >
                        <CCardBody>
                          <h2>Welcome</h2>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                          </p>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                </CCardBody>

                <CCardBody class="p-0 m-0">
                  <CCard
                    text-color="dark"
                    class="d-md-down-none h-100 mb-0"
                    body-wrapper
                  >
                    <CCardBody>
                      <h4>Contact Us</h4>
                      <CRow
                        ><CCol>
                          <p class="mb-1">
                            ศูนย์บริการเทคโนโลยีสารสนเทศ มหาวิทยาลัยแม่ฟ้าหลวง
                          </p>
                          <p class="mb-3">333 หมู่ 1 ต.ท่าสุด อ.เมือง จ.เชียงราย 57100</p>
                          <p class="mb-1">โทรศัพท์. 0-5391-6411</p> </CCol
                        ><CCol>
                          <p class="mb-3">Email: cits@mfu.ac.th</p>
                          <p>Facebook: CITS MFU</p>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheFooter from "../../components/TheFooter";

export default {
  name: "Login",
  components: {
    TheFooter,
  },
};
</script>
