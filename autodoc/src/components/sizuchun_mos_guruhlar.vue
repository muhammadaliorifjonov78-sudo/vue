<template>
  <div class="w-[390px] min-h-screen mx-auto bg-[#EDF0F6] pb-10">
    <nav class="flex items-center justify-between px-5 pt-5">
      <a href="/matching_group">
        <img width="22" height="22" src="https://img.icons8.com/android/24/left.png" alt="back" />
      </a>

      <h1 class="text-[20px] font-semibold text-gray-800">Sizga mos guruhlar</h1>

      <button type="button" @click="loadAllGroups">
        <img width="24" height="24" src="https://img.icons8.com/ios/50/filter--v1.png" alt="filter" />
      </button>
    </nav>

    <div class="px-5 mt-5">
      <div class="bg-white rounded-xl px-4 py-3 text-[12px] text-gray-600">
        <div class="font-semibold text-gray-800">Tanlangan vaqt</div>
        <div class="mt-1">
          {{ selectedDays.length ? selectedDays.join(", ") : "Barcha kunlar" }}
          <span v-if="selectedTime"> · {{ selectedTime }}</span>
        </div>
      </div>
    </div>

    <div v-if="loading" class="px-5 mt-6 text-center text-gray-500 text-[13px]">
      Guruhlar qidirilmoqda...
    </div>

    <div v-else-if="errorMessage" class="mx-5 mt-6 bg-red-50 text-red-600 rounded-xl p-4 text-[12px]">
      {{ errorMessage }}
    </div>

    <template v-else>
      <div
        v-for="group in groups"
        :key="group.id"
        class="bg-white mx-5 mt-5 rounded-2xl p-5 shadow-sm border border-gray-100"
      >
        <div class="flex items-start justify-between">
          <div>
            <h2 class="text-[19px] font-bold text-gray-800">{{ group.title }}</h2>
            <p class="text-[14px] text-gray-500 mt-1">{{ group.academy }}</p>
          </div>

          <div class="px-3 py-1 rounded-full bg-green-100 text-green-600 text-[13px] font-bold">
            {{ group.match_percent }}%
          </div>
        </div>

        <div class="mt-5 space-y-3">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-location-dot text-blue-600 w-5"></i>
            <span class="text-[14px] text-gray-600">{{ group.location }}</span>
          </div>

          <div class="flex items-center gap-3">
            <i class="fa-solid fa-users text-blue-600 w-5"></i>
            <span class="text-[14px] text-gray-600">{{ group.students }} nafar o'quvchi</span>
          </div>

          <div class="flex items-center gap-3">
            <i class="fa-regular fa-calendar text-blue-600 w-5"></i>
            <span class="text-[14px] text-gray-600">{{ group.days.join(", ") }}</span>
          </div>

          <div class="flex items-center gap-3">
            <i class="fa-regular fa-clock text-blue-600 w-5"></i>
            <span class="text-[14px] text-gray-600">{{ group.time }}</span>
          </div>
        </div>

        <button
          type="button"
          @click="chooseGroup(group)"
          class="w-full h-[48px] mt-6 rounded-xl bg-blue-600 text-white font-semibold"
        >
          Guruhni tanlash
        </button>
      </div>

      <div v-if="groups.length === 0" class="mx-5 mt-6 bg-white rounded-2xl p-8 text-center">
        <i class="fa-solid fa-magnifying-glass text-3xl text-gray-300"></i>
        <h2 class="font-semibold mt-3">Mos guruh topilmadi</h2>
        <p class="text-[12px] text-gray-500 mt-1">
          Boshqa kun yoki vaqtni tanlab ko'ring.
        </p>
      </div>

      <div v-if="!showAll && groups.length" class="px-5 mt-6 mb-[45px]">
        <button
          type="button"
          @click="loadAllGroups"
          class="w-full h-[50px] rounded-xl border-2 border-blue-600 text-blue-600 font-semibold bg-white"
        >
          Boshqa guruhlarni ko'rish
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const API_URL = "http://127.0.0.1:8000/api/groups/filter/";

const route = useRoute();
const router = useRouter();

const groups = ref([]);
const loading = ref(false);
const errorMessage = ref("");
const showAll = ref(false);

const selectedDays = ref(
  Array.isArray(route.query.days)
    ? route.query.days
    : route.query.days
      ? [route.query.days]
      : []
);

const selectedTime = ref(
  typeof route.query.time === "string" ? route.query.time : ""
);

const fetchGroups = async (showAllGroups = false) => {
  loading.value = true;
  errorMessage.value = "";
  showAll.value = showAllGroups;

  try {
    const params = new URLSearchParams();

    if (!showAllGroups) {
      selectedDays.value.forEach((day) => params.append("days", day));

      if (selectedTime.value) {
        params.set("time", selectedTime.value);
      }

      if (route.query.direction) {
        params.set("direction", route.query.direction);
      }

      if (route.query.location) {
        params.set("location", route.query.location);
      }
    }

    const url = params.toString() ? `${API_URL}?${params}` : API_URL;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Backend javob bermadi.");
    }

    groups.value = await response.json();
  } catch (error) {
    console.error(error);
    errorMessage.value =
      "Guruhlarni yuklab bo'lmadi. Django server ishlayotganini tekshiring.";
  } finally {
    loading.value = false;
  }
};

const loadAllGroups = () => {
  fetchGroups(true);
};

const chooseGroup = (group) => {
  router.push({
    path: "/joybandqilish",
    query: { group: group.id },
  });
};

onMounted(() => {
  fetchGroups(false);
});
</script>
