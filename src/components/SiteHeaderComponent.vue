<template>
  <header>
    <span class="filter" :class="backgroundDark ? 'scrollY1' : ''">
    </span>
    <div class="container">
      <nav>
        <div class="nav-menu-left">
          <div class="logo">
            <img src="@/assets/img/logo.png" alt="" @click="reset" />
          </div>
          <ul class="nav-items">
            <li class="nav-item" :class="activeNavItem === index ? 'active' : ''" v-for="(item, index) in navItems"
              :key="index">
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
      navItems: ["Home", "TV Shows", "Movies", "New & Popular", "My List"],
      activeNavItem: 0,
      backgroundDark: null,
    };
  },
  methods: {
    catchScroll() {
      window.addEventListener("scroll", this.handleWindowScroll);
    },
    handleWindowScroll() {
      //console.log('scrolling');
      //console.log(window.scrollY);
      if (window.scrollY > 0) {
        this.backgroundDark = true
      } else {
        this.backgroundDark = false
      }
    },
    reset() {
      state.query = "";
      state.refs.search.classList.remove("active");
      state.refs.input.classList.remove("active");
      state.refs.text.value = "";
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
  created() {
    this.catchScroll();
  },
};
</script>

<style lang="scss" scoped>
header {
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent);
  padding: 1rem 0;
  position: fixed;
  width: 100%;
  z-index: 100;
  transition: background-image 250ms linear;

  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, black, $darkestColor);
    opacity: 0;
    transition: opacity 250ms linear;

    &.scrollY1 {
      opacity: 1;
    }

  }

  nav {
    position: relative;
    display: flex;
    color: $lightestColor;
    z-index: 110;


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
        color: rgb(180, 180, 180);

        .nav-item {
          transition: color 250ms linear;

          &:hover {
            color: $lightestColor;
          }

          &.active {
            color: $lightestColor;
          }
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