<template>
  <main>
    <div class="init_message" v-if="!isSearching && !success">
      <div class="jumbotron">
        <img :src="linkImgPoster + jumboData.backdrop_path" alt="">
        <div class="jumbo-text">
          <div class="container">
            <div class="details">
              <h1>{{ jumboData.title }}</h1>
              <h4 v-if="jumboData.position <= 5">
                <span class="top-10">
                  <small>Top</small>
                  <small>10</small>
                </span>
                Oggi al n. {{ jumboData.position }} tra i più visti in Italia
              </h4>
              <p>
                {{ jumboData.overview }}
              </p>
              <div class="action">
                <a href="#" class="btn btn-primary">Riproduci</a>
                <a href="#" class="btn btn-secondary ml-1">Altre Info</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /.jumbotron -->
      <div class="popular_movies">
        <div class="container">
          <h3>I Film più popolari su Boolfix</h3>
          <div class="row g-1">
            <div class="col-5 h-100 position-relative movie"
              :class="index = 0 || index % 5 === 0 ? 'left' : Number(index.toString().split('').reverse().join(',').slice(0, 1)) === 9 || Number(index.toString().split('').reverse().join(',').slice(0, 1)) === 4 ? 'right' : ''"
              v-for="(movie, index) in popMovies" :key="movie.id">
              <div class="card-movie dropdown">
                <img :src="linkImgPoster + movie.backdrop_path" alt="">
                <div class="dropdown-content">
                  <div class="details">
                    <h4>{{ movie.title }}</h4>
                    <p>
                      {{ movie.overview }}
                    </p>
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
      <!-- /.popular_movies -->
    </div>
    <Loading v-else-if="isLoading && !success" />
    <div class="search container" v-else>
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
import axios from "axios";

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
      popMovies: null,
      jumboData: null,
      linkImgPoster: "https://image.tmdb.org/t/p/original/",
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
    getPopMovies() {
      axios.get('https://api.themoviedb.org/3/movie/popular?api_key=d755a2b665e5b254648b51fb19699f56&language=en-US&page=1')
        .then((response) => {
          //console.log(response);
          this.popMovies = response.data.results;
          this.getRandomJumbo();
        })
        .catch((e) => { console.log(e); })
    },
    getRandomJumbo() {
      //console.log(this.popMovies.length);
      let i;
      if (this.popMovies.lenght > 10) {
        i = Math.floor(Math.random() * 10);
      } else {
        i = Math.floor(Math.random() * this.popMovies.length);
      }
      //console.log(i);
      this.jumboData = this.popMovies[i];
      //console.log(this.jumboData);
      this.jumboData.position = i + 1;
    },
  },
  created() {
    this.getPopMovies();
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
    .col-5 {
      width: calc((100% - 1rem) / 5);
    }

    .jumbotron {
      position: relative;

      img {
        display: block;
        max-height: 100vh;
        object-fit: cover;
        object-position: top;
        width: 100%;
      }

      .jumbo-text {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        background: linear-gradient(45deg, black, transparent);

        .container {
          height: 100%;

          .details {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            height: 100%;
            width: max(40%);
            padding-bottom: 6rem;

            h1 {
              font-size: 3rem;
              padding: 1rem 0;
            }

            h4 {
              font-size: 1.25rem;
              padding: 0.5rem 0;
              display: flex;
              align-items: center;
              gap: 0.5rem;

              .top-10 {
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 0.75rem;
                text-transform: uppercase;
                padding: 0.1rem;
                border-radius: 0.25rem;
                color: $darkestColor;
                background-color: #dc1a28;
              }

            }

            p {
              padding: 0.25rem 0;
              line-height: 1.25rem;
            }

            .action {
              padding: 1rem 0;
            }
          }
        }
      }
    }

    .dropdown {
      position: relative;
      z-index: 0;
      transform: translateY(0px);
      transition: all 1000ms 500ms;

      img {
        display: block;
      }

      .dropdown-content {
        position: absolute;
        box-shadow: 0px 3px 15px 3px #00000082;
        border-bottom: 1px solid black;
        height: 80%;
        overflow-y: auto;
        font-size: 0.75rem;
        opacity: 0;
        background-color: $darkestColor;
        padding: 0.5rem;
        transition: all 1000ms 500ms;
      }

      &:hover {
        transform: translateY(-40%) scale(1.5);
        z-index: 200;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

        .dropdown-content {
          opacity: 1;
        }
      }
    }

    .left {
      .dropdown:hover {
        transform: translateY(-40%) scale(1.5) translatex(16.5%);
      }
    }

    .right {
      .dropdown:hover {
        transform: translateY(-40%) scale(1.5) translatex(-16.5%);
      }
    }

    .popular_movies {
      position: relative;
      margin-top: -6rem;
      background: linear-gradient(to bottom, transparent, #141414 6rem);

      h3 {
        padding: 3rem 0 1rem;
      }
    }
  }

  h2 {
    width: 100%;
    margin-top: 1rem;
  }
}

.search {
  padding-top: 5rem;
}
</style>