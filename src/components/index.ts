import { defineAsyncComponent } from 'vue';

const FSButton = defineAsyncComponent(() => import('./FSButton.vue'));
const FSTextBox = defineAsyncComponent(() => import('./FSTextBox.vue'));

export {
    FSButton,
    FSTextBox
}