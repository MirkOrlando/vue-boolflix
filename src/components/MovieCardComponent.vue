<template>
  <div :class="`col-5 ${direction}`">
    <div class="card-movie dropdown">
      <img :src="link + movie.backdrop_path" :alt="movie.title + ' poster'">
      <div class="dropdown-content">
        <div class="details">
          <h4>{{ movie.title }}</h4>
          <p>
            {{ movie.overview }}
          </p>
        </div>
        <div class="metadata">
          <div class="genre">
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
            <font-awesome-icon icon="fa-solid fa-star" v-for="star in getRating(movie.vote_average)"
              :key="star + 'f'" />

            <font-awesome-icon icon="fa-regular fa-star" v-for="star in 5 - getRating(movie.vote_average)"
              :key="star + 'e'" />
          </div>
          <div class="cast">
            <strong>Cast: </strong>
            <span v-for="actor in movie.cast" :key="actor.cast_id">
              {{ actor.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieCardComponent",
  data() {
    return {
      right: null,
      left: null,
    }
  },
  props: {
    movie: Object,
    link: String,
    direction: String,
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