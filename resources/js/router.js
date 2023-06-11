import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from './components/Product.vue';
import RegisterComponent from './components/RegisterComponent.vue';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeComponent,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterComponent,
  },
];

const router = createRouter({
  history: createWebHistory('/management/public/'),
  routes,
});


export default router;