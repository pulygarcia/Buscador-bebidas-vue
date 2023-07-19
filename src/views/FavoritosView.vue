<script setup>
  import { useFavoritosStore } from '../stores/favoritos';
  import Bebida from '../components/Bebida.vue'

  const storeFavoritos = useFavoritosStore();
</script>

<template>
  <h1 class="text-6xl font-extrabold">Favoritos</h1>

  <p v-if="storeFavoritos.favoritos.length === 0" class="mt-10 text-center text-xl text-red-600">No hay favoritos aún</p>

  <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-10 gap-10">
    <Bebida 
      v-for="bebida in storeFavoritos.favoritos"
      :receta="bebida"
      :key="bebida.idDrink"
    />
  </div>
</template>