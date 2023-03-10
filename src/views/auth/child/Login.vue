<template>
  <div class="login dis-flex flex-column align-center p-16 flex-1">
    <div class="title font-32 font-weight-700 mb-24">Đăng nhập</div>
    <FSTextBox
      ref="fsTextBox"
      v-model="email"
      :is-focused="true"
      :config="{
        mode: 'email',
        label: 'Email',
        labelMode: 'floating',
        placeholder: 'Nhập email',
        width: 300,
        elementAttr: { class: 'mb-16' },
      }"
    />

    <FSTextBox
      v-model="password"
      :config="{
        mode: 'password',
        label: 'Mật khẩu',
        labelMode: 'floating',
        placeholder: 'Nhập mật khẩu',
        width: 300,
        elementAttr: { class: 'mb-32' },
      }"
    />

    <div class="dis-flex">
      <FSButton
        :is-loading="isLoadingLogin"
        :config="{
          text: 'Đăng nhập',
          stylingMode: 'contained',
          type: 'default',
          elementAttr: { class: 'mr-12' },
          onClick: login,
        }"
      />

      <FSButton
        :config="{
          text: 'Đăng ký',
          stylingMode: 'outlined',
          type: 'default',
          elementAttr: { class: 'ml-12' },
          onClick: () => $router.push('/register'),
        }"
      />
    </div>

    <div class="dis-flex jus-center w-100pc mt-16 mb-16">hoặc</div>
    <div class="button-social-group dis-flex">
      <FSButton
        :config="{
          icon: 'icon-facebook',
          elementAttr: { class: 'mr-4' },
          stylingMode: 'outlined',
          type: 'default',
          onClick: loginWithFacebook,
        }"
      />
      <FSButton
        :config="{
          icon: 'icon-google',
          elementAttr: { class: 'ml-4' },
          stylingMode: 'outlined',
          type: 'default',
          onClick: loginWithGoogle,
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  FacebookAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@firebase/auth";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useFirebaseAuth } from "vuefire";
import { FSButton, FSTextBox } from "@/components/controls";
import { fbProvider, ggProvider } from "@/firebase";

const auth = useFirebaseAuth();
const email = ref<string>("");
const password = ref<string>("");
const $router = useRouter();

const fsTextBox = ref<InstanceType<typeof FSTextBox>>();
const isLoadingLogin = ref<boolean>(false);

const focusFirstInput = () => {
  fsTextBox.value?.focusInput();
};

defineExpose({
  focusFirstInput,
});

const isLogin = computed(() => {
  return !(email.value == "" || password.value == "");
});

/**
 * đăng nhập với email và mật khẩu
 */
const login = () => {
  if (isLogin.value) {
    if (auth != null) {
      isLoadingLogin.value = true;
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredentials) => {
          $router.push("/");
          isLoadingLogin.value = false;
        })
        .catch((error) => {
          isLoadingLogin.value = false;
          console.log(error);
        });
    }
  }
};

const loginWithFacebook = () => {
  if (!auth) return;
  const auth_V2 = getAuth();
  signInWithPopup(auth_V2, fbProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      const credential = FacebookAuthProvider.credentialFromResult(result);
      $router.push("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

const loginWithGoogle = () => {
  if (!auth) return;
  const auth_V2 = getAuth();
  signInWithPopup(auth_V2, ggProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      const credential = FacebookAuthProvider.credentialFromResult(result);
      $router.push("/");
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style lang="scss" scoped>
.login {
  width: 300px;

  .title {
    color: var(--app-color-primary);
  }
}
</style>
