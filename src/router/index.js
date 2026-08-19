import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import home from '@/components/home.vue'
import split from '@/components/split.vue'
import login from '@/components/login.vue'
import register from '@/components/register.vue'
import verifyCode from '@/components/verify_code.vue'
import matching_group from '@/components/matching_group.vue'
import sizuchun_mos_guruhlar from '@/components/sizuchun_mos_guruhlar.vue'
import joybandqilish from '@/components/joybandqilish.vue'
import profil from '@/components/profil.vue'
import sevimlilar from '@/components/sevimlilar.vue'
import search from '@/components/search.vue'
import category_courses from '@/components/category_courses.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/homewiev', name: 'homewiev', component: HomeView, meta: { requiresAuth: true } },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
    { path: '/home', name: 'home', component: home, meta: { requiresAuth: true } },
    { path: '/', name: 'split', component: split },
    { path: '/login', name: 'login', component: login, meta: { guestOnly: true } },
    { path: '/register', name: 'register', component: register, meta: { guestOnly: true } },
    { path: '/verify-code', name: 'verify-code', component: verifyCode, meta: { guestOnly: true } },
    { path: '/matching_group', name: 'matching_group', component: matching_group, meta: { requiresAuth: true } },
    { path: '/sizuchun_mos_guruhlar', name: 'sizuchun_mos_guruhlar', component: sizuchun_mos_guruhlar, meta: { requiresAuth: true } },
    { path: '/joybandqilish', name: 'joybandqilish', component: joybandqilish, meta: { requiresAuth: true } },
    { path: '/profil', name: 'profil', component: profil, meta: { requiresAuth: true } },
    { path: '/sevimlilar', name: 'sevimlilar', component: sevimlilar, meta: { requiresAuth: true } },
    { path: '/search', name: 'search', component: search, meta: { requiresAuth: true } },
    { path: '/courses', name: 'category_courses', component: category_courses, meta: { requiresAuth: true } },
  ],
})

router.beforeEach((to) => {
  const verified = localStorage.getItem('verified') === 'true'
  const token = localStorage.getItem('auth_token')

  if (to.meta.requiresAuth && (!verified || !token)) {
    return { name: 'login' }
  }

  if (to.meta.guestOnly && verified && token && to.name !== 'verify-code') {
    return { name: 'home' }
  }
})

export default router
