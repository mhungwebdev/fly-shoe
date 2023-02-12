<template>
    <div class="fs-text-box-container">
        <DxTextBox ref="dxTextBox" />
    </div>
</template>

<script setup lang="ts">
import DxTextBox from 'devextreme-vue/text-box';
import { ref,watch,onMounted } from 'vue';

const props = withDefaults(defineProps<{
    config:DxTextBox,
    isFocused?:boolean,
}>(),{
    config:DxTextBox,
    isFocused:false
});

const dxTextBox = ref<DxTextBox>()

onMounted(() => {
    dxTextBox.value?.instance?.option(props.config);
    if(props.isFocused) focusInput();
}),

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

const focusInput = () => {
    dxTextBox.value?.instance?.focus();
}
</script>

<style scoped>

</style>