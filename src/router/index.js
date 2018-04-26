import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: require('@/components/Login'),
    },
    {
      path: '/passlist/',
      name: 'PassList',
      component: require('@/components/PassList'),
    },
    {
      path: '/passadd/:id/',
      name: 'PassAdd',
      component: require('@/components/PassAdd'),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
