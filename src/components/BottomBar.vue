<template>
  <div
    class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] h-[75px] bg-white rounded-t-3xl shadow flex justify-around items-center z-50"
  >
    <RouterLink
      to="/home"
      class="text-center cursor-pointer"
      :class="route.name === 'home' ? 'text-blue-600' : 'text-gray-700'"
    >
      <i class="fa-regular fa-house w-9 mx-auto text-[20px] text-blue-500"></i>
      <p class="text-xs mt-1">Home</p>
    </RouterLink>

    <RouterLink
      to="/search"
      class="text-center cursor-pointer"
      :class="route.name === 'search' ? 'text-blue-600' : 'text-gray-700'"
    >
      <i class="fa-solid fa-magnifying-glass text-[20px] mx-auto"></i>
      <p class="text-xs mt-1">Search</p>
    </RouterLink>

    <RouterLink
      to="/sevimlilar"
      class="text-center cursor-pointer"
      :class="route.name === 'sevimlilar' ? 'text-blue-600' : 'text-gray-700'"
    >
      <i class="fa-regular fa-heart w-7 mx-auto text-[20px]"></i>
      <p class="text-xs mt-1">Like</p>
    </RouterLink>

    <RouterLink
      to="/profil"
      class="text-center cursor-pointer"
      :class="route.name === 'profil' ? 'text-blue-600' : 'text-gray-700'"
    >
      <i class="fa-regular fa-user w-8 mx-auto text-[20px]"></i>
      <p class="text-xs mt-1">Profile</p>
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
</script>
