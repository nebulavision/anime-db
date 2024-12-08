/**
 * Obtiene una lista de animes ordenados por popularidad.
 * @param {number} page - La página a obtener, por defecto 1.
 * @returns {Promise<Object>} - La respuesta de la API que contiene la lista de animes y datos de paginación.
 */
export async function fetchAnimesByPopularity(page = 1) {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=${page}&limit=24`,
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Obtiene una lista de animes cuyo título contiene la query especificada.
 * @param {string} query - La query para buscar en los títulos de los animes.
 * @param {number} [page=1] - La página a obtener, por defecto es 1.
 * @returns {Promise<Object>} - La respuesta de la API que contiene la lista de animes y datos de paginación.
 */
export async function fetchAnimesByQuery(query, page = 1) {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${query}&page=${page}&limit=24`,
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Obtiene una lista de animes pertenecientes a un género específico.
 * @param {string} genre - El género del anime a obtener.
 * @param {number} [page=1] - La página a obtener, por defecto es 1.
 * @returns {Promise<Object>} - La respuesta de la API que contiene la lista de animes y datos adicionales.
 */
export async function fetchAnimesByGenre(genre, page = 1) {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?genres=${genre}&order_by=score&sort=desc&page=${page}`,
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
