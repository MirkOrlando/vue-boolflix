import Vue from 'vue'

const state = Vue.observable({
    movies: null,
    loading: null,
    error: null,
})

export default state