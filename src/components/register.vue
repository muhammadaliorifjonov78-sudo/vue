<template>
  <div class="min-h-screen bg-[#EDF0F6] flex items-center justify-center px-5">
    <div class="w-full max-w-[390px] rounded-2xl bg-[#f0f0f0] p-5 shadow">

      <h1 class="font-bold text-[25px] text-center text-blue-500">
        Register
      </h1>

      <!-- Telefon -->
      <div class="mt-12">
        <label class="text-[14px] text-gray-500">
          Telegram telefon raqami
        </label>

        <input
          v-model="phoneNumber"
          type="tel"
          placeholder="+998901234567"
          class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
        />

        <p class="text-xs text-gray-500 mt-2">
          Avval Telegram'dagi EduMatch botiga
          /start yuborib, raqamingizni ulashing.
        </p>
      </div>

      <!-- Parol -->
      <div class="mt-5">
        <label class="text-[14px] text-gray-500">
          Parol
        </label>

        <input
          v-model="password"
          type="password"
          placeholder="Parol"
          class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <!-- Parolni tasdiqlash -->
      <div class="mt-5">
        <label class="text-[14px] text-gray-500">
          Parolni tasdiqlang
        </label>

        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Parolni qayta kiriting"
          class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
          @keyup.enter="register"
        />
      </div>

      <!-- Register -->
      <button
        @click="register"
        :disabled="loading"
        class="mt-7 w-full h-11 bg-blue-500 text-white font-semibold rounded-xl disabled:opacity-50"
      >
        {{ loading ? "Yuborilmoqda..." : "Ro'yxatdan o'tish" }}
      </button>

      <!-- Xabar -->
      <p
        v-if="message"
        class="mt-4 text-center text-red-500"
      >
        {{ message }}
      </p>

      <!-- Login -->
      <router-link
        class="block mt-5 text-center text-gray-500"
        to="/login"
      >
        Mening akkauntim bor
      </router-link>

    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const phoneNumber = ref("");
const password = ref("");
const confirmPassword = ref("");

const message = ref("");
const loading = ref(false);


async function register() {

  message.value = "";

  // Telefon va parol tekshirish
  if (!phoneNumber.value || !password.value) {
    message.value =
      "Telefon raqami va parolni kiriting.";
    return;
  }


  // Telefon raqamini tekshirish
  const phoneRegex = /^\+998\d{9}$/;

  if (!phoneRegex.test(phoneNumber.value)) {
    message.value =
      "Telefon raqamini +998901234567 ko'rinishida kiriting.";
    return;
  }


  // Parol uzunligi
  if (password.value.length < 6) {
    message.value =
      "Parol kamida 6 belgidan iborat bo'lsin.";
    return;
  }


  // Parollarni tekshirish
  if (password.value !== confirmPassword.value) {
    message.value =
      "Parollar mos emas.";
    return;
  }


  loading.value = true;


  try {

    const response = await axios.post(
      "https://edumatch1.up.railway.app/register/",
      {
        phone_number: phoneNumber.value,
        password: password.value,
      }
    );


    // Backenddan kelgan telefon raqamini saqlaymiz
    localStorage.setItem(
      "pending_phone",
      response.data.phone_number
    );

    // Tasdiqlash kodini saqlaymiz (Telegram bo'lmasa avtomatik ishlatiladi)
    if (response.data.code) {
      localStorage.setItem("pending_code", response.data.code);
    }


    // Eski authentication ma'lumotlarini o'chirish
    localStorage.removeItem("verified");
    localStorage.removeItem("auth_token");


    // Verification sahifasiga o'tish
    router.push("/verify-code");


  } catch (error) {

    console.error(error);

    const data = error.response?.data;


    if (data?.message) {

      message.value = data.message;

    } else if (data) {

      const errors = Object.values(data)
        .flat()
        .filter(Boolean)
        ;

      message.value =
        errors[0] ||
        "Ro'yxatdan o'tishda xatolik.";

    } else {

      message.value =
        "Server bilan bog'lanib bo'lmadi.";

    }

  } finally {

    loading.value = false;

  }
}
</script>