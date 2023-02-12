<template>
    <div class="fs-text-box-container">
        <DxTextBox ref="dxTextBox" />
    </div>
</template>

<script setup lang="ts">
import DxTextBox from 'devextreme-vue/text-box';
import { ref,watch } from 'vue';

const props = withDefaults(defineProps<{
    config:DxTextBox
}>(),{
    config:DxTextBox
});

const dxTextBox = ref<DxTextBox>()

watch(
    () => props.config,
    (newValue) => {
        dxTextBox.value?.instance?.option(newValue);
    },
    {
        deep:true,
        immediate:true
    }
)

</script>

<style scoped>

</style>