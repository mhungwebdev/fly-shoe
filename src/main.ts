import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { VueFire, VueFireAuth } from 'vuefire';
import 'devextreme/dist/css/dx.light.css';
import '@/common/scss/index.scss';
import { firebaseApp } from './firebase';
import "@/common/css/index.css";

const app = createApp(App)

app.use(router)

app.use(VueFire, {
  firebaseApp: firebaseApp,
  modules: [
    // ... other modules
    VueFireAuth(),
  ],
})
app.mount('#app')
