import classes from './Image.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Image = (props) => {
  return (
    <div className={classes.albumContainer}>
        {/* <LazyLoadImage
            alt={props.alt}
            height={props.height}
            src={props.src}
            width={props.width}
            /> */}
        
      <h2>{props.albumName}</h2>
      <img className={classes.photo} src={props.photo} alt={props.author}/>
      <div className= {classes.overlay}></div>
      <button className={classes.btn}>{props.btnType}</button>
    </div>

    
  );
};

export default Image;