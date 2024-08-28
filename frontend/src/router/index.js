import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import RegistrationPage from '../views/RegistrationPage.vue';
import NewsAndArticlesPage from '@/views/NewsAndArticlesPage.vue';
import AboutUsPage from '@/views/AboutUsPage.vue';

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegistrationPage,
  },
  {
    path: '/about-us',
    name: 'about-us',
    component: AboutUsPage,
  },
  {
    path: '/news',
    name: 'news',
    component: NewsAndArticlesPage,
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
