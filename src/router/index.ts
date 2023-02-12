import { createRouter, createWebHistory } from 'vue-router';
import { useCurrentUser } from 'vuefire';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component:() => import('@/views/HomeView.vue'),
      meta:{
        requiresAuth: true,
      }
    },
    {
      path:'/register',
      component:() => import('@/views/Register.vue'),
    },
    {
      path:'/login',
      component:() => import('@/views/Login.vue'),
    },{
      path:'/demo-control',
      component:() => import('@/views/DemoControl.vue'),
    }
  ]
})

const getCurrentUser = ():any => {
  const user = useCurrentUser().value;

  return user;
}

router.beforeEach(async (to) => {
  // routes with `meta: { requiresAuth: true }` will check for the users, others won't
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser()
    // if the user is not logged in, redirect to the login page
    if (!currentUser) {
      return {
        path: '/login',
      }
    }
  }
})

export default router
