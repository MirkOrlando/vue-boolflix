<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-5" v-for="movie in showMovies" :key="movie.id">
          <div class="card">
            <div class="poster">
              <img :src="movie.fullLinkPoster" :alt="movie.original_title" />
              <div class="details">
                <div class="title">
                  <strong>Titolo:</strong> {{ movie.title }}
                </div>
                <div class="original_title">
                  <strong>Titolo originale:</strong> {{ movie.original_title }}
                </div>
                <div class="language">
                  <strong>Lingua: </strong>
                  <span v-if="movie.thereIsFlag">
                    <flag :iso="movie.flag_svg" />
                  </span>
                  <span v-else>{{ movie.original_language }}</span>
                </div>
                <div class="vote">
                  <strong>Voto: </strong>
                  <font-awesome-icon
                    icon="fa-solid fa-star"
                    v-for="star in getRating(movie.vote_average)"
                    :key="star"
                  />

                  <font-awesome-icon
                    icon="fa-regular fa-star"
                    v-for="star in 5 - getRating(movie.vote_average)"
                    :key="star"
                  />
                </div>
                <div class="overview">
                  <strong>Overview:</strong> {{ movie.overview }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-5" v-for="tvShow in showTvShows" :key="tvShow.id">
          <div class="card">
            <div class="poster">
              <img :src="tvShow.fullLinkPoster" :alt="tvShow.original_name" />
              <div class="details">
                <div class="title">
                  <strong>Titolo:</strong> {{ tvShow.name }}
                </div>
                <div class="original_title">
                  <strong>Titolo originale:</strong> {{ tvShow.original_name }}
                </div>
                <div class="language">
                  <strong>Lingua: </strong>
                  <span v-if="tvShow.thereIsFlag">
                    <flag :iso="tvShow.flag_svg" />
                  </span>
                  <span v-else>{{ tvShow.original_language }}</span>
                </div>
                <div class="vote">
                  <strong>Voto: </strong>
                  <font-awesome-icon
                    icon="fa-solid fa-star"
                    v-for="star in getRating(tvShow.vote_average)"
                    :key="star"
                  />
                  <font-awesome-icon
                    icon="fa-regular fa-star"
                    v-for="star in 5 - getRating(tvShow.vote_average)"
                    :key="star"
                  />
                </div>
                <div class="overview">
                  <strong>Overview:</strong> {{ tvShow.overview }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import state from "@/state.js";

export default {
  name: "SiteMainComponent",
  data() {
    return {
      loading: null,
      error: null,
      movies: null,
    };
  },
  computed: {
    showMovies() {
      if (!state.loadingMovies) {
        return state.movies;
      } else {
        return this.movies;
      }
    },
    showTvShows() {
      if (!state.loadingTvShows) {
        return state.tvShows;
      } else {
        return this.tvShows;
      }
    },
    getRating() {
      return (number) => {
        return Math.ceil(number / 2);
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.poster {
  position: relative;
  img {
    max-width: 100%;
    max-height: 513px;
    object-fit: contain;
  }
  .details {
    position: absolute;
    top: 0;
    padding: 1rem;
    background-color: $darkestColor;
    height: 100%;
    max-height: 100%;
    opacity: 0;
    transition: all 500ms linear;
    cursor: context-menu;
  }
  &:hover .details {
    opacity: 1;
  }
}

/* grid-structure */
.container {
  max-width: 1400px;
  margin: 2rem auto;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.col-5 {
  width: calc(100% / 5);
  padding: 1rem 0.5rem;
}
</style>