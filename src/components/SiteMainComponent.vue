<template>
  <main>
    <p class="init_message" v-if="!isSearching && !success">
      Nothing to show... Start a new search!
    </p>
    <Loading v-else-if="isLoading && !success" />
    <div class="container" v-else>
      <div class="row">
        <h2 v-if="showMovies.length > 0">Movies:</h2>
        <MovieCard
          :movie="movie"
          v-for="movie in showMovies"
          :key="movie.id"
          @onposter="hasToScroll"
        />
        <h2 v-if="showTvShows.length > 0">Tv Shows:</h2>
        <TvShowCard
          :tvShow="tvShow"
          v-for="tvShow in showTvShows"
          :key="tvShow.id"
          @onposter="hasToScroll"
        />
      </div>
    </div>
  </main>
</template>

<script>
import state from "@/state.js";
import MovieCard from "@/components/MovieCardComponent.vue";
import TvShowCard from "@/components/TvShowCardComponent.vue";
import Loading from "@/components/LoadingComponent.vue";

export default {
  name: "SiteMainComponent",
  components: {
    MovieCard,
    TvShowCard,
    Loading,
  },
  data() {
    return {
      loading: null,
      error: null,
      movies: null,
    };
  },
  methods: {
    hasToScroll() {
      //console.log(state.detailsWrapper, state.detailsText);
      if (
        state.detailsText.clientHeight + 10 >
        state.detailsWrapper.clientHeight
      ) {
        state.detailsText.classList.add("scroll");
        //console.log(state.detailsText, "scroll");
      }
    },
  },
  computed: {
    isSearching() {
      if (state.searching) {
        return true;
      } else {
        return false;
      }
    },
    isLoading() {
      if (!state.loadingMovies && !state.loadingTvShows) {
        return false;
      } else {
        return true;
      }
    },
    success() {
      if (state.statusMovies === 200 && state.statusTvShows === 200) {
        return true;
      } else {
        return false;
      }
    },
    showMovies() {
      return state.movies;
    },
    showTvShows() {
      return state.tvShows;
    },
    getRating() {
      return (number) => {
        return Math.ceil(number / 2);
      };
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  min-height: calc(100vh - 237px);
  background-color: $darkestColor;
  color: $lightestColor;
  h2 {
    width: 100%;
    margin-top: 1rem;
  }
}

.init_message {
  font-size: 1.5rem;
  text-align: center;
  padding-top: 1rem;
}
</style>