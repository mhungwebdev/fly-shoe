<template>
  <div class="ms-button">
    <FSButton
      :config="{
        text:'Lưu',
        type:'default',
        stylingMode:'contained',
        icon:'home',
        onClick:shouldLoading
      }"
      :is-loading="isLoadingBtn"
    />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent,ref } from "vue";

const FSButton = defineAsyncComponent(
  () => import("@/components/FSButton.vue")
);

const isLoadingBtn = ref<boolean>(false);

const shouldLoading = async () => {
    isLoadingBtn.value = true;

    await new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(1)
        },2000)
    })

    isLoadingBtn.value = false;
}

</script>

<style scoped></style>
