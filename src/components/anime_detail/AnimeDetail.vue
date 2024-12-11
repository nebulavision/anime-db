<template>
  <section id="card">
    <button id="close-button" @click="onClose">
      <i class="fas fa-times"></i>
    </button>
    <div id="card-info">
      <StartRating class="align-right" :value="anime.score" />
      <div id="anime-title">
        <h1>{{ anime.title }}</h1>
      </div>
      <div class="align-right-column">
        <h4>GENRE</h4>
        <p v-for="genre in anime.genres" :key="genre.mal_id">{{ genre.name }}</p>
      </div>
      <div v-if="anime.year">
        <div>{{ anime.duration }}, {{ anime.year }}</div>
      </div>
      <div v-else>
        <div>{{ anime.duration }}</div>
      </div>
      <div id="anime-synopsis">{{ anime.synopsis }}</div>
      <div class="align-right-column">
        <h4>Studio</h4>
        <p v-for="studio in anime.studios" :key="studio.mal_id">{{ studio.name }}</p>
      </div>
      <div class="align-right-column">
        <h4>PRODUCER</h4>
        <p v-for="producer in anime.producers" :key="producer.mal_id">{{ producer.name }}</p>
      </div>
      <div id="anime-links-container" v-if="anime.trailer.url">
        <a :href="anime.trailer.url" target="_blank">Trailer</a>
      </div>
    </div>
    <div id="card-image-container">
      <img id="card-image" :src="anime.images.webp.image_url" :alt="anime.title" />
    </div>
  </section>
</template>

<script setup>
import StartRating from './StartRating.vue';

const props = defineProps({
  anime: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['onclose']);

const onClose = () => emit('onclose');

const stars = document.querySelectorAll('.star');
const fullStars = Math.floor(props.anime.score / 2); // Número de estrellas llenas
const halfStar = props.anime.score % 2 >= 1 ? 1 : 0; // Media estrella, si corresponde

stars.forEach((star, index) => {
  if (index < fullStars) {
    star.className = 'star full'; // Llena
  } else if (index === fullStars && halfStar) {
    star.className = 'star half'; // Media
  } else {
    star.className = 'star'; // Vacía
  }
});

//updateStars(starsContainer, props.anime.score);
</script>

<style scoped>
/* PARA PANTALLAS GRANDES */
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

#close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: red;
  z-index: 100;
}

#card {
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 20px;
  background-color: #1c2833;
}

#card-info {
  color: white;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 30px;
}

#card-image {
  width: 250px;
  object-fit: cover;
  border-radius: 15px;
  margin-left: 20px;
}

.align-right {
  display: flex;
  justify-content: right;
  text-align: right;
  padding-bottom: 20px;
}

.align-right-column {
  display: flex;
  flex-direction: column;
  justify-content: right;
  text-align: right;
  padding-bottom: 20px;
}

.stars {
  font-size: 24px;
  color: #ffc107;
}

.star::before {
  content: '\f006';
  font-family: 'Font Awesome 5 Free';
  font-weight: 400;
}

.star.full::before {
  content: '\f005';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
}

.star.half::before {
  content: '\f123';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
}

#anime-synopsis {
  grid-column: 2;
  grid-row: 3 / 4;

  display: block;
  text-overflow: ellipsis;
  overflow: scroll;
  line-height: 1.5em;
  max-height: calc(1.5em * 5);
}

#anime-links-container {
  display: flex;
  align-items: center;
}
#anime-links-container a {
  max-width: 200px;
  padding: 10px;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

#anime-links-container a:hover {
  background-color: #2ecc71;
}

/* PARA PANTALLAS PEQUEÑAS */
@media (max-width: 900px) {
  #card {
    flex-direction: column;
    padding: 15px;
    gap: 15px;
  }

  #card-image-container {
    width: 100%;
    text-align: center;
  }

  #card-image {
    width: 50%;
    max-width: 100%;
    border-radius: 10px;
    margin-bottom: 15px;
  }

  #card-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
  }

  .align-right {
    display: flex;
    justify-content: center;
    text-align: center;
    padding-bottom: 10px;
  }

  .align-right-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin-top: 10px;
  }

  .align-right-column p:last-of-type {
    margin-bottom: 20px;
  }

  .align-right-column h4 {
    margin-bottom: 5px;
  }

  #anime-title h1 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
  }

  #anime-synopsis {
    font-size: 14px;
    line-height: 1.5;
    padding: 10px;
    background-color: #2c3e50;
    border-radius: 8px;
  }

  #anime-links-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
    text-align: center;
  }

  #anime-links-container a {
    width: 100%;
    max-width: 200px;
    text-decoration: none;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    background-color: #27ae60;
    color: white;
    border-radius: 8px;
    transition: background-color 0.3s ease;
  }

  #anime-links-container a:hover {
    background-color: #2ecc71;
  }
}
</style>
