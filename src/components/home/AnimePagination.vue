<!--
 * Pagination
 * -------------
 * Componente que representa una barra de paginación
 *
 * Props:
 * - maxVisibleButtons (Number): Número de botones visibles
 * - totalPages (Number) Número de páginas totales
 * - currentPage (Number) Número de la página actual
 *
 * Ejemplo:
 * <AnimePagination :totalPages="totalPages" :currentPage="currentPage" :maxVisibleButtons="5" @onpagechanged="pageUpdated"/>
 *
-->
<template>
    <nav id="pagination">
        <button @click="firstPage" :disabled="currentPage === 1">
            First
        </button>
        <button @click="prevPage" :disabled="currentPage === 1">
            Previous
        </button>
        <button v-for="page in visiblePages" :key="page" :class="{ active: page === currentPage }" @click="goToPage(page)">
            {{ page }}
        </button>
        <button @click="nextPage" :disabled="currentPage === totalPages">
            Next
        </button>
        <button @click="lastPage" :disabled="currentPage === totalPages">
            Last
        </button>
    </nav>
</template>

<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        maxVisibleButtons: {
            type: Number,
            required: false,
            default: 5
        },
        totalPages: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        }
    });

    // Emitir eventos al componente padre
    const emit = defineEmits(['onpagechanged']);

    // Cálculo del rango de páginas visibles
    const visiblePages = computed(() => {
        // Cálculo de la mitad de los botones visibles
        // teniendo el boton central, se calcula cuantos iran a la izqda
        // y a la derecha
        const half = Math.floor(props.maxVisibleButtons / 2);
        // start es el índice de la primera página visible y la calculamos como
        // la página actual menos la mitad de los botones visibles, y para asegurarnos
        // de que start no sea menor a 1 usamos Math.max(1, ...)
        let start = Math.max(1, props.currentPage-half);
        // end es el índice de la última página visible y la calculamos como
        // start más el número de botones visibles, menos 1 y para asegurarnos
        // de que end no supere props.totalPages usamos Math.min(props.totalPages, ...)
        let end = Math.min(props.totalPages, start+props.maxVisibleButtons-1);

        // Ajustar el inicio si el final no alcanza el número total de botones visibles
        // para ello, verifico si el número de páginas en el rango entre start y end es menor
        // que maxVisibleButtons. Si es así, significa que hay un "hueco" y que se necesita
        // ajustar start para incluir más páginas hacia atrás, de modo que el rango de páginas
        // mostradas tenga la cantidad correcta de botones visibles
        if(end-start+1 < props.maxVisibleButtons){
            // Calculamos el nuevo punto de inicio para start. Básicamante, intenta mover
            // start havia atrás para incluir más págians en el rango.
            start = Math.max(1, end-props.maxVisibleButtons+1);
        }

        // Generamos un array de número de página que va desde start hasta end.
        // El primer parámetro indica la longitud del array
        // El segundo parámetro es una función de mapeo que asigna cada índice i
        // al número de página correespondiente (start + i)
        return Array.from({length: end-start+1}, (_, i) => start+i);
    });

    /**
     * Cambiar de página
     * @param {number} page - El número de la página
     */
    const goToPage = (page) => {
        if(page >= 1 && page <= props.totalPages){
            emit('onpagechanged', page);
        }
    };

    // Funciones para navegar
    const firstPage = () => goToPage(1);
    const nextPage = () => goToPage(props.currentPage+1);
    const prevPage = () => goToPage(props.currentPage-1);
    const lastPage = () => goToPage(props.totalPages);
</script>

<style scoped>
.pagination {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #ddd;
}

button.active {
  background-color: #007bff;
  color: white;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
