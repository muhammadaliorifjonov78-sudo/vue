<template>
  <div class="w-full max-w-[390px] min-h-screen mx-auto bg-[#EDF0F6] pb-[90px]">
    <nav class="flex items-center justify-between px-5 pt-5">
      <button @click="$router.back()" class="w-8 h-8 flex items-center justify-center">
        <i class="fa-solid fa-arrow-left text-gray-700"></i>
      </button>
      <h1 class="text-[20px] font-semibold">{{ category || "Barcha kurslar" }}</h1>
      <div class="w-8"></div>
    </nav>

    <div class="px-5 mt-5">
      <div class="relative">
        <input
          v-model="search"
          type="search"
          placeholder="Kurs yoki o'qituvchini qidiring"
          class="w-full h-[48px] bg-white rounded-xl pl-11 pr-4 outline-none border border-transparent focus:border-blue-500"
        />
        <i class="fa-solid fa-magnifying-glass absolute left-4 top-4 text-gray-400"></i>
      </div>
    </div>

    <div class="px-5 mt-6">
      <p class="text-[12px] text-gray-500">
        {{ loading ? "Kurslar yuklanmoqda..." : `${courses.length} ta kurs topildi` }}
      </p>
    </div>

    <div v-if="errorMessage" class="mx-5 mt-5 bg-red-50 text-red-600 rounded-xl p-4 text-[12px]">
      {{ errorMessage }}
    </div>

    <div v-else class="px-5 mt-3 space-y-4">
      <router-link
        v-for="course in courses"
        :key="course.id"
        :to="{ path: '/joybandqilish', query: { course: course.id } }"
        class="bg-white rounded-2xl p-3 shadow-sm block"
      >
        <img :src="course.image" class="w-full h-[155px] object-cover rounded-xl" alt="" />
        <div class="flex justify-between gap-3 mt-3">
          <div>
            <p class="text-[10px] text-blue-600 font-medium">{{ course.category }}</p>
            <h2 class="font-bold text-[17px] mt-1">{{ course.title }}</h2>
            <p class="text-[11px] text-gray-500 mt-1">
              <i class="fa-solid fa-user mr-1"></i>{{ course.teacher }}
            </p>
          </div>
          <div class="text-right">
            <p class="text-yellow-500 text-[12px]"><i class="fa-solid fa-star"></i> {{ course.rating }}</p>
            <p class="text-[10px] text-gray-400 mt-1">{{ course.students }} o'quvchi</p>
          </div>
        </div>
        <p class="font-bold text-[13px] mt-3">{{ formatPrice(course.price) }} so'm</p>
      </router-link>

      <div v-if="!loading && courses.length === 0" class="bg-white rounded-2xl p-8 text-center">
        <i class="fa-solid fa-magnifying-glass text-3xl text-gray-300"></i>
        <p class="font-semibold mt-3">Kurs topilmadi</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const API_URL = "https://edumatch1.up.railway.app/api/courses/";
const courses = ref([]);
const loading = ref(false);
const errorMessage = ref("");
const search = ref("");

const category = computed(() => String(route.query.category || "").trim());

const loadCourses = async () => {
  loading.value = true;
  errorMessage.value = "";
  try {
    const params = new URLSearchParams({ category: category.value });
    if (search.value.trim()) params.set("search", search.value.trim());
    const response = await fetch(`${API_URL}?${params.toString()}`);
    if (!response.ok) throw new Error();
    courses.value = await response.json();
  } catch {
    errorMessage.value = "Kurslarni yuklab bo'lmadi. Django serverni tekshiring.";
  } finally {
    loading.value = false;
  }
};

const formatPrice = (price) => new Intl.NumberFormat("uz-UZ").format(price);

onMounted(loadCourses);
watch([category, search], loadCourses);
</script>
