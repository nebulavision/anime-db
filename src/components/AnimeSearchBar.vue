<!--
 * Searchbar
 * -------------
 * Componente que representa una barra de búsqueda
 *
 * Ejemplo:
 * <SearchBar @onsearch=""/>
 *
 -->
 <template>
    <div class="search-bar">
      <input
        type="text"
        v-model="query"
        @input="onSearch"
        placeholder="Find animes..."
        class="input-search"
      />
    </div>
  </template>

  <script setup>
  import { ref } from 'vue';

  const query = ref('');

  // Emitir eventos al componente padre
  const emit = defineEmits(['onsearch']);

  const onSearch = () => {
    emit('onsearch', query.value);
  }
  </script>

  <style scoped>
  .search-bar {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .input-search {
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 200px;
    font-size: 14px;
  }

  .btn-search {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }

  .btn-search:hover {
    background-color: #0056b3;
  }
  </style>
