<template>
  <main>
    <div class="init_message" v-if="!isSearching && !success">
      <div class="jumbotron">
        <img
          src="https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?cs=srgb&dl=pexels-lumn-167699.jpg&fm=jpg"
          alt="">
        <div class="jumbo-text">
          <div class="container">
            <h1>TITLE</h1>
            <p>Oggi al X posto in Italia</p>
          </div>
        </div>
      </div>
    </div>
    <Loading v-else-if="isLoading && !success" />
    <div class="container" v-else>
      <div class="row">
        <h2 v-if="showMovies.length > 0">Movies:</h2>
        <MovieCard :movie="movie" v-for="movie in showMovies" :key="movie.id" @onposter="hasToScroll" />
        <h2 v-if="showTvShows.length > 0">Tv Shows:</h2>
        <TvShowCard :tvShow="tvShow" v-for="tvShow in showTvShows" :key="tvShow.id" @onposter="hasToScroll" />
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
  min-height: calc(100vh - 80.67px);
  background-color: $darkestColor;
  color: $lightestColor;

  .init_message {
    font-size: 1.5rem;

    .jumbotron {
      position: relative;
    }

    .jumbo-text {
      position: absolute;
    }
  }

  h2 {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>