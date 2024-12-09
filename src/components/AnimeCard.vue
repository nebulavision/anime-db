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
  <section class="card" @click="handleClick(anime.mal_id)">
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
</template>

<script setup>
defineProps({
  anime: {
    type: Object,
    required: true,
  },
});

/**
 * Maneja el evento de clic en el componente para mostrar el ID del anime.
 *
 * @param {number} animeId - El ID del anime representado por la instancia del componente.
 */
const handleClick = (animeId) => console.log(animeId);
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
</style>
