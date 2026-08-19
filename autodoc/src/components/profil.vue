<template>
  <div class="w-[390px] min-h-screen mx-auto bg-white text-gray-900 pb-[70px]">

    <!-- PROFILE -->
    <div class="flex flex-col items-center pt-[30px]">

      <img
        class="w-[72px] h-[72px] rounded-full object-cover"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbCA-NZUVtrub5PuSiGvb8ZA3OexA9M4Adn5kCNGPshg&s=10"
        alt="profile"
      />

      <h1 class="text-[15px] font-bold mt-[8px]">
        User
      </h1>

      <p class="text-[11px] text-gray-500 mt-[2px]">
        +998 90 000 00 00
      </p>

    </div>


    <!-- SEVIMLILAR -->
    <div class="px-[10px] mt-[18px]">

      <div
        class="h-[70px] rounded-[8px] px-[12px] flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 text-white"
      >

        <div>
          <p class="text-[12px] font-semibold">
            Sevimlilarim
          </p>

          <p class="text-[9px] mt-[5px]">
            3 ta saqlangan guruh
          </p>
        </div>

        <i class="fa-solid fa-heart text-[#ff737d] text-[25px] mr-[8px]"></i>

      </div>

    </div>


    <!-- MA'LUMOTLAR -->
    <div class="px-[10px] mt-[25px]">

      <h2 class="text-[12px] font-semibold mb-[10px]">
        Mening ma'lumotlarim
      </h2>


      <!-- 1 -->
      <button
        class="w-full h-[38px] flex items-center justify-between border-b border-gray-100"
      >

        <div class="flex items-center gap-[10px]">

          <i
            class="fa-regular fa-calendar-days text-[12px] text-gray-600 w-[14px]"
          ></i>

          <span class="text-[10px]">
            Mening so'rovlarim
          </span>

        </div>

        <i
          class="fa-solid fa-chevron-right text-[9px] text-gray-500"
        ></i>

      </button>


      <!-- 2 -->
      <button
        class="w-full h-[38px] flex items-center justify-between border-b border-gray-100"
      >

        <div class="flex items-center gap-[10px]">

          <i
            class="fa-solid fa-gear text-[12px] text-gray-600 w-[14px]"
          ></i>

          <span class="text-[10px]">
            Sozlamalar
          </span>

        </div>

        <i
          class="fa-solid fa-chevron-right text-[9px] text-gray-500"
        ></i>

      </button>


      <!-- 3 -->
      <button
        class="w-full h-[38px] flex items-center justify-between border-b border-gray-100"
      >

        <div class="flex items-center gap-[10px]">

          <i
            class="fa-regular fa-bell text-[12px] text-gray-600 w-[14px]"
          ></i>

          <span class="text-[10px]">
            Bildirishnomalar
          </span>

        </div>

        <i
          class="fa-solid fa-chevron-right text-[9px] text-gray-500"
        ></i>

      </button>


      <!-- 4 -->
      <button
        class="w-full h-[38px] flex items-center justify-between border-b border-gray-100"
      >

        <div class="flex items-center gap-[10px]">

          <i
            class="fa-regular fa-circle-question text-[12px] text-gray-600 w-[14px]"
          ></i>

          <span class="text-[10px]">
            Yordam va qo'llab-quvvatlash
          </span>

        </div>

        <i
          class="fa-solid fa-chevron-right text-[9px] text-gray-500"
        ></i>

      </button>


      <!-- 5 -->
      <button
        @click="logout"
        class="w-full h-[38px] flex items-center justify-between"
      >

        <div class="flex items-center gap-[10px]">

          <i
            class="fa-solid fa-arrow-right-from-bracket text-[12px] text-gray-600 w-[14px]"
          ></i>

          <span class="text-[10px]">
            Chiqish
          </span>

        </div>

        <i
          class="fa-solid fa-chevron-right text-[9px] text-gray-500"
        ></i>

      </button>

    </div>



  </div>
</template>


<script setup>

const logout = () => {
  alert("Tizimdan chiqildi!");
};

</script>