import { ref } from "vue";

/**
 * Composable para manejar el estado de un modal
 *
 * Este composable proporciona estado y funciones para abrir y cerrar un modal,
 * además de almacenar información sobre el elemento seleccionado.
 *
 * @returns {Object} Objeto con las propiedades y métodos para gestionar el modal.
 * @returns {import('vue').Ref<boolean>} showModal - Estado reactivo que indica si el modal está abierto.
 * @returns {import('vue').Ref<Object|null>} selectedAnime - Estado reactivo con la información del elemento seleccionado.
 * @returns {function(Object): void} openModal - Función para abrir el modal con un elemento seleccionado.
 * @returns {function(): void} closeModal - Función para cerrar el modal y limpiar el estado.
 */
export function useModal() {
  // Estado para controlar la visibilidad del modal
  const showModal = ref(false);
  // Estado para almacenar el elemento seleccionado
  const selectedAnime = ref(null);

  /**
   * Abre el modal y establece el elemento seleccionado.
   *
   * @param {Object} anime - El objeto del elemento seleccionado que se mostrará en el modal.
   */
  const openModal = anime => {
    selectedAnime.value = anime;
    showModal.value = true;
  };

  /**
   * Cierra el modal y limpia el estado del elemento seleccionado.
   */
  const closeModal = () => {
    selectedAnime.value = null;
    showModal.value = false;
  };

  return { showModal, selectedAnime, openModal, closeModal };
}
