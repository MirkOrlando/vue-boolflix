<template>
  <div class="search" ref="search">
    <div class="icon" @click="getActiveSearch()">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
    </div>
    <div class="input" ref="input">
      <input type="text" class="input" placeholder="Search something..." ref="text" v-model="query"
        @keyup="startSearch" />
      <div class="pe_1 pointer" @click="deleteSearch()">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import state from "@/state.js";

export default {
  data() {
    return {
      linkImgPoster: "https://image.tmdb.org/t/p/w342/",
      query: "",
      timeout: null,
    };
  },
  methods: {
    getSearchbarDomElementState() {
      state.refs = this.$refs
    },
    getActiveSearch() {
      this.$refs.search.classList.toggle("active");
      this.$refs.input.classList.toggle("active");
      if (this.$refs.input.classList.value.includes('active') && this.$refs.search.classList.value.includes('active')) {
        this.$refs.text.focus();
      }
      if (this.query > 0) {
        this.callAPI(this.query)
      }
    },
    deleteSearch() {
      this.query = "";
      this.$refs.search.classList.remove("active");
      this.$refs.input.classList.remove("active");
      state.movies = null;
      state.tvShows = null;
      state.statusMovies = null;
      state.statusTvShows = null;
      state.searching = false;
      state.loadingMovies = true;
      state.loadingTvShows = true;
    },
    getFullLinkAPITvShows() {
      let fullLink;
      fullLink = this.linkAPITvShows + "&query=" + this.query;
      return fullLink;
    },
    getLanguageFlagMovie() {
      state.movies.forEach((movie) => {
        let lang = movie.original_language.toLowerCase();
        if (lang === "it") {
          movie.flag_svg = "it";
        } else if (lang === "fr") {
          movie.flag_svg = "fr";
        } else if (lang === "de") {
          movie.flag_svg = "de";
        } else if (lang === "en") {
          movie.flag_svg = "en";
        } else if (lang === "es") {
          movie.flag_svg = "es";
        } else if (lang === "ru") {
          movie.flag_svg = "ru";
        } else if (lang === "cn") {
          movie.flag_svg = "cn";
        }
      });
    },
    getLanguageFlagTvShow() {
      state.tvShows.forEach((tvShow) => {
        let lang = tvShow.original_language.toLowerCase();
        if (lang === "it") {
          tvShow.flag_svg = "it";
        } else if (lang === "fr") {
          tvShow.flag_svg = "fr";
        } else if (lang === "de") {
          tvShow.flag_svg = "de";
        } else if (lang === "en") {
          tvShow.flag_svg = "en";
        } else if (lang === "es") {
          tvShow.flag_svg = "es";
        } else if (lang === "ru") {
          tvShow.flag_svg = "ru";
        } else if (lang === "cn") {
          tvShow.flag_svg = "cn";
        }
      });
    },
    getLinkImgMovies() {
      state.movies.forEach((movie) => {
        if (movie.poster_path) {
          movie.fullLinkPoster = this.linkImgPoster + movie.poster_path;
        } else {
          movie.fullLinkPoster =
            "https://icons.iconarchive.com/icons/martz90/circle/512/video-camera-icon.png";
        }
      });
    },
    getLinkImgTvShows() {
      state.tvShows.forEach((tvShow) => {
        if (tvShow.poster_path) {
          tvShow.fullLinkPoster = this.linkImgPoster + tvShow.poster_path;
        } else {
          tvShow.fullLinkPoster =
            "https://icons.iconarchive.com/icons/martz90/circle/512/video-camera-icon.png";
        }
      });
    },
    getCastMovie() {
      for (let i = 0; i < state.movies.length; i++) {
        const movie = state.movies[i];
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=d755a2b665e5b254648b51fb19699f56`
          )
          .then((response) => {
            const cast = [];
            for (let i = 0; i < 5; i++) {
              if (response.data.cast.length !== 0 && response.data.cast[i]) {
                cast.push(response.data.cast[i]);
              }
            }
            this.$set(state.movies[i], "cast", cast);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getCastTvShow() {
      for (let i = 0; i < state.tvShows.length; i++) {
        const tvShow = state.tvShows[i];
        axios
          .get(
            `https://api.themoviedb.org/3/tv/${tvShow.id}/credits?api_key=d755a2b665e5b254648b51fb19699f56`
          )
          .then((response) => {
            const cast = [];
            for (let i = 0; i < 5; i++) {
              if (response.data.cast.length !== 0 && response.data.cast[i]) {
                cast.push(response.data.cast[i]);
              }
            }
            this.$set(state.tvShows[i], "cast", cast);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getGenreMovie() {
      for (let i = 0; i < state.movies.length; i++) {
        const movie = state.movies[i];
        axios
          .get(
            "https://api.themoviedb.org/3/genre/movie/list?api_key=d755a2b665e5b254648b51fb19699f56"
          )
          .then((response) => {
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
            this.$set(state.movies[i], "genres", genresToPush);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.loadingGenreMovies = false;
    },
    getGenreTvShow() {
      for (let i = 0; i < state.tvShows.length; i++) {
        const tvShow = state.tvShows[i];
        axios
          .get(
            "https://api.themoviedb.org/3/genre/tv/list?api_key=d755a2b665e5b254648b51fb19699f56"
          )
          .then((response) => {
            const genres = response.data.genres;
            const genresToPush = [];
            if (tvShow.genre_ids.length > 0) {
              tvShow.genre_ids.forEach((genre_id) => {
                genres.forEach((genre) => {
                  if (genre_id === genre.id) {
                    genresToPush.push(genre);
                  }
                });
              });
            }
            this.$set(state.tvShows[i], "genres", genresToPush);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    callAPI(query) {
      if (query.length > 0) {
        state.loadingMovies = true;
        state.loadingTvShows = true;
        state.statusMovies = null;
        state.statusTvShows = null;
        state.searching = true;
        state.query = query;
        this.getMovies(query);
        this.getTvShow(query);
      }
    },
    getMovies(query) {
      axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=d755a2b665e5b254648b51fb19699f56&query=${query}`)
        .then((response) => {
          console.log(response);
          state.movies = response.data.results;
          for (let i = 0; i < state.movies.length; i++) {
            const movie = state.movies[i];
            this.$set(movie, 'index', i)
          }
          this.getLanguageFlagMovie();
          this.getLinkImgMovies();
          this.getCastMovie();
          this.getGenreMovie();
          state.loadingMovies = false;
          state.statusMovies = response.status;
        })
        .catch((error) => {
          console.log(error);
          state.errorMovies = error;
        });
    },
    getTvShow(query) {
      axios
        .get(`https://api.themoviedb.org/3/search/tv?api_key=d755a2b665e5b254648b51fb19699f56&query=${query}`)
        .then((response) => {
          console.log(response);
          this.tvShows = response.data.results;
          state.tvShows = this.tvShows;
          this.getLanguageFlagTvShow();
          this.getLinkImgTvShows();
          this.getCastTvShow();
          this.getGenreTvShow();
          state.loadingTvShows = false;
          state.statusTvShows = response.status;
          state.searching = false;
        })
        .catch((error) => {
          console.log(error);
          state.errorTvShows = error;
        });
    },
    startSearch() {
      // debouncing
      this.timeout;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.callAPI(this.query)
      }, 1000);
    },
  },
  mounted() {
    this.getSearchbarDomElementState();
  },
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  width: 30px;
  height: 40px;
  transition: width 250ms linear;
  outline: none;
  border: none;
  overflow: hidden;

  &.active {
    width: 330px;
    border: 1px solid $lightestColor;
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: transparent;
    color: $lightestColor;
    cursor: pointer;
    /*     padding: 0.5rem;
    border: none; */
  }

  .input {
    position: relative;
    display: flex;
    align-items: center;
    width: 0px;
    height: 40px;
    background-color: transparent;
    color: $lightestColor;
    transition: width 250ms linear;

    &.active {
      width: 300px;
    }

    input {
      padding: 0.5rem;
      width: 100%;
      height: 100%;
      border: none;

      &:focus-visible {
        outline: none;
      }
    }
  }
}

/* .search:focus-within button,
.search:focus-within input {
  border: 1px solid $lightestColor;
  background-color: #3a4242;
}
.search:focus-within input {
  width: 300px;
  border-left: none;
} */
.search:focus-within button {
  border: none;
}
</style>