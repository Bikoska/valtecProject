import React, { useState, useEffect, useCallback } from "react";
import classes from "./Album.module.css";
import { Grid, ImageList, ImageListItem } from "@mui/material";
import { useHistory } from "react-router-dom";
import { ClassNames } from "@emotion/react";

function Album() {
  const history = useHistory();
  let albumName = history.location.state?.albumName;
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const goBackHandler = () => {
    history.goBack();
  };

  const handleSaveAlbum =() =>{
    //to do -> submit album with deleted photos

    window.location.reload();

  }
  const fetchPhotosHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://authvalstock-default-rtdb.europe-west1.firebasedatabase.app/albums/" +
          albumName +
          ".json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      let loadedPhotos = [];

      for (const key in data) {
        loadedPhotos.push({
          id: key,
          albumName: data[key].albumName,
          photo: data[key].photo,
          src: data[key].photo,
          width: data[key].width,
          height: data[key].height,
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
  }, [albumName, fetchPhotosHandler]);

  async function deletePhotoHandler(photo) {
    const response = await fetch(
      "https://authvalstock-default-rtdb.europe-west1.firebasedatabase.app/albums/" +
        albumName+"/"+photo+".json",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response.json();
    
  }

  let content = <p>Found no photos</p>;

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  
  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <h1>{albumName}</h1>
          <ImageList cols={3}>
            {photos.map((item) => (
              <ImageListItem key={item.id}>
                <img className={classes.albumImg}
                  src={`${item.src}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.id}
                  loading="lazy"
                />
                <button className={classes.btnDelete} onClick={() => deletePhotoHandler(item.id)}>DELETE</button>
              </ImageListItem>
            ))}
          </ImageList>
          <div className={classes.btnActions}>
          <button onClick={goBackHandler}>GO BACK</button>
          <button onClick={handleSaveAlbum}>SAVE</button>
          </div>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </>
  );
}

export default Album;
