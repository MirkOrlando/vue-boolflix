import Vue from 'vue'

const state = Vue.observable({
    query: '',
    movies: null,
    tvShows: null,
    loadingMovies: null,
    errorMovies: null,
    loadingTvShows: null,
    errorTvShows: null,
})

export default state