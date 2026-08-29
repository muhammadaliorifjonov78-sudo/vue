<template>
  <div class="w-full max-w-[390px] h-screen bg-[#F7F9FC] mx-auto rounded-[5px]">
    <div class="">
      <img
        class="w-[350px] m-auto text-center items-center justfiy-center flex animate-pulse"
        src="@/assets/2.png"
        alt=""
      />

    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$router.push("/home")
    }, 2500)
  }
}


</script>

<style>
@keyframes loading {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
</style>
