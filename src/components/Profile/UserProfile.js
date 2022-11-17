
import classes from './UserProfile.module.css';
import { useState, useEffect, useCallback } from "react";

import { Redirect, useHistory } from 'react-router-dom';

import AddPhoto from '../AddPhoto/AddPhoto';
import { Box, Container, Grid } from '@mui/material';


const UserProfile = (props) => { //deatails page

  const history = useHistory();

  const id = history.location.state?.id;
const src = history.location.state?.src;
const height = history.location.state?.height;
const width = history.location.state?.width;
const author = history.location.state?.author;


const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  const goBackHandler =() =>{
    history.goBack();
  }

  async function download(src) {
    const a = document.createElement("a");
    a.href = await toDataURL(src);
    a.download = "myImage.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function toDataURL(src) {
    return fetch(src)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      });
  }
 const handleDownload =() =>{

 // window.open(src, '_self')
 download(src);
 }


 

 async function addPhotoHandler(photo) {
  const response = await fetch('https://authvalstock-default-rtdb.europe-west1.firebasedatabase.app/albums/' + photo.albumName + '.json', {
    method: 'POST',
    body: JSON.stringify(photo),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const res = await response.json();
 setOpen(false);
}

  return (
    <>
    <section className={classes.profile}>
    <div className={classes.action}>
   
    <AddPhoto className={classes.add} open={open} handleClose={handleClose} onAddPhoto={addPhotoHandler} fotoUrl={src} width={width} height={height} author={author} />
      <button className={classes.add} onClick={handleOpen}>Add To Album +</button>
      <button onClick={handleDownload}>Download</button>
</div>


      {/* <img src={data} style={{ width: "30%", height: "30%" }}/> */}
    {/* <Photo url={src} />  */}
    <Container maxWidth="sm" >
    <Box>
    <img src={src} alt={id}/>

<label className={classes.uploadedBy}>UPLOADED BY</label>
       <h4>{author}</h4>

       <button onClick={goBackHandler}>GO BACK</button>
      </Box>
</Container>


    
{/*      
      <ProfileForm /> */}

    </section>
  </>
  );
};

export default UserProfile;
