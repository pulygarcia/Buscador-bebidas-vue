<script setup>
    import { useBebidasStore } from '../stores/bebidas';

    const store = useBebidasStore();

    defineProps({
        receta:{
            type: Object,
            required: true
        }
    })
</script>

<template>
    <div class="rounded-lg p-5 shadow-lg">
        <div class="overflow-hidden rounded-lg">
            <img :src="receta.strDrinkThumb" :alt="'Imagen de ' + receta.strDrink" class="hover:scale-110 transition duration-200">
        </div>

        <div class="mt-5 text-center">
            <h1 class="text-2xl font-bold text-gray-800 truncate">{{ receta.strDrink }}</h1>

            <button
                type="button"
                class="bg-blue-400 text-center w-full p-2 rounded-lg text-white font-bold mt-7 hover:bg-blue-600 transition duration-200"
                @click="store.seleccionarBebida(receta.idDrink)"
            >
                Ver receta
            </button>
        </div>
    </div>
</template>