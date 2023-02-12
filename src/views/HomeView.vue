<template>
  <div>
    Home
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useFirebaseAuth } from "vuefire";

const auth = useFirebaseAuth();
const $router = useRouter();

const logout = () => {
  auth?.signOut().then(() => {
    $router.push("login");
  });
};
</script>

<style lang="scss" scoped>
button {
  height: 32px;
  border-radius: 4px;
  outline: none;
  border: 1px solid #333;
  border-radius: 4px;
  cursor: pointer;
  background: #fff;
  transition: all 0.1s linear;
  &:hover {
    border-color: teal;
    color: teal;
  }

  &:active {
    background-color: teal;
    color: #fff;
  }
}
</style>
