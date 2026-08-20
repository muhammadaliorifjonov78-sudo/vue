<script setup>
import { ref, onMounted } from "vue";

const items = ref([]);

const getItem = async () => {
  try {
    const response = await fetch("https://edumatch1.up.railway.app/api/cars/");

    if (!response.ok) {
      throw new Error("Ma'lumotni olishda xatolik");
    }

    items.value = await response.json();
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getItem();
});
</script>


<template>
   <h1>Items</h1>

  <div class=" w-[700px] h-[50px] p-[5px] border-[1px] text-center items-center flex gap-[10px] m-auto" v-for="item in items" :key="item.id">
    <p>{{ item.name }}</p>
    <h2>{{ item.description }}</h2>
    <h3>{{ item.created_at }}</h3>
  </div>
</template>
