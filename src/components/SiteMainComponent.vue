<template>
  <main>
    <ul style="padding: 1rem" v-for="movie in movies" :key="movie.id">
      <li><strong>Titolo:</strong> {{ movie.title }}</li>
      <li><strong>Titolo originale:</strong> {{ movie.original_title }}</li>
      <li><strong>Lingua:</strong> {{ movie.original_language }}</li>
      <li><strong>Voto:</strong> {{ movie.vote_average }}</li>
    </ul>
  </main>
</template>

<script>
/* import state from "@/state.js"; */

export default {
  name: "SiteMainComponent",
  data() {
    return {
      loading: null,
      error: null,
      movies: null,
    };
  },
  /*   computed: {
    showMovies() {
      if (state.query) {
        return (this.movies = state.movies);
      } else {
        return this.movies;
      }
    },
  }, */
};
</script>