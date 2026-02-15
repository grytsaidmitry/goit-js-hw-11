const axios = require('axios');
import LoadMoreBtn from './load-more-btn'
import Notiflix from 'notiflix';
const API_KEY = '28315893-0fd806bb9dd4884845b8c425c';
const BASE_URL = 'https://pixabay.com/api/'

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true, 
});

export default class NewsApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.limit = 40;
    }

    async fetchPixabay() {
        console.log('До запроса ', this)
        
        const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type="photo"&orientation="horizontal"&safesearch="true"&per_page=${this.limit}&page=${this.page}`;

        try {
            const axiosFetch = await axios.get(url);
            console.log(axiosFetch);
            console.log('После запроса, если ок ', this);
            const { data } = axiosFetch;

            this.incrementPage();

            if (!data.hits.length) {
                loadMoreBtn.hide();
                return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            }
            const totalPages = data.totalHits / this.limit;
            console.log(totalPages);

            if (this.page > totalPages) {
                loadMoreBtn.hide();
                return Notiflix.Notify.success("We're sorry, but you've reached the end of search results.");
            }

            return data.hits;
        } catch (error) {
            console.log(error);
        }

            // .then(({ data }) => {
            //     this.incrementPage();
            //     if (!data.hits.length) {
            //         loadMoreBtn.hide();
            //         return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                    
            //     }
            //     console.log('После запроса, если ок ', this);
            //     const totalPages = data.totalHits / this.limit;
            //     console.log(totalPages);

            //     if (this.page > totalPages) {
            //         loadMoreBtn.hide();
            //         return Notiflix.Notify.success("We're sorry, but you've reached the end of search results.");
            //     }

            //     return data.hits
            // }).catch(error => {
            //     console.log(error);
            // })
    }
    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery
    }

}


