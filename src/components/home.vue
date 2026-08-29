<template>
  <div class="w-full max-w-[390px] min-h-screen mx-auto bg-[#EDF0F6] pb-[100px]">
   
    <div class="px-5 pt-6">
      <div class="flex justify-between items-center">
        <div>
          <div class="flex items-center gap-1 cursor-pointer text-[13px] text-gray-500">
            <span><i class="fa-solid fa-location-dot"></i></span>
            <span>Izboskan, Andijon</span>
          </div>
        </div>

        <div class="relative top-[0px]">
          <button
            class="w-[45px] h-[45px] flex items-center justify-center"
          >
            <img
              src="https://img.icons8.com/fluency-systems-regular/48/appointment-reminders--v1.png"
              class="w-6 h-6"
            />
          </button>

          
        </div>
      </div>
    </div>

    <!-- Search -->

    <div class="px-5 mt-7">
      <div class="flex gap-3">
        <div class="flex-1 relative">
         <router-link to="/search">
          <input
            type="search"
            placeholder="Qidirish..."
            class="w-full h-[52px] rounded-2xl bg-white pl-12 pr-4 outline-none"
          />
         </router-link>

          <img
            src="https://img.icons8.com/ios/50/search--v1.png"
            class="w-5 h-5 absolute top-4 left-4"
          />
        </div>

        <button
          class="w-[52px] h-[52px] rounded-2xl bg-blue-600 flex items-center justify-center"
        >
          <img
            class="w-5 h-5 text-white z-[999] top-4 left-4"
            width="30"
            height="30"
            src="https://img.icons8.com/ios-glyphs/30/search--v1.png"
            alt="search--v1"
          />
        </button>
      </div>
    </div>

    <!-- Yo'nalishlar -->

    <div class="px-5 mt-8">
      <div class="flex justify-between">
        <h2 class="text-[22px] font-semibold">Yo'nalishlar</h2>

        <span class="text-blue-600 text-[14px] cursor-pointer" @click="$router.push('/courses')"> Barchasi </span>
      </div>

      <div class="grid grid-cols-4 gap-3 mt-5">
        <!-- Card -->
        <router-link
          to="/courses?category=Dasturlash"
          class="bg-white rounded-2xl h-[90px] flex flex-col justify-center items-center shadow-sm cursor-pointer"
        >
          <img src="/4.png" class="w-8 h-8" />
          <p class="text-[11px] mt-2 text-center">Dasturlash</p>
        </router-link>

        <router-link
          to="/courses?category=Web%20Dasturlash"
          class="bg-white rounded-2xl h-[90px] flex flex-col justify-center items-center shadow-sm cursor-pointer"
        >
          <img src="/5.png" class="w-8 h-8" />
          <p class="text-[11px] mt-2 text-center">Web</p>
        </router-link>

        <router-link
          to="/courses?category=Grafik%20dizayn"
          class="bg-white rounded-2xl h-[90px] flex flex-col justify-center items-center shadow-sm cursor-pointer"
        >
          <img src="/6.png" class="w-8 h-8" />
          <p class="text-[11px] mt-2 text-center">Dizayn</p>
        </router-link>

        <router-link
          to="/courses?category=Mobil%20dasturlash"
          class="bg-white rounded-2xl h-[90px] flex flex-col justify-center items-center shadow-sm cursor-pointer"
        >
          <img src="/7.png" class="w-8 h-8" />
          <p class="text-[11px] mt-2 text-center">Mobile</p>
        </router-link>

        <router-link
          to="/courses?category=Sun%27iy%20intellekt"
          class="bg-white rounded-2xl h-[90px] flex flex-col justify-center items-center shadow-sm cursor-pointer"
        >
          <img src="/8.png" class="w-8 h-8" />
          <p class="text-[11px] mt-2 text-center">AI</p>
        </router-link>

        <router-link
          to="/courses?category=Robototexnika"
          class="bg-white rounded-2xl h-[90px] flex flex-col justify-center items-center shadow-sm cursor-pointer"
        >
          <img src="/9.png" class="w-8 h-8" />
          <p class="text-[11px] mt-2 text-center">Robot</p>
        </router-link>
      </div>
    </div>

    <!-- Banner -->

    <div class="px-5 mt-8">
      <div
        class="w-full h-[170px] rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-400 p-6 text-white relative overflow-hidden"
      >
        <h2 class="text-black font-medium w-[380px]">
          Bo'sh vaqtingizni tanlang biz bilan o'rganing
        </h2>

        <h3 class="text-[#fff] font-medium mt-[15px]">Sizga mos guruhlarni topamiz</h3>

        <router-link to="/matching_group">
          <button
            class="mt-[20px] bg-white text-blue-600 font-semibold pl-[20px] pr-[20px] rounded-xl"
          >
            Boshlash
          </button>

          <img
            src="/10.png"
            class="absolute w-[100px] h-[100px] cursor-pointer right-[10px] bottom-[10px]"
          />
        </router-link>
      </div>
    </div>

    <!-- Mashhur kurslar -->

    <div class="px-5 mt-8">
      <div class="flex justify-between items-center">
        <h2 class="text-[22px] font-bold">Mashhur kurslar</h2>

        <span class="text-blue-600 text-sm cursor-pointer" @click="$router.push('/courses')"> Barchasi </span>
      </div>

      <!-- Cards -->
      <router-link
        v-for="course in popularCourses"
        :key="course.id"
        :to="{ path: '/joybandqilish', query: { course: course.id } }"
        class="mt-5 bg-white rounded-3xl p-4 shadow block"
      >
        <img :src="course.image" class="w-full h-[170px] object-cover rounded-2xl" />

        <div class="flex justify-between mt-4">
          <div>
            <h3 class="font-bold text-[19px]">{{ course.title }}</h3>

            <p class="text-gray-500 text-sm">{{ course.teacher }}</p>
          </div>

          <div
            class="w-11 h-11 rounded-full bg-blue-600 flex justify-center items-center text-white"
          >
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </router-link>

      <div v-if="loadingCourses" class="mt-5 text-center text-gray-500 text-sm">
        Kurslar yuklanmoqda...
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const API_URL = "https://edumatch1.up.railway.app/api/courses/";

const popularCourses = ref([]);
const loadingCourses = ref(true);

onMounted(async () => {
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      const data = await response.json();
      popularCourses.value = (Array.isArray(data) ? data : data.results || []).slice(0, 4);
    }
  } catch (e) {
    console.error(e);
  } finally {
    loadingCourses.value = false;
  }
});
</script>
