<template>
  <div class="min-h-screen bg-[#EDF0F6] flex items-center justify-center px-5">
    <div class="w-full max-w-[390px] rounded-2xl bg-[#f0f0f0] p-5 shadow">
      <h1 class="font-bold text-[25px] text-center text-blue-500">Login</h1>

      <div class="mt-16">
        <label class="text-xs text-gray-500">Telegram telefon raqami</label>
        <input v-model="phoneNumber" type="tel" placeholder="+998901234567" class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none" />
      </div>

      <div class="mt-10">
        <label class="text-xs text-gray-500">Parol</label>
        <input v-model="password" type="password" class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none" @keyup.enter="login" />
      </div>


















      <button @click="login" :disabled="loading" class="mt-10 w-full h-11 bg-blue-500 text-white font-semibold rounded-xl disabled:opacity-50">{{ loading ? 'Tekshirilmoqda...' : 'Kirish' }}</button>
      <p v-if="message" class="mt-4 text-center text-red-500">{{ message }}</p>
      <router-link class="block mt-6 text-center text-gray-500" to="/register">Yangi akkaunt yaratish</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const phoneNumber = ref('')
const password = ref('')
const message = ref('')
const loading = ref(false)

async function login() {
  message.value = ''
  if (!phoneNumber.value || !password.value) { message.value = 'Telefon raqami va parolni kiriting.'; return }
  loading.value = true
  try {
    const response = await axios.post('https://edumatch-production-92a4.up.railway.app/login/', { phone_number: phoneNumber.value, password: password.value })
    localStorage.setItem('pending_phone', response.data.phone_number)
    if (response.data.code) {
      localStorage.setItem('pending_code', response.data.code)
    }
    localStorage.removeItem('verified')
    localStorage.removeItem('auth_token')
    router.push('/verify-code')
  } catch (error) {
    const data = error.response?.data
    message.value = data?.message || Object.values(data || {})?.flat()?.[0] || 'Login qilishda xatolik.'
  } finally { loading.value = false }
}
</script>
