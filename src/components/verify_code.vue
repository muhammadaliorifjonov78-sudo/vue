<template>
  <div class="min-h-screen bg-[#EDF0F6] flex items-center justify-center px-5">
    <div class="w-full max-w-[390px] rounded-2xl bg-white p-6 shadow">
      
      <h1 class="font-bold text-[25px] text-center text-blue-500">
        Tasdiqlash
      </h1>

      <p class="text-center text-gray-500 mt-3">
        {{ phoneNumber }} raqamiga ulangan Telegram botga
        6 xonali kod yuborildi.
      </p>

      <input
        v-model="code"
        maxlength="6"
        inputmode="numeric"
        autocomplete="one-time-code"
        class="mt-6 w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-2xl tracking-[10px] focus:border-blue-500 focus:outline-none"
        placeholder="000000"
        @keyup.enter="verify"
      />

      <button
        @click="verify"
        :disabled="loading"
        class="mt-5 w-full h-11 bg-blue-500 text-white font-semibold rounded-xl disabled:opacity-50"
      >
        {{ loading ? "Tekshirilmoqda..." : "Tasdiqlash" }}
      </button>

      <p
        v-if="message"
        class="mt-4 text-center"
        :class="success ? 'text-green-600' : 'text-red-500'"
      >
        {{ message }}
      </p>

      <button
        @click="back"
        class="mt-4 w-full text-gray-500"
      >
        ← Orqaga
      </button>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const phoneNumber = localStorage.getItem("pending_phone") || "";
const pendingCode = localStorage.getItem("pending_code") || "";

const code = ref(pendingCode);
const message = ref("");
const success = ref(false);
const loading = ref(false);

if (pendingCode && phoneNumber) {
  verify();
}

async function verify() {
  message.value = "";
  success.value = false;

  if (!/^\d{6}$/.test(code.value)) {
    message.value = "6 xonali kodni kiriting.";
    return;
  }

  if (!phoneNumber) {
    router.push("/login");
    return;
  }

  loading.value = true;

  try {
    const response = await axios.post(
      "https://edumatch1.up.railway.app/verify-code/",
      {
        phone_number: phoneNumber,
        code: code.value,
      }
    );

    success.value = true;
    message.value = response.data.message;

    localStorage.setItem(
      "auth_token",
      response.data.token
    );

    localStorage.setItem(
      "verified",
      "true"
    );

    localStorage.setItem(
      "phone_number",
      phoneNumber
    );

    localStorage.removeItem(
      "pending_phone"
    );

    localStorage.removeItem("pending_code");

    setTimeout(() => {
      router.replace("/home");
    }, 300);

  } catch (error) {
    message.value =
      error.response?.data?.message ||
      "Kod noto'g'ri.";

    localStorage.removeItem("verified");
    localStorage.removeItem("auth_token");

  } finally {
    loading.value = false;
  }
}

function back() {
  router.push("/login");
}
</script>