<template>
  <div class="search" ref="search">
    <div class="icon" @click="getActiveSearch()">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
    </div>
    <div class="input" ref="input">
      <input
        type="text"
        class="input"
        placeholder="Search something..."
        ref="text"
        v-model="query"
        @keyup="callAPI"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import state from "@/state.js";

export default {
  data() {
    return {
      linkAPIMovies:
        "https://api.themoviedb.org/3/search/movie?api_key=d755a2b665e5b254648b51fb19699f56",
      linkAPITvShows:
        "https://api.themoviedb.org/3/search/tv?api_key=d755a2b665e5b254648b51fb19699f56",
      linkImgPoster: "https://image.tmdb.org/t/p/w342/",
      query: "",
      loadingMovies: true,
      loadingTvShows: true,
      statusMovies: null,
      statusTvShows: null,
      errorMovies: null,
      errorTvShows: null,
      movies: null,
      tvShows: null,
    };
  },
  methods: {
    getActiveSearch() {
      this.$refs.search.classList.toggle("active");
      this.$refs.input.classList.toggle("active");
      this.$refs.text.focus();
    },
    getFullLinkAPIMovies() {
      // &language=en-US&page=1&include_adult=false&query=i am
      let fullLink;
      fullLink = this.linkAPIMovies + "&query=" + this.query;
      //console.log(fullLink);
      return fullLink;
    },
    getFullLinkAPITvShows() {
      // &language=en-US&page=1&include_adult=false&query=e alla fine arriva mamma
      let fullLink;
      fullLink = this.linkAPITvShows + "&query=" + this.query;
      //console.log(fullLink);
      return fullLink;
    },
    getLanguageFlagMovie() {
      state.movies.forEach((movie) => {
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
    getLanguageFlagTvShow() {
      state.tvShows.forEach((tvShow) => {
        switch (true) {
          case tvShow.original_language.toLowerCase() === "it":
            tvShow.thereIsFlag = true;
            tvShow.flag_svg = "it";
            break;
          case tvShow.original_language.toLowerCase() === "fr":
            tvShow.thereIsFlag = true;
            tvShow.flag_svg = "fr";
            break;
          case tvShow.original_language.toLowerCase() === "de":
            tvShow.thereIsFlag = true;
            tvShow.flag_svg = "de";
            break;
          case tvShow.original_language.toLowerCase() === "en":
            tvShow.thereIsFlag = true;
            tvShow.flag_svg = "gb";
            break;
          case tvShow.original_language.toLowerCase() === "es":
            tvShow.thereIsFlag = true;
            tvShow.flag_svg = "es";
            break;
          case tvShow.original_language.toLowerCase() === "ru":
            tvShow.thereIsFlag = true;
            tvShow.flag_svg = "ru";
            break;
          case tvShow.original_language.toLowerCase() === "cn":
            tvShow.thereIsFlag = true;
            tvShow.flag_svg = "cn";
            break;

          default:
            break;
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
            //console.log(response);
            const cast = [];
            for (let i = 0; i < 5; i++) {
              if (response.data.cast.length !== 0 && response.data.cast[i]) {
                cast.push(response.data.cast[i]);
              }
            }
            //console.log(response);
            //console.log(cast);
            this.$set(this.movies[i], "cast", cast);
            //console.log(movie);

            //console.log(movie.cast);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.loadingCastMovies = false;
      //console.log(state.movies);
    },
    getCastTvShow() {
      for (let i = 0; i < state.tvShows.length; i++) {
        const tvShow = state.tvShows[i];
        axios
          .get(
            `https://api.themoviedb.org/3/tv/${tvShow.id}/credits?api_key=d755a2b665e5b254648b51fb19699f56`
          )
          .then((response) => {
            //console.log(response);
            const cast = [];
            for (let i = 0; i < 5; i++) {
              if (response.data.cast.length !== 0 && response.data.cast[i]) {
                cast.push(response.data.cast[i]);
              }
            }
            //console.log(response);
            //console.log(cast);
            this.$set(this.tvShows[i], "cast", cast);
            //console.log(tvShow.cast);
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
            this.$set(this.movies[i], "genres", genresToPush);
            //console.log(movie);
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
            //console.log(response);
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
            this.$set(this.tvShows[i], "genres", genresToPush);
            //console.log(movie);
          })
          .catch((error) => {
            console.log(error);
          });
        this.loadingGenreTvShows = false;
      }
    },
    callAPI() {
      if (this.query != "") {
        state.loadingMovies = true;
        state.loadingTvShows = true;
        state.statusMovies = null;
        state.statusTvShows = null;
        state.searching = true;
        axios
          .get(this.getFullLinkAPIMovies())
          .then((response) => {
            console.log(response);
            //console.log(response.data.results);
            this.movies = response.data.results;
            //console.log(this.movies);
            state.movies = this.movies;
            //console.log(state.movies);
            //console.log(state.loading);
            this.getLanguageFlagMovie();
            this.getLinkImgMovies();
            this.getCastMovie();
            this.getGenreMovie();
            this.loadingMovies = false;
            state.loadingMovies = this.loadingMovies;
            this.statusMovies = response.status;
            state.statusMovies = this.statusMovies;
          })
          .catch((error) => {
            //console.log(error);
            this.errorMovies = `OPS ${error}`;
            state.errorMovies = this.errorMovies;
          });
        axios
          .get(this.getFullLinkAPITvShows())
          .then((response) => {
            console.log(response);
            //console.log(response.data.results);
            this.tvShows = response.data.results;
            state.tvShows = this.tvShows;
            this.getLanguageFlagTvShow();
            this.getLinkImgTvShows();
            this.getCastTvShow();
            this.getGenreTvShow();
            this.loadingTvShows = false;
            state.loadingTvShows = this.loadingTvShows;
            this.statusTvShows = response.status;
            state.statusTvShows = this.statusTvShows;
            state.searching = false;
          })
          .catch((error) => {
            //console.log(error);
            this.errorTvShows = `OPS ${error}`;
            state.errorTvShows = this.errorTvShows;
          });
        //this.query = "";
      }
    },
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
    width: 0px;
    height: 40px;
    background-color: transparent;
    color: $lightestColor;
    transition: width 250ms linear;
    &.active {
      width: 300px;
    }
    input {
      position: absolute;
      padding: 0.5rem;
      top: 0;
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