<template>
  <div class="w-[390px] min-h-screen mx-auto bg-white pb-[90px] pt-[10px]">

    <!-- ================= TOP IMAGE ================= -->
    <div class="relative w-full h-[245px]">

      <img
        src="https://i.pinimg.com/1200x/8c/f9/51/8cf951adfb8156444b1830ede482ad8e.jpg"
        alt="Python Backend"
        class="w-full rounded-[7px] h-full object-cover"
      />

      <!-- dark overlay -->
      <div class="absolute inset-0 bg-black/10"></div>

      <!-- back -->
      <button
        class="absolute top-4 left-4 text-white text-[20px]"
        @click="$router.back()"
      >
        <i class="fas fa-arrow-left"></i>
      </button>

      <!-- share -->
      <button class="absolute top-4 right-14 text-white text-[22px]">
        ♧
      </button>

      <!-- heart -->
      <button class="absolute top-4 right-4 text-white text-[23px]">
        ♡
      </button>

      <!-- image counter -->
      <div
        class="absolute bottom-3 right-3 bg-black/60 text-white text-[11px]
        px-2 py-1 rounded-lg"
      >
        1/10
      </div>
    </div>


    <!-- ================= COURSE INFO ================= -->
    <div class="px-4 pt-3">

      <!-- academy -->
      <p class="text-[10px] text-gray-500 uppercase">
        IT HOUSE ACADEMY
      </p>

      <!-- title -->
      <h1 class="text-[20px] font-bold text-gray-900 mt-1">
        Python Backend
      </h1>


      <!-- rating -->
      <div class="flex items-center gap-2 mt-2 text-[12px]">

        <span class="text-yellow-400 text-[16px]">
          ★
        </span>

        <span class="font-semibold">
          4.9
        </span>

        <span class="text-gray-500">
          (1200+)
        </span>

        <span class="text-gray-300">
          |
        </span>

        <span class="text-gray-500">
          ♧ 2.3 km
        </span>

      </div>


      <!-- tags -->
      <div class="flex gap-2 mt-3">

        <span
          class="bg-[#eef2ff] text-[9px] text-blue-600
          px-2 py-1 rounded"
        >
          Dasturlash
        </span>

        <span
          class="bg-[#eef2ff] text-[9px] text-blue-600
          px-2 py-1 rounded"
        >
          Backend
        </span>

      </div>


      <!-- line -->
      <div class="border-t border-gray-200 mt-4"></div>


      <!-- ================= COURSE DETAILS ================= -->

      <div class="grid grid-cols-4 mt-3">

        <div>
          <p class="text-[8px] text-gray-500">
            Davomiyligi
          </p>

          <p class="text-[10px] font-semibold mt-1">
            8 oy
          </p>
        </div>

        <div>
          <p class="text-[8px] text-gray-500">
            Dars vaqti
          </p>

          <p class="text-[10px] font-semibold mt-1">
            90 minut
          </p>
        </div>

        <div>
          <p class="text-[8px] text-gray-500">
            Haftasiga
          </p>

          <p class="text-[10px] font-semibold mt-1">
            3 kun
          </p>
        </div>

        <div>
          <p class="text-[8px] text-gray-500">
            Boshlanish sanasi
          </p>

          <p class="text-[10px] font-semibold mt-1">
            15 Avgust
          </p>
        </div>

      </div>


      <div class="border-t border-gray-200 mt-3"></div>


      <!-- ================= DAYS ================= -->

      <h2 class="font-semibold text-[14px] mt-3">
        Dars kunlari va vaqti
      </h2>

      <div class="flex gap-2 mt-2">

        <span
          class="px-3 py-1 bg-blue-50
          text-blue-600 rounded-md text-[9px]"
        >
          Seshanba
        </span>

        <span
          class="px-3 py-1 bg-blue-50
          text-blue-600 rounded-md text-[9px]"
        >
          Payshanba
        </span>

        <span
          class="px-3 py-1 bg-blue-50
          text-blue-600 rounded-md text-[9px]"
        >
          Shanba
        </span>

      </div>

      <div
        class="inline-flex items-center gap-1 mt-2
        px-2 py-1 bg-blue-50 rounded-md text-blue-600 text-[9px]"
      >
        ◷ 16:30 - 18:00
      </div>


      <div class="border-t border-gray-200 mt-3"></div>


      <!-- ================= TEACHER ================= -->

      <h2 class="font-semibold text-[14px] mt-3">
        O'qituvchi
      </h2>

      <div class="flex items-center mt-2">

        <img
          src="https://i.pinimg.com/736x/d8/49/60/d8496092785fd2db229247487c9f142a.jpg"
          alt="O'qituvchi"
          class="w-[40px] h-[40px] rounded-full object-cover"
        />

        <div class="ml-2">

          <div class="flex items-center gap-1">

            <h3 class="text-[11px] font-semibold">
              User
            </h3>

            <span class="ml-[45px] text-yellow-400">
              ★
            </span>

            <span class="text-[10px] font-semibold">
              4.9
            </span>

          </div>

          <p class="text-[8px] text-gray-500">
            5 yil tajriba
          </p>

          <p class="text-[8px] text-gray-500">
            Python, Django, FastAPI
          </p>

          <p class="text-[8px] text-gray-500">
            500+ bitiruvchi
          </p>

        </div>

      </div>


      <div class="border-t border-gray-200 mt-3"></div>


      <!-- ================= COURSE PLAN ================= -->

      <h2 class="font-semibold text-[14px] mt-3">
        Kurs rejasi
      </h2>

      <!-- 1 -->
      <div
        class="flex items-center justify-between
        border border-gray-200 h-[28px] px-2 mt-2"
      >

        <div class="flex items-center gap-3">

          <span class="text-[8px]">
            1-oy
          </span>

          <span class="text-[9px]">
            Python Basic
          </span>

        </div>

        <span class="text-gray-500 text-[10px]">
         ⌄
        </span>

      </div>


      <!-- 2 -->
      <div
        class="flex items-center justify-between
        border border-gray-200 border-t-0 h-[28px] px-2"
      >

        <div class="flex items-center gap-3">

          <span class="text-[8px]">
            2-oy
          </span>

          <span class="text-[9px]">
            OOP (Object Oriented Programming)
          </span>

        </div>

        <span class="text-gray-500 text-[10px]">
         ⌄
        </span>

      </div>

    </div>


    <!-- ================= BOTTOM BUTTON ================= -->

    <div
      class="fixed bottom-0 left-1/2 -translate-x-1/2
      w-[390px] h-[65px] bg-white
      border-t border-gray-200
      flex items-center gap-2 px-3"
    >

      <!-- call -->
      <button
        class="w-[38px] h-[38px]
        bg-blue-50 rounded-lg
        text-blue-600 text-[18px]"
      >
        ♧
      </button>


      <!-- telegram -->
      <button
        class="w-[38px] h-[38px]
        bg-blue-50 rounded-lg
        text-blue-600 text-[18px]"
      >
        ➤
      </button>


      <!-- booking -->
      <button
        class="flex-1 h-[40px]
        bg-blue-600 text-white
        rounded-lg text-[12px] font-semibold
        active:scale-[0.98] transition"
        @click="bookGroup"
      >
        Joy band qilish
      </button>

    </div>

  </div>
</template>


<script setup>

const bookGroup = () => {
  alert("Joy band qilindi!");
};

</script>