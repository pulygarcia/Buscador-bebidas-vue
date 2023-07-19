<script setup>
    import {RouterLink} from 'vue-router'
    import {useBebidasStore} from '../stores/bebidas';
    import Bebida from '../components/Bebida.vue'

    const store = useBebidasStore();
</script>

<template>
    <h1 class="text-6xl font-extrabold">Recetas</h1>

    <p v-if="store.recetas.length === 0" class="my-10 text-center text-xl text-red-600">Utiliza el formulario para buscar recetas</p>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-10 gap-10">
        <Bebida 
            v-for="receta in store.recetas"
            :receta="receta"
            :key="receta.idDrink"
        /> 
    </div>
</template>