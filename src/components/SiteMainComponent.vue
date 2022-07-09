<template>
  <main>
    <div class="init_message" v-if="!isSearching && !success">
      <div class="jumbotron">
        <img
          src="https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?cs=srgb&dl=pexels-lumn-167699.jpg&fm=jpg"
          alt="">
        <div class="container jumbo-text">
          <div class="details">
            <h1>TITLE</h1>
            <h4>Oggi al X posto in Italia</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda corrupti totam et repellat, nobis
              dolorem beatae laboriosam ab voluptas nisi, ullam repellendus eius? Quis reprehenderit modi voluptatibus
              nulla eum neque.</p>
            <div class="action">
              <a href="#" class="btn btn-primary">Riproduci</a>
              <a href="#" class="btn btn-secondary ml-1">Altre Info</a>
            </div>
          </div>
        </div>
      </div>
      <!-- /.jumbotron -->
      <div class="container">
        <h3>I più popolari su Boolfix</h3>
        <div class="row g-1">
          <div class="col-5 h-100 position-relative">
            <div class="card dropdown">
              <img src="https://image.tmdb.org/t/p/original/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg" alt="">
              <div class="dropdown-content">
                <div class="details">
                  <h4>title</h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet cumque quod ipsam odit provident,
                    expedita nesciunt! Nemo eum magnam itaque excepturi labore quae repellendus adipisci odit quos,
                    nobis autem in!</p>
                </div>
                <div class="metadata">
                  <div class="genre">
                    <strong>Genre: </strong>
                    <span>Action</span>
                  </div>
                  <div class="language">
                    <strong>Original Language: </strong>
                    <span>Eng</span>
                  </div>
                  <div class="vote">
                    <strong>Rating: </strong>
                    <span>8/10</span>
                  </div>
                  <div class="cast">
                    <strong>Cast: </strong>
                    <span>Robert Downey Jr.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-5 h-100 position-relative">
            <div class="card dropdown">
              <img src="https://image.tmdb.org/t/p/original/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg" alt="">
              <div class="dropdown-content">
                <div class="details">
                  <h4>title</h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet cumque quod ipsam odit provident,
                    expedita nesciunt! Nemo eum magnam itaque excepturi labore quae repellendus adipisci odit quos,
                    nobis autem in!</p>
                </div>
                <div class="metadata">
                  <div class="genre">
                    <strong>Genre: </strong>
                    <span>Action</span>
                  </div>
                  <div class="language">
                    <strong>Original Language: </strong>
                    <span>Eng</span>
                  </div>
                  <div class="vote">
                    <strong>Rating: </strong>
                    <span>8/10</span>
                  </div>
                  <div class="cast">
                    <strong>Cast: </strong>
                    <span>Robert Downey Jr.</span>
                  </div>
                </div>
              </div>
            </div>
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
.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.35rem;
  font-weight: bold;
  transition: all 250ms linear;
}

.btn-primary {
  color: black;
  background-color: white;

  &:hover {
    background-color: #ffffffcc;
  }

}

.btn-secondary {
  color: white;
  background-color: #63645d;

  &:hover {
    background-color: #63645dcc;
  }

}

main {
  min-height: calc(100vh - 80.67px);
  background-color: $darkestColor;
  color: $lightestColor;

  .init_message {
    .jumbotron {
      position: relative;

      img {
        display: block;
        max-height: 100vh;
        object-fit: cover;
        object-position: center;
        width: 100%;
      }

      .jumbo-text {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        background: linear-gradient(45deg, black, transparent);

        .details {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          height: 100%;
          width: max(40%);
          padding-bottom: 6rem;

          .action {
            padding: 1rem 0;
          }
        }
      }
    }

    .dropdown {
      position: relative;
      z-index: 0;
      transform: translateY(0px);
      transition: all 1000ms;

      img {
        display: block;
      }

      .dropdown-content {
        display: none;
        font-size: 0.5rem;
        opacity: 1;
        background-color: $darkestColor;
        transition: all 1000ms;
        padding: 0.5rem;
      }

      &:hover {
        transform: translateY(-50%) scale(2);
        z-index: 200;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

        .dropdown-content {
          display: block;
          opacity: 1;
        }
      }


    }

  }

  h2 {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>