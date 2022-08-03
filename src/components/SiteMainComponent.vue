<template>
  <main>
    <div class="init_message" v-if="!isSearching && !success">
      <div class="jumbotron">
        <img :src="linkImgPoster + jumboData.backdrop_path" alt="">
        <div class="jumbo-text">
          <div class="container">
            <div class="details">
              <h1>{{ jumboData.title }}</h1>
              <h4 v-if="jumboData.position <= 10">
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
                <img :src="linkImgPoster + movie.backdrop_path" :alt="movie.title + 'poster'">
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
                      <span v-for="genre in movie.genres" :key="genre.id">
                        {{ genre.name }}
                      </span>
                    </div>
                    <div class="language">
                      <strong>Original Language: </strong>
                      <span v-if="movie.thereIsFlag">
                        <flag :iso="movie.flag_svg" />
                      </span>
                      <span v-else>{{ movie.original_language }}</span>
                    </div>
                    <div class="vote">
                      <strong>Rating: </strong>
                      <font-awesome-icon icon="fa-solid fa-star" v-for="star in getRating(movie.vote_average)"
                        :key="star + 'f'" />

                      <font-awesome-icon icon="fa-regular fa-star" v-for="star in 5 - getRating(movie.vote_average)"
                        :key="star + 'e'" />
                    </div>
                    <div class="cast">
                      <strong>Cast: </strong>
                      <span v-for="actor in movie.cast" :key="actor.cast_id">
                        {{ actor.name }}
                      </span>
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
      <div class="row g-1">
        <h2 v-if="showMovies.length > 0">Movies:</h2>
        <MovieCard :movie="movie" :link="linkImgPoster"
          :direction="index = 0 || index % 5 === 0 ? 'left' : Number(index.toString().split('').reverse().join(',').slice(0, 1)) === 9 || Number(index.toString().split('').reverse().join(',').slice(0, 1)) === 4 ? 'right' : ''"
          v-for="(movie, index) in showMovies" :key="movie.id" @onposter="hasToScroll" />
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
    getLanguageFlagMovie(object) {
      object.forEach((movie) => {
        switch (true) {
          case movie.original_language.toLowerCase() === "it":
            movie.thereIsFlag = true;
            movie.flag_svg = "it";
            break;
          case movie.original_language.toLowerCase() === "fr":
            movie.thereIsFlag = true;
            movie.flag_svg = "fr";
            break;
          case movie.original_language.toLowerCase() === "de":
            movie.thereIsFlag = true;
            movie.flag_svg = "de";
            break;
          case movie.original_language.toLowerCase() === "en":
            movie.thereIsFlag = true;
            movie.flag_svg = "gb";
            break;
          case movie.original_language.toLowerCase() === "es":
            movie.thereIsFlag = true;
            movie.flag_svg = "es";
            break;
          case movie.original_language.toLowerCase() === "ru":
            movie.thereIsFlag = true;
            movie.flag_svg = "ru";
            break;
          case movie.original_language.toLowerCase() === "cn":
            movie.thereIsFlag = true;
            movie.flag_svg = "cn";
            break;

          default:
            break;
        }
      });
    },
    getPopMovies() {
      axios.get('https://api.themoviedb.org/3/movie/popular?api_key=d755a2b665e5b254648b51fb19699f56&language=en-US&page=1')
        .then((response) => {
          //console.log(response);
          this.popMovies = response.data.results;
          this.getCastMovie(this.popMovies);
          this.getGenreMovie(this.popMovies);
          this.getLanguageFlagMovie(this.popMovies);
          this.getRandomJumbo();
        })
        .catch((e) => { console.log(e); })
    },
    getCastMovie(object) {
      object.forEach(movie => {
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=d755a2b665e5b254648b51fb19699f56`
          )
          .then((response) => {
            //console.log(response);
            const cast = [];
            for (let i = 0; i < 5; i++) {
              if (response.data.cast.length !== 0 && response.data.cast[i]) {
                cast.push(response.data.cast[i]);
              }
            }
            this.$set(movie, 'cast', cast);
            //console.log(movie);
          })
          .catch((error) => {
            console.log(error);
          });
      });
      //console.log(object);
    },
    getGenreMovie(object) {
      object.forEach(movie => {
        axios
          .get(
            "https://api.themoviedb.org/3/genre/movie/list?api_key=d755a2b665e5b254648b51fb19699f56"
          )
          .then((response) => {
            //console.log(response);
            const genres = response.data.genres;
            const genresToPush = [];
            if (movie.genre_ids.length > 0) {
              movie.genre_ids.forEach((genre_id) => {
                genres.forEach((genre) => {
                  if (genre_id === genre.id) {
                    genresToPush.push(genre);
                  }
                });
              });
            }
            this.$set(movie, "genres", genresToPush);
            //console.log(movie);
          })
          .catch((error) => {
            console.log(error);
          });
      });
      //console.log(object);
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
    getRating() {
      return (number) => {
        Math.ceil(number / 2)
        return Math.ceil(number / 2);
      };
    },
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
  },
};
</script>

<style lang="scss" scoped>
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