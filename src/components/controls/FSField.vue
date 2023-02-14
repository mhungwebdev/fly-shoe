<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import { TypeControl } from '@/enums/type-control';
import { ref } from 'vue';
import {FSTextBox,FSDateBox} from '.';

const props = withDefaults(defineProps<{
    typeControl:TypeControl,
}>(),{
    typeControl:TypeControl.Text,
})

const component = ref();

switch(props.typeControl){
    case TypeControl.Text:
        component.value = FSTextBox;
        break;
    case TypeControl.DateBox:
        component.value = FSDateBox
        break;
    case TypeControl.MultiLine:
        break;
    case TypeControl.SingleSelect:
        break;
    case TypeControl.MultiSelect:
        break;
    default:
        break;
}

</script>

<style scoped>

</style>