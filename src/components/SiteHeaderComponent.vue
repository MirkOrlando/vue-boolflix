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
      link: "https://api.themoviedb.org/3/search/movie?api_key=d755a2b665e5b254648b51fb19699f56",
      query: "",
      loading: null,
      error: null,
      movies: null,
    };
  },
  methods: {
    getFullLinkAPI() {
      // &language=en-US&page=1&include_adult=false&query=i am
      let fullLink;
      fullLink = this.link + "&query=" + this.query;
      //console.log(fullLink);
      this.query = "";
      return fullLink;
    },
    getLanguageFlag() {
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
    callAPI() {
      axios
        .get(this.getFullLinkAPI())
        .then((response) => {
          //console.log(response);
          this.movies = response.data.results;
          this.loading = false;
          state.movies = this.movies;
          state.loading = this.loading;
          //console.log(state.movies);
          //console.log(state.loading);
          this.getLanguageFlag();
        })
        .catch((error) => {
          //console.log(error);
          this.error = `OPS ${error}`;
          state.error = this.error;
        });
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