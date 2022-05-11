import Vue from 'vue'

const state = Vue.observable({
    query: '',
    movies: null,
    tvShows: null,
    errorMovies: null,
    errorTvShows: null,
    loading: true,
    detailsWrapper: null,
    detailsText: null,
})

export default state