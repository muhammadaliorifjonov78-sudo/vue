<template>
  <div class="w-[390px] min-h-screen mx-auto bg-[#EDF0F6] pb-10">
    <nav class="flex items-center justify-between px-5 pt-5">
      <a href="/home">
        <img width="22" src="https://img.icons8.com/android/24/left.png" alt="orqaga" />
      </a>
      <h1 class="text-[20px] font-semibold">Mos guruhni topish</h1>
      <img width="24" src="https://img.icons8.com/ios/50/filter--v1.png" alt="filter" />
    </nav>

    <div class="flex justify-center items-center mt-8">
      <div class="flex flex-col items-center">
        <div :class="step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'" class="w-9 h-9 rounded-full flex items-center justify-center font-bold">
          <span v-if="step > 1">✓</span><span v-else>1</span>
        </div>
        <p class="text-[12px] mt-2">Manzil</p>
      </div>

      <div :class="step > 1 ? 'bg-blue-600' : 'bg-gray-300'" class="w-10 h-[2px] mx-2"></div>

      <div class="flex flex-col items-center">
        <div :class="step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'" class="w-9 h-9 rounded-full flex items-center justify-center font-bold">
          <span v-if="step > 2">✓</span><span v-else>2</span>
        </div>
        <p class="text-[12px] mt-2">Yo'nalish</p>
      </div>

      <div :class="step > 2 ? 'bg-blue-600' : 'bg-gray-300'" class="w-10 h-[2px] mx-2"></div>

      <div class="flex flex-col items-center">
        <div :class="step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300'" class="w-9 h-9 rounded-full flex items-center justify-center font-bold">
          <span v-if="step > 3">✓</span><span v-else>3</span>
        </div>
        <p class="text-[12px] mt-2">Vaqt</p>
      </div>

      <div :class="step > 3 ? 'bg-blue-600' : 'bg-gray-300'" class="w-10 h-[2px] mx-2"></div>

      <div class="flex flex-col items-center">
        <div :class="step == 4 ? 'bg-blue-600 text-white' : 'bg-gray-300'" class="w-9 h-9 rounded-full flex items-center justify-center font-bold">4</div>
        <p class="text-[12px] mt-2">Natija</p>
      </div>
    </div>

    <div class="px-5 mt-10">
      <h2 class="text-[20px] font-semibold">Qaysi kunlarda bo'shsiz?</h2>
      <p class="text-[14px] text-gray-500 mt-1">Eng ko‘pi bilan 3 ta kun tanlang.</p>

      <div class="grid grid-cols-2 gap-4 mt-5">
        <button
          v-for="day in days"
          :key="day"
          type="button"
          @click="selectDay(day)"
          :class="selectedDay.includes(day) ? 'bg-blue-50 border-blue-600 text-blue-600' : 'bg-white border-gray-300'"
          class="h-[48px] rounded-xl border flex items-center justify-center gap-2 cursor-pointer duration-300"
        >
          <i :class="selectedDay.includes(day) ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'"></i>
          {{ day }}
        </button>
      </div>
    </div>

    <div class="px-5 mt-10">
      <h2 class="text-[20px] font-semibold">Qaysi vaqtda bo'shsiz?</h2>
      <p class="text-[14px] text-gray-500 mt-1">O'zingizga qulay vaqtni tanlang.</p>

      <div class="grid grid-cols-2 gap-4 mt-5">
        <button
          v-for="time in times"
          :key="time"
          type="button"
          @click="selectTime(time)"
          :class="selectedTime === time ? 'bg-blue-50 border-blue-600 text-blue-600' : 'bg-white border-gray-300'"
          class="h-[48px] rounded-xl border flex items-center justify-center gap-2 cursor-pointer duration-300"
        >
          <i :class="selectedTime === time ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'"></i>
          {{ time }}
        </button>
      </div>
    </div>

    <div class="px-5 mt-10">
      <button
        type="button"
        @click="continueMatching"
        :disabled="selectedDay.length !== 3 || !selectedTime"
        :class="selectedDay.length === 3 && selectedTime ? 'bg-blue-600' : 'bg-gray-400 cursor-not-allowed'"
        class="w-full h-[52px] rounded-xl text-white font-semibold duration-300"
      >
        Davom etish
      </button>
    </div>

    <p v-if="errorMessage" class="px-5 mt-3 text-center text-red-500 text-[12px]">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const step = ref(2);
const errorMessage = ref("");

const days = [
  "Dushanba",
  "Seshanba",
  "Chorshanba",
  "Payshanba",
  "Juma",
  "Shanba",
  "Yakshanba",
];

const times = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "13:00 - 15:00",
  "15:00 - 17:00",
  "17:00 - 19:00",
  "19:00 - 21:00",
];

const selectedDay = ref([]);
const selectedTime = ref("");

const selectDay = (day) => {
  const index = selectedDay.value.indexOf(day);

  if (index !== -1) {
    selectedDay.value.splice(index, 1);
    return;
  }

  if (selectedDay.value.length < 3) {
    selectedDay.value.push(day);
  }
};

const selectTime = (time) => {
  selectedTime.value = time;
};

watch([selectedDay, selectedTime], () => {
  if (selectedDay.value.length === 3 && selectedTime.value) {
    step.value = 4;
  } else if (selectedDay.value.length === 3) {
    step.value = 3;
  } else {
    step.value = 2;
  }
});

const continueMatching = () => {
  if (selectedDay.value.length !== 3 || !selectedTime.value) return;

  errorMessage.value = "";

  router.push({
    path: "/sizuchun_mos_guruhlar",
    query: {
      days: selectedDay.value,
      time: selectedTime.value,
    },
  });
};
</script>
