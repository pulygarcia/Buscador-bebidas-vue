<script setup>
    import {computed} from 'vue';
    import {RouterLink, useRoute} from 'vue-router';
    import {useBebidasStore} from '../stores/bebidas';
    import { useNotificacionStore } from '../stores/notificacion';

    const route = useRoute();
    const store = useBebidasStore();
    const storeNotificacion = useNotificacionStore();
    
    const mostrarFormulario = computed(() => {
        return route.name === 'inicio';
    })

    const handleSubmit = () => {
        if(Object.values(store.datosBusqueda).includes('')){
            storeNotificacion.$patch({
                error: true,
                texto: 'Por favor completa los campos'
            })

            storeNotificacion.mostrarNotificacion();
        }

        store.obtenerRecetas();
    }
</script>

<template>
    <header class="bg-gradient-to-r from-blue-400 to-emerald-400">
        <div class="mx-auto container py-16 px-5">
            <div class="flex justify-between items-center">
                <div>
                    <RouterLink :to="{name: 'inicio'}">
                        <img class="w-40" src="../../public/logo.png" alt="logo imagen">
                    </RouterLink>
                </div>

                <nav class="space-x-7 text-white">
                    <RouterLink :to="{name: 'inicio'}" class="font-bold uppercase hover:text-red-500 transition" active-class="text-red-500">Recetas</RouterLink>
                    <RouterLink :to="{name: 'favoritos'}" class="font-bold uppercase hover:text-red-500 transition" active-class="text-red-500">Favoritos</RouterLink>
                </nav>
            </div>

            <form
                class="bg-slate-700 my-24 p-10 shadow-lg rounded-lg md:w-1/2 2xl:w-1/3"
                v-if="mostrarFormulario"
                @submit.prevent="handleSubmit"
            >
                <div class="space-y-4">
                    <label for="ingrediente" class="block text-white font-bold text-lg">Nombre/Ingrediente</label>
                    <input type="text" class="p-2 w-full rounded-md" placeholder="Nombre o ej: Tequila, whisky, vodka" id="ingrediente"
                        v-model="store.datosBusqueda.nombre"
                    >
                </div>

                <div class="space-y-4 mt-5">
                    <label for="categoria" class="block text-white font-bold text-lg">Categoría</label>
                    <select id="categoria" class="p-2 w-full rounded-md cursor-pointer focus:outline-none"
                        v-model="store.datosBusqueda.categoria"
                    >
                        <option value="" disabled selected>-- Seleccionar Categoría --</option>
                        <option v-for="categoria in store.categorias" :value="categoria.strCategory">{{ categoria.strCategory }}</option>
                    </select>
                </div>

                <input 
                    type="submit" 
                    class="py-2 mt-6 bg-red-500 text-white font-bold w-full hover:bg-red-400 rounded-lg cursor-pointer transition" 
                    value="Buscar Recetas"
                >
            </form>
        </div>
    </header>
</template>