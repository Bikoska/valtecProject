import { Fragment } from "react";
import classes from "./Artboard.module.css";
import PhotoAlbum from "react-photo-album";
import { useHistory } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";


const Artboard = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPhotosHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://picsum.photos/v2/list");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedPhotos = [];

      for (const key in data) {
        loadedPhotos.push({
          id: key,
          author: data[key].author,
          width: data[key].width,
          height: data[key].height,
          src: data[key].download_url,
          // download_url: data[key].download_url
        });
      }
      setPhotos(loadedPhotos);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPhotosHandler();
  }, [fetchPhotosHandler]);

  const history = useHistory();

  const handleClickedPhoto = (id) => {
    history.push(`/profile`, {
      id: id,
      src: photos[id].src,
      height: photos[id].height,
      width: photos[id].width,
      author: photos[id].author
    });
  };

  let content = <p>Found no photos</p>;

  if (photos.length > 0) {
    content =  <PhotoAlbum
    layout="masonry"
    photos={photos}
    alt="alt "
    onClick={(event, photo, index) => {
      handleClickedPhoto(photos[index].id);
    }}
  />
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <>
      <section className={classes.album}>
       {content}
      </section>

    </>
  );
};

export default Artboard;
