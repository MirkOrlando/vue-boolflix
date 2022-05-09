import axios from "axios";
import state from "@/state.js";

export default {
    name: "SiteHeaderComponent",
    data() {
        return {
            link: "https://api.themoviedb.org/3/search/movie?api_key=d755a2b665e5b254648b51fb19699f56",
            query: "",
            loading: null,
            error: null,
            movies: null,
        };
    },
    methods: {
        getFullLinkAPI() {
            // &language=en-US&page=1&include_adult=false&query=i am
            let fullLink;
            fullLink = this.link + "&query=" + this.query;
            //console.log(fullLink);
            this.query = "";
            return fullLink;
        },
        callAPI() {
            axios
                .get(this.getFullLinkAPI())
                .then((response) => {
                    //console.log(response);
                    this.movies = response.data.results;
                    this.loading = false;
                    state.movies = this.movies;
                    state.loading = this.loading;
                })
                .catch((error) => {
                    //console.log(error);
                    this.error = `OPS ${error}`;
                    state.error = this.error;
                });
        },
    },
};