<template>
    <div class="fs-text-box-container">
        <DxTextBox v-model="internalValue" ref="dxTextBox" />
    </div>
</template>

<script setup lang="ts">
import DxTextBox from 'devextreme-vue/text-box';
import { ref,watch,onMounted,computed } from 'vue';

const props = withDefaults(defineProps<{
    config:DxTextBox,
    isFocused?:boolean,
    value?:any;
}>(),{
    config:DxTextBox,
    isFocused:false
});

const emit = defineEmits(['value:update'])

const internalValue = computed(({
    get() {
      return props.value;
    },
    set(val) {
      emit('value:update',val);
    }
  }))

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