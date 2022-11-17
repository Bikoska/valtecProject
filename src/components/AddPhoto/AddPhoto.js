import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import { Grid, Typography } from '@mui/material';

function AddPhoto(props) {


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  const albumNameRef = useRef('');
 
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const photo = {
      albumName: albumNameRef.current.value,
    
      photo: props.fotoUrl,
      width: props.width,
      height: props.height,
      author: props.author,
      //albumName: props.albumName
    };

    props.onAddPhoto(photo);
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Grid container className="modal-header">
          <Typography className="create-button">Create new album</Typography>

          <Grid>
            <Typography className="add-to-existing">Add to existing</Typography>
            <Grid>
            </Grid>
          </Grid>
        </Grid>


        <form onSubmit={submitHandler}>
      <div >
        <label htmlFor='alName'>Album Name</label>
        <input type='text' id='alName' ref={albumNameRef} />
      </div>
  
      <button onClick={props.handleClose}>CANCEL</button><button>SAVE</button> 
     
    </form>
        </Box>
      </Modal>
    </div>
  );
}
   

export default AddPhoto;

