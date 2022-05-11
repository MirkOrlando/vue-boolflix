<template>
  <main>
    <div class="container" v-if="!isLoading">
      <div class="row">
        <h2>Movies:</h2>
        <MovieCard
          :movie="movie"
          v-for="movie in showMovies"
          :key="movie.id"
          @onposter="hasToScroll"
        />
        <h2>Tv Shows:</h2>
        <TvShowCard
          :tvShow="tvShow"
          v-for="tvShow in showTvShows"
          :key="tvShow.id"
          @onposter="hasToScroll"
        />
      </div>
    </div>
    <!--     <p
      v-else-if="
        isLoading && (state.movies.length !== 0 || state.tvShows.length !== 0)
      "
    >
      Nothing to show, star a new search!
    </p>
    <div class="loading-view" v-else>
      <p>Loading...</p>
      <div class="circle_bg">
        <div class="circle_sm"></div>
      </div>
    </div> -->
  </main>
</template>

<script>
import state from "@/state.js";
import MovieCard from "@/components/MovieCardComponent.vue";
import TvShowCard from "@/components/TvShowCardComponent.vue";

export default {
  name: "SiteMainComponent",
  components: {
    MovieCard,
    TvShowCard,
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
    isLoading() {
      return state.loading;
    },
    showMovies() {
      if (!state.loading) {
        return state.movies;
      } else {
        return this.movies;
      }
    },
    showTvShows() {
      if (!state.loading) {
        return state.tvShows;
      } else {
        return this.tvShows;
      }
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
  padding: 1rem 0;
  background-color: $darkestColor;
  color: $lightestColor;
  h2 {
    width: 100%;
    margin: 1rem 0 0 0.5rem;
  }
}

/* loading */
.loading-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  [class^="circle"] {
    border-radius: 50%;
    aspect-ratio: 1/1;
  }
  .circle_bg {
    margin: 1rem;
    background-color: #3a4242;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: getBigger 2s linear infinite;
    .circle_sm {
      background-color: #212121;
      width: 40px;
      animation: getSmaller 2s linear infinite;
    }
  }
}

/* animation */
@keyframes getSmaller {
  50% {
    transform: scale(0.4);
  }

  100% {
    transform: scale(1);
  }
}
@keyframes getBigger {
  50% {
    transform: scale(1.3);
  }

  100% {
    transform: scale(1);
  }
}
</style>