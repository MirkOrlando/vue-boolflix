<template>
  <div id="app">
    <SiteHeader />
    <main>
      <ul style="padding: 1rem" v-for="movie in movies" :key="movie.id">
        <li><strong>Titolo:</strong> {{ movie.title }}</li>
        <li><strong>Titolo originale:</strong> {{ movie.original_title }}</li>
        <li><strong>Lingua:</strong> {{ movie.original_language }}</li>
        <li><strong>Voto:</strong> {{ movie.vote_average }}</li>
      </ul>
    </main>
    <footer>Site Footer Here</footer>
  </div>
</template>

<script>
import axios from "axios";
import SiteHeader from "@/components/SiteHeaderComponent.vue";

export default {
  name: "App",
  components: {
    SiteHeader,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";
/* #region main */
main {
  min-height: 100vh;
  padding: 1rem 0;
  background-color: $darkestColor;
  border-bottom: 10px solid $liteDarkColor;
  color: $lightestColor;
}
/* #endregion main */
/* #region footer */
footer {
  text-align: center;
  padding: 1rem 0;
  background-color: $darkestColor;
  color: $lightestColor;
}
/* #endregion footer */
</style>
