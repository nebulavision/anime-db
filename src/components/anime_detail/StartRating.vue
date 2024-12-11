<template>
  <div class="stars">
    <span
      v-for="(star, index) in stars"
      :key="index"
      :class="star"
      class="star"
    ></span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  value: {
    type: Number,
    required: true
  }
});

const stars = computed(() => {
  const fullStars = Math.floor(props.value / 2); // Número de estrellas llenas
  const halfStar = props.value % 2 >= 1 ? 1 : 0; // Media estrella si el valor es impar
  const emptyStars = 5 - fullStars - halfStar; // Estrellas vacías restantes

  return [
        ...Array(fullStars).fill("full"),
        ...Array(halfStar).fill("half"),
        ...Array(emptyStars).fill("empty"),
      ];
});
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

.stars {
  display: inline-flex;
  font-size: 24px;
  color: #ffc107; /* Color de las estrellas */
}

.star {
  margin-right: 5px;
}

.star.full::before {
  content: '\f005'; /* Estrella llena */
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
}

.star.half::before {
  content: '\f123'; /* Media estrella */
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
}

.star.empty::before {
  content: '\f006'; /* Estrella vacía */
  font-family: 'Font Awesome 5 Free';
  font-weight: 400;
}
</style>
