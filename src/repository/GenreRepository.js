import { AnimeGenre } from '../model/AnimeGenre'

/**
 * Obtiene todos los géneros de anime.
 * @returns { Promise<AnimeGenre[]> } - Un array de objetos `AnimeGenre` que representan todos los géneros de anime.
 */
export async function fetchGenres() {
  try {
    const response = await fetch('https://api.jikan.moe/v4/genres/anime')
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    const data = await response.json()

    return data.data.map((genre) => new AnimeGenre(genre.mal_id, genre.name))
  } catch (err) {
    console.log(err)
  }
}
