<template>
  <div class="w-[390px] min-h-screen mx-auto bg-[#EDF0F6] pb-[80px]">

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

        <div
          v-for="course in filteredCourses"
          :key="course.id"
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
                @click="toggleFavorite(course)"
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
              {{ course.price }}
            </p>

          </div>

        </div>


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

import { ref, computed } from "vue";


const searchText = ref("");

const selectedCategory = ref("");


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


const courses = ref([
  {
    id: 1,
    title: "Frontend Dasturlash",
    category: "Web Dasturlash",
    teacher: "Ali Valiyev",
    rating: "4.9",
    students: 120,
    price: "350 000 so'm",
    favorite: false,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },

  {
    id: 2,
    title: "Python Backend",
    category: "Dasturlash",
    teacher: "Sardor Karimov",
    rating: "4.8",
    students: 95,
    price: "300 000 so'm",
    favorite: true,
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935",
  },

  {
    id: 3,
    title: "Grafik Dizayn",
    category: "Grafik dizayn",
    teacher: "Aziza Xasanova",
    rating: "4.9",
    students: 80,
    price: "280 000 so'm",
    favorite: false,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5",
  },

  {
    id: 4,
    title: "Mobile Development",
    category: "Mobil dasturlash",
    teacher: "Jasur Aliyev",
    rating: "4.7",
    students: 64,
    price: "320 000 so'm",
    favorite: false,
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
  },
]);


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
      course.title.toLowerCase().includes(text) ||
      course.teacher.toLowerCase().includes(text) ||
      course.category.toLowerCase().includes(text)
    );

  }

  return result;

});


const toggleFavorite = (course) => {

  course.favorite = !course.favorite;

};

</script>