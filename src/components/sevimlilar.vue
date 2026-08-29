<template>
  <div class="w-full max-w-[390px] min-h-screen mx-auto bg-[#EDF0F6] pb-[75px]">

    <!-- HEADER -->
    <div class="px-[15px] pt-[25px] flex items-center justify-between">

      <h1 class="text-[20px] font-bold">
        Sevimlilar
      </h1>

      <i
        class="fa-regular fa-bell text-[18px] text-gray-700"
      ></i>

    </div>


    <!-- TITLE -->
    <div class="px-[15px] mt-[25px]">

      <h2 class="text-[16px] font-semibold">
        Saqlangan guruhlar
      </h2>

      <p class="text-[11px] text-gray-500 mt-[5px]">
        Siz saqlagan guruhlar shu yerda ko'rinadi
      </p>

    </div>


    <!-- GROUP CARDS -->
    <div class="px-[10px] mt-[18px] space-y-[10px]">

      <div
        v-for="group in groups"
        :key="group.id"
        class="bg-white rounded-[10px] p-[10px] shadow-sm"
      >

        <!-- TOP -->
        <div class="flex gap-[10px]">

          <!-- IMAGE -->
          <img
            :src="group.image"
            class="w-[85px] h-[85px] rounded-[8px] object-cover"
            alt="group"
          />

          <!-- INFO -->
          <div class="flex-1 min-w-0">

            <div class="flex justify-between items-start">

              <div>
                <p class="text-[9px] text-emerald-600 font-medium">
                  {{ group.center }}
                </p>

                <h3 class="text-[14px] font-semibold mt-[3px]">
                  {{ group.title }}
                </h3>
              </div>

              <!-- HEART -->
              <button
                @click="removeGroup(group.id)"
                class="w-[28px] h-[28px] flex items-center justify-center"
              >
                <i
                  class="fa-solid fa-heart text-red-400 text-[17px]"
                ></i>
              </button>

            </div>


            <!-- INFO -->
            <div class="mt-[7px] space-y-[3px]">

              <p class="text-[9px] text-gray-600">
                <i class="fa-regular fa-calendar mr-[5px]"></i>
                {{ group.days }}
              </p>

              <p class="text-[9px] text-gray-600">
                <i class="fa-regular fa-clock mr-[5px]"></i>
                {{ group.time }}
              </p>

              <p class="text-[9px] text-gray-600">
                <i class="fa-solid fa-users mr-[5px]"></i>
                {{ group.students }}
              </p>

            </div>

          </div>

        </div>


        <!-- BOTTOM -->
        <div
          class="mt-[9px] pt-[8px] border-t border-gray-100 flex items-center justify-between"
        >

          <div class="flex items-center gap-[5px]">

            <i class="fa-solid fa-star text-yellow-400 text-[11px]"></i>

            <span class="text-[10px] font-medium">
              {{ group.rating }}
            </span>

            <span class="text-[9px] text-gray-400">
              ({{ group.reviews }})
            </span>

          </div>

          <div class="flex items-center gap-[5px]">

            <i
              class="fa-solid fa-location-dot text-gray-500 text-[10px]"
            ></i>

            <span class="text-[9px] text-gray-500">
              {{ group.distance }}
            </span>

          </div>

          <span class="text-[11px] font-bold">
            {{ group.price }}
          </span>

        </div>

      </div>

    </div>


    <!-- EMPTY STATE -->
    <div
      v-if="groups.length === 0"
      class="flex flex-col items-center justify-center mt-[100px] px-[30px]"
    >

      <i
        class="fa-regular fa-heart text-[45px] text-gray-300"
      ></i>

      <h2 class="text-[15px] font-semibold mt-[15px]">
        Sevimlilar bo'sh
      </h2>

      <p class="text-[10px] text-gray-500 text-center mt-[5px]">
        Yoqtirgan guruhlaringizni yurak belgisini bosib
        saqlashingiz mumkin.
      </p>

    </div>

  </div>
</template>


<script setup>

import { ref } from "vue";

const groups = ref([
  {
    id: 1,
    center: "IT HOUSE ACADEMY",
    title: "Python Backend",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    days: "Sesh, Paysh, Shan",
    time: "16:30 - 18:00",
    students: "12 / 16 ta joy band",
    rating: "4.9",
    reviews: "1200+",
    distance: "2.3 km",
    price: "350 000 so'm",
  },

  {
    id: 2,
    center: "PRO CODERS",
    title: "Frontend Developer",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    days: "Sesh, Paysh, Shan",
    time: "16:30 - 18:00",
    students: "8 / 15 ta joy band",
    rating: "4.8",
    reviews: "800+",
    distance: "1.8 km",
    price: "300 000 so'm",
  },

  {
    id: 3,
    center: "NEXT LEVEL",
    title: "Mobile Developer",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3",
    days: "Sesh, Paysh, Shan",
    time: "18:00 - 19:30",
    students: "6 / 12 ta joy band",
    rating: "4.7",
    reviews: "500+",
    distance: "2.1 km",
    price: "320 000 so'm",
  },
]);


const removeGroup = (id) => {

  groups.value = groups.value.filter(
    (group) => group.id !== id
  );

};

</script>