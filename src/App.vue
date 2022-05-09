<template>
  <div id="app">
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
    <main>Site Main Here</main>
    <footer>Site Footer Here</footer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  components: {},
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
    callAPI() {
      axios
        .get(this.getFullLinkAPI())
        .then((response) => {
          //console.log(response);
          this.movies = response.data.results;
          this.loading = false;
        })
        .catch((error) => {
          //console.log(error);
          this.error = `OPS ${error}`;
        });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";
/* #region header */
header {
  text-align: center;
  padding: 1rem 0;
  background-color: $darkestColor;
  border-bottom: 4px solid $liteDarkColor;
}
/* #endregion header */
</style>
