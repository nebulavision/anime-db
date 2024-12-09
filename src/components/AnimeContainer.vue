<!--
  * AnimeContainer
  * -----------------
  * Componente que muestra una lista de tarjetas de anime, permite filtrar por género y paginar los resultados.
  *
  * Props:
  * - searchData (string): String con el texto introducido por el usuario en la barra de búsqueda
  *
  * Ejemplo de uso:
  * <AnimeContainer />
  *
  * @componenet
  *
-->
<template>
  <article>
    <header id="container-header">
      <GenreTag
        v-for="genre in genres"
        :key="genre.id"
        :text="genre.name"
        :active="activeTag === genre.id"
        @click="setActiveTag(genre.id)"
      />
    </header>
    <div id="container-body">
      <!-- Definimos la etiqueta para nuestro componente AnimeCard
          v-for -> Directiva para recorrer el array con los animes
          :key -> Directia para enlazar una clave para actualizaciones o eliminaciones dinámicas
          :anime -> Directiva para enlazar la propiedad anime para pasar el anime al componenete
          :[nombre_propiedad] es una abreviación para v-bind:[nombre-propiedad]
          -->
      <AnimeCard class="card" v-for="anime in animes" :key="anime.mal_id" :anime="anime" />
      <div :style="{ visibility: fetching ? 'visible' : 'hidden' }" id="loader"></div>
    </div>
    <footer id="container-footer">
      <AnimePagination
        :totalPages="totalPages"
        :currentPage="currentPage"
        :maxVisibleButtons="5"
        @onpagechanged="pageUpdated"
        :style="{ visibility: fetching ? 'hidden' : 'visible' }"
      />
    </footer>
  </article>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import AnimeCard from './AnimeCard.vue';
import AnimePagination from './AnimePagination.vue';
import GenreTag from './GenreTag.vue';
import {
  fetchAnimesByPopularity,
  fetchAnimesByGenre,
  fetchAnimesByQuery,
} from '@/repository/AnimeRepository';
import { fetchGenres } from '@/repository/GenreRepository';
import { AnimeGenre } from '@/model/AnimeGenre';

const props = defineProps({
  searchData: {
    type: String,
    reqired: false,
  },
});

// ref() es una función de Composition API que se usa para crear una referencia reactiva.
// Permite que una varaible sea reactiva y que Vue la observer para actualizar el DOM cuando
// su valor cambie.
const animes = ref([]);
const genres = ref([]);
const activeTag = ref(0); // Guardara la referencia del id del género seleccionado, inicialmente es 0 representando a todos los géneros
const fetching = ref(true);
const totalPages = ref(0);
const currentPage = ref(1);
let inputTimeout;

// Usamos watch para observar el cambio de una propiedad reactiva o computada
watch(
  () => props.searchData,
  (newValue) => {
    // Liampiamos el timeout
    clearTimeout(inputTimeout);

    // Creamos un timeout para que se llame a la API despues de 500ms
    // desde que el usuario deja de escribir
    inputTimeout = setTimeout(() => {
      // Si el usuario escribio algo, buscamos
      // y si lo borro todo, buscamos todos los animes populares
      if (newValue) {
        fetchAndUpdateAnimesByQuery(newValue);
      } else {
        fetchAndUpdateAnimes(0);
      }
    }, 500);
  },
);

/**
 * Maneja el evento de cambio de página en la paginación.
 * @param {number} page - La página a la que se debe navegar.
 */
const pageUpdated = (page) => {
  fetchAndUpdateAnimes(activeTag.value, page);
};

const fetchAndUpdateAnimesByQuery = async (query, page = 1) => {
  try {
    fetching.value = true;
    const data = await fetchAnimesByQuery(query, page);

    totalPages.value = data.pagination.last_visible_page;
    currentPage.value = data.pagination.current_page;
    animes.value = data.data;

    fetching.value = false;
  } catch (error) {
    console.error('Error fetching animes:', error);
  }
};

/**
 * Obtiene animes de la API según el género seleccionado o los animes más populares.
 * @param {number} genreId - ID del género seleccionado.
 * @param {number} [page=1] - Número de página a obtener.
 */
const fetchAndUpdateAnimes = async (genreId, page = 1) => {
  fetching.value = true;
  try {
    // Si el id del género es 0, quiere decir que la etiqueta 'Todos' es la seleccionada, por lo cual, se carga la página correspondiente
    // de los animes más populares
    const data =
      genreId === 0 ? await fetchAnimesByPopularity(page) : await fetchAnimesByGenre(genreId, page);

    totalPages.value = data.pagination.last_visible_page;
    currentPage.value = data.pagination.current_page;
    animes.value = data.data;
  } catch (error) {
    console.error('Error fetching animes:', error);
  } finally {
    fetching.value = false;
  }
};

/**
 * Establece el género activo y carga los animes de ese género.
 * @param {number} genreId - ID del género seleccionado.
 */
const setActiveTag = (genreId) => {
  animes.value = [];
  activeTag.value = genreId;
  currentPage.value = currentPage.value + 1;
  fetchAndUpdateAnimes(genreId);
};

// Hook de ciclo de vida que se ejecuta al montar el componente.
onMounted(async () => {
  try {
    const genreData = await fetchGenres(); // Fetch inicial de géneros
    genres.value = [new AnimeGenre(0, 'All'), ...genreData];

    await fetchAndUpdateAnimes(0); // Fetch inicial de animes
  } catch (error) {
    console.error('Error fetching genres or initial animes:', error);
  }
});
</script>

<style scoped>
#container-header {
  grid-area: header;
  height: 100px;
  margin-bottom: 20px;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}

#container-body {
  grid-area: body;
  display: grid;
  justify-content: center;
  gap: 20px;
  align-items: center;
  grid-template-columns: repeat(auto-fi, minmax(200px, 1fr));
}

#loader {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 15;
  border: 8px solid #f3f3f3; /* Color de fondo */
  border-top: 8px solid #3498db; /* Color de la parte superior */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: auto;
  animation: spin 1s linear infinite;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

#container-footer {
  margin-top: 30px;
  text-align: center;
}

#container-footer button:hover {
  background-color: #2471a3;
  color: white;
}
</style>
