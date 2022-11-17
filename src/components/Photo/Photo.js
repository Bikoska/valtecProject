import classes from "./Photo.module.css";
import { History, Link } from "react-router-dom";

const Photo = (props) => {
    const detailHandler =  () =>{
       //redirect to details page
    }
    return (
        <section className={classes.photo}>
        
            
            <img src={props.url} alt={props.id} title={props.title} onClick={props.click} />
            
        </section>
    )
}

export default Photo