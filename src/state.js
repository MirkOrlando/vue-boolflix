import Vue from 'vue'

const state = Vue.observable({
    query: '',
    movies: null,
    loading: null,
    error: null,
})

export default state