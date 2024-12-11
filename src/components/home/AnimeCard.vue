<!--
  * AnimeCard
  * -------------
  * Componente que representa una tarjeta de presentación de un anime, mostrando su imagen, puntuación, título y géneros.
  *
  * Props:
  * - anime (Object): Objeto que contiene los datos del anime, como título, puntuación y géneros.
  *
  * Ejemplo de uso:
  * <AnimeCard :anime="anime" />
  *
  * @component
-->
<template>
  <!--
  v-bind="$attrs"

  Este atributo enlaza automáticamente todos los atributos no relacionados con las `props` del componente
  (por ejemplo: class, id, data-*, etc.) al elemento en el que se utiliza.

  Contexto:
  - Cuando un componente recibe atributos no definidos en sus `props`, estos se colocan en `$attrs`.
  - Usar v-bind="$attrs" permite propagar esos atributos al elemento deseado.

  Nota:
  Esto es útil para evitar advertencias como:
  "Extraneous non-props attributes were passed to component..."
-->
  <section class="card" @click="handleClick(anime.mal_id)" v-bind="$attrs">
    <header class="card-header">
      <img class="card-header-image" :src="anime.images.webp.image_url" :alt="anime.title" />
      <div class="badge red">{{ anime.score ?? 0 }}</div>
      <div class="badge-holder">
        <div class="badge brown" v-for="genre in anime.genres" :key="genre.name">
          {{ genre.name }}
        </div>
      </div>
    </header>
    <div class="card-body">
      <p>{{ anime.title }}</p>
    </div>
  </section>
  <!-- Modal -->
  <!--
        @click.self es un modificador del evento que indica que solo se activa si se hace
        clic directamente en el elemento u no en sus hijo
    -->
  <article v-if="showModal" id="modal-overlay">
    <div id="modal-container">
      <AnimeDetail :anime="anime" @onclose="closeModal" />
    </div>
  </article>
</template>

<script setup>
import AnimeDetail from '@/components/anime_detail/AnimeDetail.vue';
import { useModal } from '@/composables/useModal';

const props = defineProps({
  anime: {
    type: Object,
    required: true,
  },
});

const { showModal, selectedAnime, openModal, closeModal } = useModal();

/**
 * Maneja el evento de clic en el componente para mostrar el ID del anime.
 *
 * @param {number} animeId - El ID del anime representado por la instancia del componente.
 */
const handleClick = (animeId) => {
  selectedAnime.value = animeId;
  openModal(props.anime);
};
</script>

<style scoped>
.card {
  width: 100%;
  border-radius: 15px;
  cursor: pointer;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.04);
}

.card-header {
  position: relative;
  width: 100%;
}

.card-header-image {
  width: 100%;
  height: 376px;
  border-radius: 15px;
  object-fit: cover;
}

.badge {
  color: #fff;
  padding: 5px 9px;
  border-radius: 15px;
  font-size: 14px;
  display: inline-block;
}

.red {
  background-color: red;
  font-size: 16px;
  position: absolute;
  top: 2%;
  left: 3%;
}

.brown {
  background-color: #ca8080;
  opacity: 0.9;
}

.badge-holder {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding: 0 10px;
  position: absolute;
  bottom: 10px;
  left: 5px;
  width: 99%;
  margin-bottom: 10px;
}

.card-body {
  padding: 10px 0;
}

.card-body {
  padding: 10px 0;
  height: 50px;
}

.card-body p {
  color: white;
  font-size: 17px;
  font-weight: 500;
  line-height: 1.2rem;
  padding-bottom: 15px;
}

#modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

#modal-container {
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  max-width: 90%;
}

</style>
