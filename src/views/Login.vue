<template>
  <div class="container">
    <div class="form br-4 dis-flex">
      <div class="left dis-flex flex-column align-center p-16 flex-1">
        <div class="title font-20 font-weight-700 mb-20">Đăng nhập</div>
        <FSTextBox v-model:value="email" :is-focused="true" :config="{
          mode: 'email',
          label: 'Email',
          labelMode: 'floating',
          placeholder: 'Nhập email',
          width: 300,
          elementAttr: { class: 'mb-4' },
        }" />

        <FSTextBox v-model:value="password" :config="{
          mode: 'password',
          label: 'Mật khẩu',
          labelMode: 'floating',
          placeholder: 'Nhập mật khẩu',
          validationMessageMode: 'always',
          width: 300,
          elementAttr: { class: 'mb-20' }
        }" />

        <div class="dis-flex">
          <FSButton :config="{
            text: 'Đăng ký',
            stylingMode: 'outlined',
            type: 'default',
            elementAttr: { class: 'mr-4' }
          }" />

          <FSButton :config="{
            text: 'Đăng nhập',
            stylingMode: 'contained',
            type: 'default',
            elementAttr: { class: 'ml-4' },
            onClick:login
          }" />
        </div>

        <div class="dis-flex jus-center w-100pc mt-8 mb-8">hoặc</div>
        <div class="button-social-group dis-flex">
          <FSButton :config="{ elementAttr: { class: 'mr-4' }, text: 'F' }" />
          <FSButton :config="{ elementAttr: { class: 'ml-4' }, text: 'G' }" />
        </div>
      </div>
      <div class="right height-auto"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  signInWithEmailAndPassword
} from "@firebase/auth";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useFirebaseAuth } from "vuefire";
import { FSButton, FSTextBox } from '@/components';

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
  console.log({email:email.value,password:password.value});
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

  .form {
    background-color: white;
    height: 400px;
    width: 600px;

    .right {
      background-image: url('@/common/images/image-description-01.jpg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      min-width: 300px;
    }
  }
}
</style>
