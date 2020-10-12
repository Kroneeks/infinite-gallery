import React from 'react';
import InfiniteGallery from "react-infinite-scroll-component";

const ImageGallery = ({images, page, setPage }) => {
    return (
      <InfiniteGallery
        dataLength={images.length}
        next={() => setPage((page) => page + 1)}
        hasMore={true}
        loader={<h4>Загрузка...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <ul className="images-list">
          {images.map((image, key) => (
            <li key={key} className="image-item">
              <a
                href={image.links.html}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={image.urls.regular} alt={image.alt_description} />
              </a>
            </li>
          ))}
        </ul>
      </InfiniteGallery>
    )
}

export default ImageGallery;