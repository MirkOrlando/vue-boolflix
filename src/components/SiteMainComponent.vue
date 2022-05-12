<template>
  <main>
    <p class="init_message" v-if="!isSearching && !success">
      Nothing to show... Start a new search!
    </p>
    <div class="loading-view" v-else-if="isLoading && !success">
      <p>Loading...</p>
      <div class="circle_bg">
        <div class="circle_sm"></div>
      </div>
    </div>
    <div class="container" v-else>
      <div class="row">
        <!--         <h2>Movies:</h2> -->
        <MovieCard
          :movie="movie"
          v-for="movie in showMovies"
          :key="movie.id"
          @onposter="hasToScroll"
        />
        <!--         <h2>Tv Shows:</h2> -->
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
  padding: 1rem 0;
  background-color: $darkestColor;
  color: $lightestColor;
}

.init_message {
  font-size: 1.5rem;
  text-align: center;
  margin-top: 1rem;
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