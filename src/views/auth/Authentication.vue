<template>
  <div class="container pos-relative">
    <div class="form br-4 dis-flex overflow-hidden pos-relative">
      <Login ref="loginRef" />
      <Register ref="registerRef" :first-focus="isFirstFocusInput" />

      <div
        :class="positionPoster == Position.Left ? 'left' : 'right'"
        class="poster pos-absolute h-100pc w-50pc"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Register from "./child/Register.vue";
import Login from "./child/Login.vue";
import { useRouter } from "vue-router";
import { onUpdated, ref, onMounted,computed } from "vue";

enum Position {
  Left = 1,
  Right = 2,
}

const $router = useRouter();
const pathLogin = "/login";

const positionPoster = ref<Position>();
const loginRef = ref<InstanceType<typeof Login>>();
const registerRef = ref<InstanceType<typeof Register>>();

const isFirstFocusInput = computed<boolean>(() => {
  if ($router.currentRoute.value.path == pathLogin)
    return false
  
  return true;
})

const getPositionPoster = () => {
  if ($router.currentRoute.value.path == pathLogin)
    positionPoster.value = Position.Right;
  else positionPoster.value = Position.Left;
};
onMounted(() => {
  getPositionPoster();
});

onUpdated(() => {
  getPositionPoster();

  if ($router.currentRoute.value.path == pathLogin)
    loginRef.value?.focusFirstInput();
  else registerRef.value?.focusFirstInput();
});
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("@/common/images/image-bg-authen.webp");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0px;
  box-sizing: border-box;

  .form {
    background-color: white;
    height: 400px;
    filter: drop-shadow(4px 3px 20px var(--app-color-primary));

    .poster {
      background-image: url("@/common/images/image-description-02.jpg");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      min-width: 300px;
      transition: all 0.5s ease-in-out;
      left: 0;
      top: 0;
    }

    .poster.left {
      transform: translate(0%, 0px);
    }

    .poster.right {
      transform: translate(100%, 0px);
    }
  }
}
</style>
