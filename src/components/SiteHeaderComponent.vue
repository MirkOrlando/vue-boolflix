<template>
  <header>
    <div class="container">
      <nav>
        <div class="logo">
          <img src="@/assets/img/logo.png" alt="" @click="reset" />
        </div>
        <Searchbar />
      </nav>
    </div>
  </header>
</template>

<script>
import state from "@/state.js";
import Searchbar from "@/components/SearchbarComponent.vue";

export default {
  name: "SiteHeaderComponent",
  components: {
    Searchbar,
  },
  methods: {
    reset() {
      state.movies = null;
      state.tvShows = null;
      state.statusMovies = null;
      state.statusTvShows = null;
      state.searching = false;
      state.loading = true;
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
  img {
    cursor: pointer;
  }
}
</style>