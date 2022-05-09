<template>
  <header>
    <nav>
      <div class="logo">
        <img src="@/assets/img/logo.png" alt="" />
        <form action="get" @submit.prevent="callAPI">
          <input type="text" v-model="query" />
          <button>Search</button>
        </form>
      </div>
    </nav>
  </header>
</template>

<script>
import axios from "axios";
import state from "@/state.js";

export default {
  name: "SiteHeaderComponent",
  data() {
    return {
      linkAPIMovies:
        "https://api.themoviedb.org/3/search/movie?api_key=d755a2b665e5b254648b51fb19699f56",
      linkAPITvShows:
        "https://api.themoviedb.org/3/search/tv?api_key=d755a2b665e5b254648b51fb19699f56",
      linkImgPoster: "https://image.tmdb.org/t/p/w185/",
      query: "",
      loadingMovies: true,
      loadingTvShows: true,
      errorMovies: null,
      errorTvShows: null,
      movies: null,
      tvShows: null,
    };
  },
  methods: {
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
        movie.fullLinkPoster = this.linkImgPoster + movie.poster_path;
      });
    },
    getLinkImgTvShows() {
      state.tvShows.forEach((tvShow) => {
        tvShow.fullLinkPoster = this.linkImgPoster + tvShow.poster_path;
      });
    },
    getRatingMovies() {
      state.movies.forEach((movie) => {
        switch (true) {
          case Math.ceil(movie.vote_average) === 1 ||
            Math.ceil(movie.vote_average) === 2:
            movie.rating = 1;
            movie.ratingEmptyStar = 4;
            break;
          case Math.ceil(movie.vote_average) === 3 ||
            Math.ceil(movie.vote_average) === 4:
            movie.rating = 2;
            movie.ratingEmptyStar = 3;
            break;
          case Math.ceil(movie.vote_average) === 5 ||
            Math.ceil(movie.vote_average) === 6:
            movie.rating = 3;
            movie.ratingEmptyStar = 2;
            break;
          case Math.ceil(movie.vote_average) === 7 ||
            Math.ceil(movie.vote_average) === 8:
            movie.rating = 4;
            movie.ratingEmptyStar = 1;
            break;
          case Math.ceil(movie.vote_average) === 9 ||
            Math.ceil(movie.vote_average) === 10:
            movie.rating = 5;
            movie.ratingEmptyStar = 0;
            break;
          default:
            break;
        }
      });
    },
    getRatingTvShows() {
      state.tvShows.forEach((tvShow) => {
        switch (true) {
          case Math.ceil(tvShow.vote_average) === 1 ||
            Math.ceil(tvShow.vote_average) === 2:
            tvShow.rating = 1;
            tvShow.ratingEmptyStar = 4;
            break;
          case Math.ceil(tvShow.vote_average) === 3 ||
            Math.ceil(tvShow.vote_average) === 4:
            tvShow.rating = 2;
            tvShow.ratingEmptyStar = 3;
            break;
          case Math.ceil(tvShow.vote_average) === 5 ||
            Math.ceil(tvShow.vote_average) === 6:
            tvShow.rating = 3;
            tvShow.ratingEmptyStar = 2;
            break;
          case Math.ceil(tvShow.vote_average) === 7 ||
            Math.ceil(tvShow.vote_average) === 8:
            tvShow.rating = 4;
            tvShow.ratingEmptyStar = 1;
            break;
          case Math.ceil(tvShow.vote_average) === 9 ||
            Math.ceil(tvShow.vote_average) === 10:
            tvShow.rating = 5;
            tvShow.ratingEmptyStar = 0;
            break;
          default:
            break;
        }
      });
    },
    callAPI() {
      axios
        .get(this.getFullLinkAPIMovies())
        .then((response) => {
          //console.log(response);
          //console.log(response.data.results);
          this.movies = response.data.results;
          this.loadingMovies = false;
          state.loadingMovies = this.loadingMovies;
          state.movies = this.movies;

          //console.log(state.movies);
          //console.log(state.loading);
          this.getLanguageFlagMovie();
          this.getLinkImgMovies();
          this.getRatingMovies();
        })
        .catch((error) => {
          //console.log(error);
          this.errorMovies = `OPS ${error}`;
          state.errorMovies = this.errorMovies;
        });
      axios
        .get(this.getFullLinkAPITvShows())
        .then((response) => {
          //console.log(response);
          //console.log(response.data.results);
          this.tvShows = response.data.results;
          this.loadingTvShows = false;
          state.loadingTvShows = this.loadingTvShows;
          state.tvShows = this.tvShows;
          this.getLanguageFlagTvShow();
          this.getLinkImgTvShows();
          this.getRatingTvShows();
        })
        .catch((error) => {
          //console.log(error);
          this.errorTvShows = `OPS ${error}`;
          state.errorTvShows = this.errorTvShows;
        });
      this.query = "";
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  text-align: center;
  padding: 1rem 0;
  background-color: $darkestColor;
  border-bottom: 10px solid $liteDarkColor;
}
</style>