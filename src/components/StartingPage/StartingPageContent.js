import classes from "./StartingPageContent.module.css";
import AuthForm from "../Auth/AuthForm";



const StartingPageContent = () => {
  var imageName = require("../StartingPage/img/Vector.png");
  return (
    <div className={classes.artboard}>
      <div className={classes.textboard}>
        <h1>Join our stock community!</h1>
        <p>
          Download free photos and videos powered by the best photographers.
        </p>
      </div>

      <AuthForm />
      <footer className={classes.footer}>
      <img src={imageName}  className={classes.imgFooter} alt='startingPageImg'/>

     
          
      </footer>
    </div>
  );
};

export default StartingPageContent;