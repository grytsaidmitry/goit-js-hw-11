import './sass/common.scss';

// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

import Notiflix from 'notiflix';
import NewsApiService from './js/news-service';
import LoadMoreBtn from './js/load-more-btn';
import { renderUserList } from './js/render-galery';


const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
};


const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true, 
});


refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchPixabay);

console.log(newsApiService);
console.log(loadMoreBtn);

function onSearch(e) {
    e.preventDefault();

    
    newsApiService.query = e.currentTarget.elements.searchQuery.value;

    if (newsApiService.query === '') {
        return Notiflix.Notify.warning('Memento te hominem esse');
    }


    loadMoreBtn.show();
    newsApiService.resetPage();
    
    clearGalleryContainer();
    fetchPixabay();

}

function appendArticlesMarkup(gallery) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', renderUserList(gallery));
    
    var lightbox = new SimpleLightbox('.gallery a ', { captionDelay: 250, });
}

async function fetchPixabay() {
    try {
        loadMoreBtn.disable();
        const hits = await newsApiService.fetchPixabay('hits');
        console.log(hits);
        if (hits) {
            appendArticlesMarkup(hits);
        }
        loadMoreBtn.enable();
    } catch (error) {
        console.log(error);
    }


    // newsApiService.fetchPixabay().then(hits => {
    //     if (hits) {
    //         appendArticlesMarkup(hits);
    //     }
    // loadMoreBtn.enable();
    // })
}

function clearGalleryContainer() {
    refs.galleryContainer.innerHTML = '';
}

