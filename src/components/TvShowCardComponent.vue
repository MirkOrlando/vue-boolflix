<template>
  <div :class="`col-5 ${direction}`">
    <div class="card-tvShow dropdown">
      <img v-if="tvShow.backdrop_path" :src="link + tvShow.backdrop_path" :alt="tvShow.original_name + ' poster'">
      <img v-else src="https://icons.iconarchive.com/icons/martz90/circle/512/video-camera-icon.png" alt="">
      <div class="dropdown-content">
        <div class="details">
          <h4>{{ tvShow.original_name }}</h4>
          <p>
            {{ tvShow.overview }}
          </p>
        </div>
        <div class="metadata">
          <div class="genre">
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
            <font-awesome-icon icon="fa-solid fa-star" v-for="star in getRating(tvShow.vote_average)"
              :key="star + 'f'" />

            <font-awesome-icon icon="fa-regular fa-star" v-for="star in 5 - getRating(tvShow.vote_average)"
              :key="star + 'e'" />
          </div>
          <div class="cast">
            <strong>Cast: </strong>
            <span v-for="actor in tvShow.cast" :key="actor.cast_id">
              {{ actor.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--   <div class="col-5">
    <div class="card" @mouseenter="getRefsState">
      <div class="poster" @mouseenter="$emit('onposter')">
        <img :src="tvShow.fullLinkPoster" :alt="tvShow.original_name" />
        <div class="details" ref="detailsWrapper">
          <div class="scroll_details" ref="detailsText">
            <div class="title"><strong>Title:</strong> {{ tvShow.name }}</div>
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
  </div> -->

</template>

<script>
import state from "@/state.js";

export default {
  name: "tvShowCardComponent",
  props: {
    tvShow: Object,
    link: String,
    direction: String,
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
