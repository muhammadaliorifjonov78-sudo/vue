<template>
  <div class="w-full max-w-[390px] min-h-screen mx-auto bg-[#EDF0F6] pb-[80px]">

    <!-- Header -->
    <div class="px-[15px] pt-[22px]">
      <h1 class="text-[22px] font-bold">
        Qidirish
      </h1>

      <!-- Search -->
      <div class="relative mt-[15px]">
        <input
          v-model="searchText"
          type="text"
          placeholder="Kurs yoki o'qituvchini qidiring"
          class="w-full h-[48px] bg-white rounded-[10px] pl-[45px] pr-[40px] outline-none border border-transparent focus:border-blue-500 text-[13px]"
        />

        <i
          class="fa-solid fa-magnifying-glass absolute left-[16px] top-[16px] text-gray-400"
        ></i>

        <button
          v-if="searchText"
          @click="searchText = ''"
          class="absolute right-[15px] top-[13px]"
        >
          <i class="fa-solid fa-xmark text-gray-400"></i>
        </button>
      </div>
    </div>


    <!-- Yo'nalishlar -->
    <div class="px-[15px] mt-[25px]">

      <div class="flex items-center justify-between">
        <h2 class="text-[17px] font-semibold">
          Yo'nalishlar
        </h2>

        <span class="text-[11px] text-blue-600 cursor-pointer">
          Barchasi
        </span>
      </div>


      <div class="grid grid-cols-2 gap-[10px] mt-[12px]">

        <div
          v-for="category in categories"
          :key="category.name"
          @click="selectCategory(category.name)"
          :class="
            selectedCategory === category.name
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-200'
          "
          class="h-[52px] rounded-[10px] border flex items-center px-[12px] gap-[9px] cursor-pointer transition"
        >

          <i
            :class="category.icon"
            class="text-[15px]"
          ></i>

          <span class="text-[11px] font-medium">
            {{ category.name }}
          </span>

        </div>

      </div>

    </div>


    <!-- Natijalar -->
    <div class="px-[15px] mt-[25px]">

      <div class="flex items-center justify-between">

        <h2 class="text-[17px] font-semibold">
          {{ searchText ? "Qidiruv natijalari" : "Mashhur kurslar" }}
        </h2>

        <span class="text-[10px] text-gray-500">
          {{ filteredCourses.length }} ta
        </span>

      </div>


      <!-- Course cards -->
      <div class="mt-[12px] space-y-[10px]">

        <router-link
          v-for="course in filteredCourses"
          :key="course.id"
          :to="{ path: '/joybandqilish', query: { course: course.id } }"
          class="bg-white rounded-[11px] p-[10px] flex gap-[10px]"
        >

          <!-- Image -->
          <img
            :src="course.image"
            class="w-[85px] h-[85px] rounded-[8px] object-cover"
            alt=""
          />


          <!-- Info -->
          <div class="flex-1 min-w-0">

            <div class="flex justify-between">

              <div class="min-w-0">

                <p class="text-[9px] text-blue-600 font-medium">
                  {{ course.category }}
                </p>

                <h3 class="text-[13px] font-semibold mt-[2px] truncate">
                  {{ course.title }}
                </h3>

              </div>

              <button
                @click.stop="toggleFavorite(course)"
                class="ml-[5px] w-[25px] h-[25px] flex items-center justify-center"
              >
                <i
                  :class="
                    course.favorite
                      ? 'fa-solid fa-heart text-red-500'
                      : 'fa-regular fa-heart text-gray-400'
                  "
                  class="text-[15px]"
                ></i>
              </button>

            </div>


            <p class="text-[9px] text-gray-500 mt-[5px]">
              <i class="fa-solid fa-user mr-[4px]"></i>
              {{ course.teacher }}
            </p>

            <div class="flex items-center gap-[8px] mt-[4px]">

              <span class="text-[9px] text-yellow-500">
                <i class="fa-solid fa-star"></i>
                {{ course.rating }}
              </span>

              <span class="text-[9px] text-gray-400">
                {{ course.students }} o'quvchi
              </span>

            </div>

            <p class="text-[11px] font-bold mt-[5px]">
              {{ formatPrice(course.price) }} so'm
            </p>

          </div>

        </router-link>


        <!-- Empty -->
        <div
          v-if="filteredCourses.length === 0"
          class="bg-white rounded-[12px] py-[45px] text-center"
        >

          <i
            class="fa-solid fa-magnifying-glass text-[35px] text-gray-300"
          ></i>

          <p class="text-[13px] font-semibold mt-[12px]">
            Kurs topilmadi
          </p>

          <p class="text-[10px] text-gray-400 mt-[5px]">
            Boshqa kurs yoki o'qituvchi nomini qidiring
          </p>

        </div>

      </div>

    </div>




  </div>
</template>


<script setup>

import { ref, computed, onMounted } from "vue";

const API_URL = "https://edumatch1.up.railway.app/api/courses/";

const searchText = ref("");

const selectedCategory = ref("");

const courses = ref([]);
const loading = ref(true);


const categories = [
  {
    name: "Dasturlash",
    icon: "fa-solid fa-code",
  },
  {
    name: "Web Dasturlash",
    icon: "fa-solid fa-globe",
  },
  {
    name: "Grafik dizayn",
    icon: "fa-solid fa-pen-nib",
  },
  {
    name: "Mobil dasturlash",
    icon: "fa-solid fa-mobile-screen",
  },
  {
    name: "Sun'iy intellekt",
    icon: "fa-solid fa-robot",
  },
  {
    name: "Robototexnika",
    icon: "fa-solid fa-microchip",
  },
];


const formatPrice = (price) => new Intl.NumberFormat("uz-UZ").format(price || 0);


const loadCourses = async () => {
  loading.value = true;
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error();
    const data = await response.json();
    courses.value = (Array.isArray(data) ? data : data.results || []).map((c) => ({
      ...c,
      favorite: false,
    }));
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};


const selectCategory = (category) => {

  if (selectedCategory.value === category) {
    selectedCategory.value = "";
  } else {
    selectedCategory.value = category;
  }

};


const filteredCourses = computed(() => {

  let result = courses.value;

  if (selectedCategory.value) {

    result = result.filter(
      (course) =>
        course.category === selectedCategory.value
    );

  }


  if (searchText.value.trim()) {

    const text = searchText.value.toLowerCase();

    result = result.filter((course) =>
      (course.title || "").toLowerCase().includes(text) ||
      (course.teacher || "").toLowerCase().includes(text) ||
      (course.category || "").toLowerCase().includes(text)
    );

  }

  return result;

});


const toggleFavorite = (course) => {

  course.favorite = !course.favorite;

};

onMounted(loadCourses);

</script>