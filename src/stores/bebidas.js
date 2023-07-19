import {ref, onMounted, reactive} from 'vue';
import {defineStore} from 'pinia';
import apiServices from '../services/apiServices';
import { useModalStore } from './modal';

export const useBebidasStore = defineStore('bebidas', () => {

    const modalStore = useModalStore();

    const categorias = ref([]);
    const datosBusqueda = reactive({
        nombre: '',
        categoria: ''
    })
    const recetas = ref([]);

    const recetaSeleccionada = ref({});

    onMounted(async () => {
        const {data: {drinks}} = await apiServices.obtenerCategorias();
        categorias.value = drinks;
    })

    async function obtenerRecetas(){  //RECOMENDACION DE PINIA, SI LA FUNCION MODIFICARÁ EL STORE, QUE SEA FUNCTION DECLARATION Y NO ARROW
        const {data: {drinks}} = await apiServices.buscarRecetas(datosBusqueda);
        recetas.value = drinks;
    }


    async function seleccionarBebida(id){
        const {data: {drinks}} = await apiServices.seleccionarReceta(id);
        recetaSeleccionada.value = drinks[0];

        modalStore.handleClickModal();
    }


    return{
        categorias,
        datosBusqueda,
        recetas,
        recetaSeleccionada,
        obtenerRecetas,
        seleccionarBebida
    }
})