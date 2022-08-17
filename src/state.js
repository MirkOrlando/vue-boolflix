import Vue from 'vue'

const state = Vue.observable({
    query: '',
    refs: null,
    searching: false,
    statusMovies: null,
    statusTvShows: null,
    movies: null,
    tvShows: null,
    errorMovies: null,
    errorTvShows: null,
    loadingMovies: true,
    loadingTvShows: true,
    detailsWrapper: null,
    detailsText: null,
})

export default state