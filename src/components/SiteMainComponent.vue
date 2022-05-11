<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-5" v-for="movie in showMovies" :key="movie.id">
          <div class="card">
            <div class="poster" @mouseenter="hasToScroll">
              <img :src="movie.fullLinkPoster" :alt="movie.original_title" />
              <div class="details">
                <div class="title">
                  <strong>Title:</strong> {{ movie.title }}
                </div>
                <div class="original_title">
                  <strong>Original Title:</strong> {{ movie.original_title }}
                </div>
                <div class="language">
                  <strong>Original Language: </strong>
                  <span v-if="movie.thereIsFlag">
                    <flag :iso="movie.flag_svg" />
                  </span>
                  <span v-else>{{ movie.original_language }}</span>
                </div>
                <div class="vote">
                  <strong>Rating: </strong>
                  <font-awesome-icon
                    icon="fa-solid fa-star"
                    v-for="(star, index) in getRating(movie.vote_average)"
                    :key="index"
                  />

                  <font-awesome-icon
                    icon="fa-regular fa-star"
                    v-for="(star, index) in 5 - getRating(movie.vote_average)"
                    :key="index"
                  />
                </div>
                <div class="cast">
                  <strong>Cast: </strong>
                  <span v-for="actor in movie.cast" :key="actor.cast_id">
                    {{ actor.name }}
                  </span>
                </div>
                <div class="overview" ref="overview_wrapper">
                  <div class="scroll_overview" ref="overview_text">
                    <strong>Overview:</strong> {{ movie.overview }}
                  </div>
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
                  <strong>Title:</strong> {{ tvShow.name }}
                </div>
                <div class="original_title">
                  <strong>Original Title:</strong> {{ tvShow.original_name }}
                </div>
                <div class="language">
                  <strong>Original Language: </strong>
                  <span v-if="tvShow.thereIsFlag">
                    <flag :iso="tvShow.flag_svg" />
                  </span>
                  <span v-else>{{ tvShow.original_language }}</span>
                </div>
                <div class="vote">
                  <strong>Rating: </strong>
                  <font-awesome-icon
                    icon="fa-solid fa-star"
                    v-for="(star, index) in getRating(tvShow.vote_average)"
                    :key="index"
                  />
                  <font-awesome-icon
                    icon="fa-regular fa-star"
                    v-for="(star, index) in 5 - getRating(tvShow.vote_average)"
                    :key="index"
                  />
                </div>
                <div class="cast">
                  <strong>Cast: </strong>
                  <span v-for="actor in tvShow.cast" :key="actor.id">
                    {{ actor.name }}
                  </span>
                </div>
                <div class="overview" ref="overview_wrapper">
                  <div class="scroll_overview" ref="overview_text">
                    <strong>Overview:</strong> {{ tvShow.overview }}
                  </div>
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
  methods: {
    hasToScroll() {
      //console.log(this.$refs.overview_text, this.$refs.overview_wrapper);
      const textToScrollAll = this.$refs.overview_text;
      const wrapperAll = this.$refs.overview_wrapper;
      for (let i = 0; i < textToScrollAll.length; i++) {
        const textToScroll = textToScrollAll[i];
        const wrapper = wrapperAll[i];
        //console.log(textToScroll, wrapper);
        //console.log(textToScroll.clientHeight, wrapper.clientHeight);
        if (textToScroll.clientHeight > wrapper.clientHeight) {
          textToScroll.classList.add("scroll");
          console.log(textToScroll, "add");
        }
      }
    },
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
.card {
  height: 100%;
}
.poster {
  position: relative;
  height: 100%;
  img {
    max-width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .details {
    position: absolute;
    top: 0;
    padding: 1rem;
    background-color: $darkestColor;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: all 500ms linear;
    cursor: context-menu;
    .title,
    .original_title,
    .language,
    .vote,
    .overview {
      padding: 0.25rem 0;
    }
    .overview {
      max-height: 40%;
      overflow: hidden;
      transition: all 10s linear;
      .scroll_overview {
        height: 100%;
      }
    }
    &:hover .scroll {
      animation: autoScroll 20s 2s linear;
    }
  }
  &:hover .details {
    opacity: 0.9;
  }
}

/* animations */
@keyframes autoScroll {
  0% {
  }
  70% {
    transform: translateY(-50%);
  }
  90% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(0);
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