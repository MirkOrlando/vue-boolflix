<template>
  <header>
    <div class="container">
      <nav>
        <div class="logo">
          <img src="@/assets/img/logo.png" alt="" />
          <form action="get" @submit.prevent="callAPI">
            <input type="text" v-model="query" />
            <button>
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </button>
          </form>
        </div>
      </nav>
    </div>
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
      linkImgPoster: "https://image.tmdb.org/t/p/w342/",
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
      state.movies.forEach((movie) => {
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
            movie.cast = cast;
            console.log(movie.cast);
          })
          .catch((error) => {
            console.log(error);
          });
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
          this.getCastMovie();
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
  input,
  button {
    padding: 0.5rem;
    background-color: #4a5354;
    border: 1px solid #313738;
    color: #b3b2b2;
    margin: 0.25rem 0;
  }
  input {
    border-right: none;
    width: 300px;
  }
  button {
    border-left: none;
  }
  input:focus-visible {
    outline: none;
  }
}
</style>