<template>
  <header>
    <div class="container">
      <nav>
        <div class="nav-menu-left">
          <div class="logo">
            <img src="@/assets/img/logo.png" alt="" @click="reset" />
          </div>
          <ul class="nav-items">
            <li
              class="nav-item"
              :class="activeNavItem === index ? 'active' : ''"
              v-for="(item, index) in navItems"
              :key="index"
            >
              <a href="#" @click="getActiveNavItem(index)">{{ item }}</a>
            </li>
          </ul>
        </div>
        <div class="nav-menu-right">
          <Searchbar />
          <i>
            <font-awesome-icon icon="fa-solid fa-bell" />
          </i>
          <i>
            <font-awesome-icon icon="fa-solid fa-user" />
          </i>
        </div>
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
  data() {
    return {
      navItems: ["Home", "Serie Tv", "Movies", "Nuove Uscite", "La Mia Lista"],
      activeNavItem: 0,
    };
  },
  methods: {
    reset() {
      state.movies = null;
      state.tvShows = null;
      state.statusMovies = null;
      state.statusTvShows = null;
      state.searching = false;
      state.loadingMovies = true;
      state.loadingTvShows = true;
    },
    getActiveNavItem(i) {
      this.activeNavItem = i;
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: $darkestColor;
  padding: 1rem 0;
  nav {
    display: flex;
    color: $lightestColor;
    .nav-menu-left {
      display: flex;
      flex: 1;
      align-items: center;
      gap: 1.5rem;
      .logo {
        width: 120px;
        img {
          cursor: pointer;
        }
      }
      .nav-items {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-weight: bold;
        color: rgb(204, 204, 204);
        transition: color 250ms linear;
        .nav-item.active {
          color: $lightestColor;
        }
      }
    }
    .nav-menu-right {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: end;
      gap: 1.5rem;
    }
  }
}
</style>