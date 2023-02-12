<template>
  <div class="container">
    <div class="left">
      <div class="title">Đăng nhập</div>
      <FSTextBox 
        :is-focused="true"
        :config="{
          mode:'email'
        }" 
      />

      <FSTextBox 
        :config="{
          mode:'password'
        }" 
      />

      <div>hoặc</div>
      <div class="button-social-group">
        <FSButton :config="{icon:'facebook'}" />
        <FSButton :config="{icon:'google'}"/>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script setup lang="ts">
import {
signInWithEmailAndPassword
} from "@firebase/auth";
import { computed, ref,defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";
import { useFirebaseAuth } from "vuefire";

const FSTextBox = defineAsyncComponent(() => import("@/components/FSTextBox.vue"));
const FSButton = defineAsyncComponent(() => import("@/components/FSButton.vue"));

const auth = useFirebaseAuth();
const email = ref<string>("");
const password = ref<string>("");
const $router = useRouter();

const isLogin = computed(() => {
  return !(email.value == "" || password.value == "");
});

/**
 * đăng nhập với email và mật khẩu
 */
const login = () => {
  if (isLogin.value) {
    if (auth != null) {
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredentials) => {
          $router.push('/')
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('@/common/images/image-bg-authen.webp');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0px;
  box-sizing: border-box;
}
</style>
