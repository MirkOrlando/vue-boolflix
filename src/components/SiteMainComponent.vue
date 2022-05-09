<template>
  <main>
    <ul style="padding: 1rem" v-for="movie in showCards" :key="movie.id">
      <li><strong>Titolo:</strong> {{ movie.title }}</li>
      <li><strong>Titolo originale:</strong> {{ movie.original_title }}</li>
      <li>
        <strong>Lingua: </strong>
        <span v-if="movie.thereIsFlag">
          <flag :iso="movie.flag_svg" />
        </span>
        <span v-else>{{ movie.original_language }}</span>
      </li>
      <li><strong>Voto:</strong> {{ movie.vote_average }}</li>
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
      cards: null,
    };
  },
  computed: {
    showCards() {
      if (!state.loadingMovies && !state.loadingTvShows) {
        return state.cards;
      } else {
        return this.cards;
      }
    },
  },
};
</script>