import { defineStore } from "pinia"
import {ref} from 'vue';


export const useNotificacionStore = defineStore('notificacion', () => {
    const show = ref(false);
    const texto = ref('');
    const error = ref(false);

    function mostrarNotificacion(){
        show.value = !show.value;

        setTimeout(() => {
            show.value = false;
        }, 3000);
    }
    
    return{
        show,
        texto,
        error,
        mostrarNotificacion
    }
})