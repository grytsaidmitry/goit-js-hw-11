export function renderUserList(gallery) {
  return gallery.map(({webformatURL:preview, largeImageURL:original, tags, likes, views, comments, downloads}) => {
      return `<div class="photo-card">
                <a href="${original}" >
                    <img src="${preview}" alt="${tags}" loading="lazy"/>
                </a>
            
                <div class="info">
                    <p class="info-item">
                    <b>Likes</b> ${likes}
                    </p>
                    <p class="info-item">
                    <b>Views</b> ${views}
                    </p>
                    <p class="info-item">
                    <b>Comments</b> ${comments}
                    </p>
                    <p class="info-item">
                    <b>Downloads</b> ${downloads}
                    </p>
                </div>
            </div>`;
    })
        .join("");
    
}



