<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import BottomBar from './components/BottomBar.vue'

const route = useRoute()

const showBottomBar = computed(() => {
  return ['home', 'sizuchun_mos_guruhlar', 'search', 'profil', 'sevimlilar', 'category_courses'].includes(route.name)
})
</script>

<template>
  <RouterView />
  <BottomBar v-if="showBottomBar" />
</template>
