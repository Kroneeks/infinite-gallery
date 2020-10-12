import React, { useState, useEffect } from "react";
import ImageGallery from './components/ImageGallery';
import "./App.css";

const accessKey = "H7nuzynlmGyhLJJOQf3YgorTr9RDAWE8CcPm-Aiyung";

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const getPhotos = async () => {
    let apiUrl = `https://api.unsplash.com/photos?`;
    if (query) {
      apiUrl = `https://api.unsplash.com/search/photos?query=${query}`;
    }

    apiUrl += `&page=${page}`;
    apiUrl += `&client_id=${accessKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    const imagesFromApi = data.results ?? data;

    if (page === 1) {
      setImages(imagesFromApi);
    } else {
      setImages((images) => [...images, ...imagesFromApi]);
    }
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    setPage(1);
    getPhotos();
  };

  useEffect(() => {
    getPhotos();
  }, [page]);

  return (
    <div className="App">
      <h1>Infinte image gallery</h1>
      <form onSubmit={handleFormSubmit} className="form">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(evt) => setQuery(evt.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <ImageGallery images={images} page={page} setPage={setPage} /> 
    </div>
  );
}
