<template>
  <main>
    <ul style="padding: 1rem" v-for="movie in showMovies" :key="movie.id">
      <li>
        <img :src="movie.fullLinkPoster" :alt="movie.original_title" />
      </li>
      <li><strong>Titolo:</strong> {{ movie.title }}</li>
      <li><strong>Titolo originale:</strong> {{ movie.original_title }}</li>
      <li>
        <strong>Lingua: </strong>
        <span v-if="movie.thereIsFlag">
          <flag :iso="movie.flag_svg" />
        </span>
        <span v-else>{{ movie.original_language }}</span>
      </li>
      <li>
        <strong>Voto: </strong>

        <font-awesome-icon
          icon="fa-solid fa-star"
          v-for="star in movie.rating"
          :key="star.sKey"
        />

        <font-awesome-icon
          icon="fa-regular fa-star"
          v-for="star in -movie.ratingEmptyStar"
          :key="star.sKey"
        />
      </li>
      <!-- voto movies -->
    </ul>
    <ul style="padding: 1rem" v-for="tvShow in showTvShows" :key="tvShow.id">
      <li><img :src="tvShow.fullLinkPoster" :alt="tvShow.original_name" /></li>
      <li><strong>Titolo:</strong> {{ tvShow.name }}</li>
      <li><strong>Titolo originale:</strong> {{ tvShow.original_name }}</li>
      <li>
        <strong>Lingua: </strong>
        <span v-if="tvShow.thereIsFlag">
          <flag :iso="tvShow.flag_svg" />
        </span>
        <span v-else>{{ tvShow.original_language }}</span>
      </li>
      <li>
        <strong>Voto: </strong>
        <font-awesome-icon
          icon="fa-solid fa-star"
          v-for="star in tvShow.rating"
          :key="star.sKey"
        />
        <font-awesome-icon
          icon="fa-regular fa-star"
          v-for="star in tvShow.ratingEmptyStar"
          :key="star.sKey"
        />
      </li>
      <!-- voto tvshow -->
    </ul>
  </main>
</template>

<script>
import state from "@/state.js";

export default {
  name: "SiteMainComponent",
  data() {
    return {
      loading: null,
      error: null,
      movies: null,
    };
  },
  computed: {
    showMovies() {
      if (!state.loadingMovies) {
        return state.movies;
      } else {
        return this.movies;
      }
    },
    showTvShows() {
      if (!state.loadingTvShows) {
        return state.tvShows;
      } else {
        return this.tvShows;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  max-width: 342px;
  height: 513px;
  object-fit: contain;
}
</style>