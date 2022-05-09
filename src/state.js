import Vue from 'vue'

const state = Vue.observable({
    query: '',
    cards: null,
    loadingMovies: null,
    errorMovies: null,
    loadingTvShows: null,
    errorTvShows: null,
})

export default state