<!--
 * Tag
 * -------------
 * Componente que representa un género de anime
 *
 * Props:
 * - text (String): Nombre del género
 * - active (Boolean): Indica si la etiqueta esta seleccionada o no
 *
 * Ejemplo:
 * <GenreTag :text="genre.title" :active="activeTag"/>
 *
-->
<template>
    <button class="tag" :class="{ active: active }">
        {{ text }}
    </button>
</template>

<script setup>
    defineProps({
    text: {
        type: String,
        required: true
      },
    active: {
        type: Boolean,
        required: false
      }
  });
</script>

<style scoped>
    .tag {
        color: black;
        background-color: white;
        padding: 10px 15px;
        font-size: 14px;
        font-weight: bold;
        border-radius: 15px;
        border: none;
        margin: 10px 5px;
        cursor: pointer;
    }

    .tag:hover {
        background-color: rgb(121, 158, 226);
        color: white;
    }

    .active {
        color: white;
        background-color: cornflowerblue;
    }

    .active:hover {
        color: white;
        background-color: cornflowerblue;
    }

    .tag:active {
        transform: scale(0.9);
    }
</style>
