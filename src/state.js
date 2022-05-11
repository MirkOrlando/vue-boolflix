import Vue from 'vue'

const state = Vue.observable({
    query: '',
    movies: null,
    tvShows: null,
    errorMovies: null,
    errorTvShows: null,
    loading: null
})

export default state