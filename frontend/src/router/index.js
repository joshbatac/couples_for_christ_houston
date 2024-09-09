import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/views/LandingPage.vue';
import RegistrationPage from '@/views/RegistrationPage.vue';
import NewsAndArticlesPage from '@/views/NewsAndArticlesPage.vue';
import AboutUsPage from '@/views/AboutUsPage.vue';
import ANCOPPage from '@/views/ANCOPPage.vue';
import ContactUsPage from '@/views/ContactUsPage.vue';
import MinistryPage from '@/views/MinistryPage.vue';
import AnnoucementPage from '@/views/AnnoucementPage.vue';

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
  {
    path: '/ancop',
    name: 'ancop',
    component: ANCOPPage,
  },
  {
    path: '/contact-us',
    name: 'contact-us',
    component: ContactUsPage,
  },
  {
    path: '/ministry',
    name: 'ministry',
    component: MinistryPage,
  },
  {
  path: '/announcement',
  name: 'announcement',
  component: AnnoucementPage,
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
