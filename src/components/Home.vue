<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="background__menu">
    <section
      class="container mx-auto px-4 h-[100svh] flex flex-col justify-evenly items-center"
    >
      <div>
        <h1 class="font-black text-5xl text-base-100 drop-shadow">Truco Web</h1>
      </div>
      <div class="flex flex-col gap-3">
        <RouterLink to="/play" class="btn">Jugar</RouterLink>
        <RouterLink to="/optionsView" class="btn">Opciones</RouterLink>
      </div>
    </section>
  </div>
</template>
