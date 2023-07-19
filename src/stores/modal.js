import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import { useBebidasStore } from './bebidas';
import { useFavoritosStore } from './favoritos';

export const useModalStore = defineStore('modal', () => {
    const storeFavoritos = useFavoritosStore();
    const storeBebidas = useBebidasStore();

    const mostrar = ref(false);

    function handleClickModal(){
        mostrar.value = !mostrar.value;
    }

    const textoBoton = computed(() => {
        if(storeFavoritos.favoritos.some(bebida => bebida.idDrink === storeBebidas.recetaSeleccionada.idDrink)){
            return 'Eliminar de Favoritos'
        }else{
            return 'Agregar a Favoritos'
        }
    })

    return{
        mostrar,
        handleClickModal,
        textoBoton
    }
})