import state from "@/state.js";

export default {
    name: "SiteMainComponent",
    data() {
        return {
            loading: null,
            error: null,
            movies: null,
        };
    },
    computed: {
        showMovies() {
            if (state.query) {
                return (this.movies = state.movies);
            } else {
                return this.movies;
            }
        },
    },
};