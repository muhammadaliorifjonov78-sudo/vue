<template>
  <div class="w-full max-w-[390px] min-h-screen mx-auto bg-white pb-[90px] pt-[10px]">

    <!-- ================= TOP IMAGE ================= -->
    <div class="relative w-full h-[245px]">

      <img
        :src="image"
        alt="Course"
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


    <!-- ================= LOADING / ERROR ================= -->
    <div v-if="loading" class="px-4 pt-3 text-center text-gray-500 text-[13px]">
      Ma'lumot yuklanmoqda...
    </div>

    <div v-else-if="error" class="px-4 pt-3">
      <div class="bg-red-50 text-red-600 rounded-xl p-4 text-[12px]">
        {{ error }}
      </div>
    </div>

    <!-- ================= COURSE INFO ================= -->
    <div v-else class="px-4 pt-3">

      <!-- academy -->
      <p class="text-[10px] text-gray-500 uppercase">
        {{ teacher }}
      </p>

      <!-- title -->
      <h1 class="text-[20px] font-bold text-gray-900 mt-1">
        {{ title }}
      </h1>


      <!-- rating -->
      <div class="flex items-center gap-2 mt-2 text-[12px]">

        <span class="text-yellow-400 text-[16px]">
          ★
        </span>

        <span class="font-semibold">
          {{ rating }}
        </span>

        <span class="text-gray-500" v-if="students">
          ({{ students }} o'quvchi)
        </span>

        <span
          v-if="location"
          class="text-gray-300"
        >
          |
        </span>

        <span class="text-gray-500" v-if="location">
          <i class="fa-solid fa-location-dot"></i> {{ location }}
        </span>

      </div>


      <!-- tags -->
      <div class="flex gap-2 mt-3">

        <span
          v-if="data && (data.category || data.direction)"
          class="bg-[#eef2ff] text-[9px] text-blue-600
          px-2 py-1 rounded"
        >
          {{ data.category || data.direction }}
        </span>

        <span
          class="bg-[#eef2ff] text-[9px] text-blue-600
          px-2 py-1 rounded"
        >
          {{ isCourse ? "O'quv kursi" : (data && data.academy) || "Akademiya" }}
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

      <div class="flex flex-wrap gap-2 mt-2">

        <span
          v-for="day in dayList"
          :key="day"
          class="px-3 py-1 bg-blue-50
          text-blue-600 rounded-md text-[9px]"
        >
          {{ day }}
        </span>

      </div>

      <div
        class="inline-flex items-center gap-1 mt-2
        px-2 py-1 bg-blue-50 rounded-md text-blue-600 text-[9px]"
      >
        ◷ {{ timeText }}
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
              {{ teacher }}
            </h3>

            <span class="ml-[45px] text-yellow-400">
              ★
            </span>

            <span class="text-[10px] font-semibold">
              {{ rating }}
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
      w-full max-w-[390px] h-[65px] bg-white
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
        Joy band qilish · {{ priceText }}
      </button>

    </div>

  </div>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const API_URL = "https://edumatch1.up.railway.app";

const route = useRoute();
const router = useRouter();

const data = ref(null);
const loading = ref(true);
const error = ref("");

const isCourse = computed(() => Boolean(route.query.course));

const title = computed(() => data.value?.title || (isCourse.value ? "Kurs" : "Guruh"));
const teacher = computed(() => data.value?.teacher || data.value?.academy || "O'qituvchi");
const rating = computed(() => data.value?.rating ?? data.value?.match_percent ?? "4.9");
const price = computed(() => data.value?.price ?? 0);
const priceText = computed(() =>
  price.value ? `${new Intl.NumberFormat("uz-UZ").format(price.value)} so'm` : "Narx kelishiladi"
);
const students = computed(() => data.value?.students ?? 0);
const image = computed(
  () =>
    data.value?.image ||
    "https://i.pinimg.com/1200x/8c/f9/51/8cf951adfb8156444b1830ede482ad8e.jpg"
);

const daysText = computed(() => {
  const d = data.value?.days;
  if (Array.isArray(d) && d.length) return d.join(", ");
  if (d) return String(d);
  return "Seshanba, Payshanba, Shanba";
});

const dayList = computed(() =>
  daysText.value.split(",").map((s) => s.trim()).filter(Boolean)
);

const timeText = computed(() => data.value?.time || "16:30 - 18:00");
const location = computed(() => data.value?.location || "");

const loadData = async () => {
  loading.value = true;
  error.value = "";
  try {
    const id = route.query.course || route.query.group;
    if (!id) {
      error.value = "Ma'lumot topilmadi.";
      return;
    }
    const endpoint = isCourse.value
      ? `${API_URL}/api/courses/${id}/`
      : `${API_URL}/api/groups/${id}/`;
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error();
    data.value = await response.json();
  } catch (e) {
    console.error(e);
    error.value = "Ma'lumotni yuklab bo'lmadi.";
  } finally {
    loading.value = false;
  }
};

const bookGroup = () => {
  alert("Joy band qilindi! Tez orada operatorlar siz bilan bog'lanadi.");
};

onMounted(loadData);
</script>