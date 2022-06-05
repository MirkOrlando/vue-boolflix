<template>
  <div class="col-5">
    <div class="card" @mouseenter="getRefsState">
      <div class="poster" @mouseenter="$emit('onposter')">
        <img :src="movie.fullLinkPoster" :alt="movie.original_title" />
        <div class="details" ref="detailsWrapper">
          <div class="scroll_details" ref="detailsText">
            <div class="title"><strong>Title:</strong> {{ movie.title }}</div>
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
                :key="star + 'empty'"
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
</template>

<script>
import state from "@/state.js";
export default {
  name: "MovieCardComponent",
  props: {
    movie: Object,
  },
  methods: {
    getRefsState() {
      state.detailsWrapper = this.$refs.detailsWrapper;
      state.detailsText = this.$refs.detailsText;
    },
  },
  computed: {
    getRating() {
      return (number) => {
        return Math.ceil(number / 2);
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>