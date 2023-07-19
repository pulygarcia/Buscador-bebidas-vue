import { defineStore } from "pinia";
import {ref, onMounted, watch} from 'vue';
import { useBebidasStore } from "./bebidas";
import { useModalStore } from "./modal";
import { useNotificacionStore } from "./notificacion";

export const useFavoritosStore = defineStore( 'favoritos', () => {
    const storeBebidas = useBebidasStore();
    const storeModal = useModalStore();
    const storeNotificacion = useNotificacionStore();

    const favoritos = ref([]);

    onMounted(() => {
        if(JSON.parse(localStorage.getItem('favoritos'))){
            favoritos.value = JSON.parse(localStorage.getItem('favoritos'));
        }else{
            favoritos.value = [];
        }
    })

    watch(favoritos, () => {
        sincronizarStorage();
    },{
        deep: true
    })

    function sincronizarStorage(){
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
    }

    function eliminarFavorito(){
        favoritos.value = favoritos.value.filter(favorito => favorito.idDrink !== storeBebidas.recetaSeleccionada.idDrink);

        storeNotificacion.texto = 'Eliminado correctamente';
        storeNotificacion.mostrarNotificacion();
    }

    function handleClickFavoritos(){
        if(favoritos.value.some(bebida => bebida.idDrink === storeBebidas.recetaSeleccionada.idDrink)){
            eliminarFavorito();
            storeModal.mostrar = false;
            return;
        }
        
        favoritos.value.push(storeBebidas.recetaSeleccionada);

        storeNotificacion.texto = 'Agregado a favoritos';
        storeNotificacion.mostrarNotificacion();

        storeModal.mostrar = false;
    }

    return{
        favoritos,
        handleClickFavoritos
    }
})