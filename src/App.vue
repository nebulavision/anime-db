<template>
  <header id="header">
    <h1>Anime DB</h1>
    <AnimeSearchBar id="search-bar" @onsearch="onSearch" />
  </header>
  <main>
    <AnimeContainer :searchData="searchData" />
  </main>
  <footer id="footer">
    <p>Bruno Díaz Martín - 2024</p>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import AnimeContainer from './components/AnimeContainer.vue';
import AnimeSearchBar from './components/AnimeSearchBar.vue';

const searchData = ref();

const onSearch = (query) => {
  searchData.value = query;
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&display=swap');

#header {
  background-image: url('../public/banner.jpg');
  background-size: cover;
  background-position: -5px;
  opacity: 0.9;
  height: 200px;
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

main {
  background-color: #17202a;
  color: white;
  flex: 1;
  padding: 60px;
}

#footer {
  padding: 10px;
  background-color: #17202a;
  color: white;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  font-size: 16px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.5);
}
</style>
