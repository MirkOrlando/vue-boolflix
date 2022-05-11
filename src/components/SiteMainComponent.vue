<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-5" v-for="movie in showMovies" :key="movie.id">
          <div class="card">
            <div class="poster" @mouseenter="hasToScroll">
              <img :src="movie.fullLinkPoster" :alt="movie.original_title" />
              <div class="details" ref="details_wrapper">
                <div class="scroll_details" ref="details_text">
                  <div class="title">
                    <strong>Title:</strong> {{ movie.title }}
                  </div>
                  <div class="original_title">
                    <strong>Original Title:</strong> {{ movie.original_title }}
                  </div>
                  <div class="genre" v-if="movie.genres">
                    <strong>Genre: </strong>
                    <span v-for="genre in movie.genres" :key="genre.id">
                      {{ genre.name }}
                    </span>
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
                      v-for="star in getRating(movie.vote_average)"
                      :key="star + 'full'"
                    />

                    <font-awesome-icon
                      icon="fa-regular fa-star"
                      v-for="star in 5 - getRating(movie.vote_average)"
                      :key="star + 'full'"
                    />
                  </div>
                  <div class="cast" v-if="movie.cast">
                    <strong>Cast: </strong>
                    <span v-for="actor in movie.cast" :key="actor.cast_id">
                      {{ actor.name }}
                    </span>
                  </div>
                  <div class="overview">
                    <strong>Overview:</strong> {{ movie.overview }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-5" v-for="tvShow in showTvShows" :key="tvShow.id">
          <div class="card">
            <div class="poster" @mouseenter="hasToScroll">
              <img :src="tvShow.fullLinkPoster" :alt="tvShow.original_name" />
              <div class="details" ref="details_wrapper">
                <div class="scroll_details" ref="details_text">
                  <div class="title">
                    <strong>Title:</strong> {{ tvShow.name }}
                  </div>
                  <div class="original_title">
                    <strong>Original Title:</strong> {{ tvShow.original_name }}
                  </div>
                  <div class="genre" v-if="tvShow.genres">
                    <strong>Genre: </strong>
                    <span v-for="genre in tvShow.genres" :key="genre.id">
                      {{ genre.name }}
                    </span>
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
                      v-for="star in getRating(tvShow.vote_average)"
                      :key="star + 'full'"
                    />
                    <font-awesome-icon
                      icon="fa-regular fa-star"
                      v-for="star in 5 - getRating(tvShow.vote_average)"
                      :key="star + 'empty'"
                    />
                  </div>
                  <div class="cast" v-if="tvShow.cast">
                    <strong>Cast: </strong>
                    <span v-for="actor in tvShow.cast" :key="actor.id">
                      {{ actor.name }}
                    </span>
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
      const textToScrollAll = this.$refs.details_text;
      const wrapperAll = this.$refs.details_wrapper;
      for (let i = 0; i < textToScrollAll.length; i++) {
        const textToScroll = textToScrollAll[i];
        const wrapper = wrapperAll[i];
        //console.log(textToScroll, wrapper);
        //console.log(textToScroll.clientHeight, wrapper.clientHeight);
        if (textToScroll.clientHeight + 10 > wrapper.clientHeight) {
          textToScroll.classList.add("scroll");
          //console.log(textToScroll, "add");
        }
      }
    },
  },
  computed: {
    isLoading() {
      return state.loading;
    },
    /*     showCast() {
      return (object) => {
        if (object.cast) {
          return object.cast;
        }
      };
    }, */
    showMovies() {
      if (!state.loading) {
        return state.movies;
      } else {
        return this.movies;
      }
    },
    showTvShows() {
      if (!state.loading) {
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
    overflow: hidden;
    .scroll_details {
      transition: all 10s linear;
      .title,
      .original_title,
      .language,
      .vote,
      .overview {
        padding: 0.25rem 0;
        border-bottom: 4px solid $liteDarkColor;
      }
    }
  }
  &:hover .scroll {
    animation: autoScroll 10s 2s linear forwards;
  }
  &:hover .details {
    opacity: 0.9;
  }
}

/* animations */
@keyframes autoScroll {
  0% {
  }
  100% {
    transform: translateY(-70%);
  }
}
</style>