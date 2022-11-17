import { Menu, MenuItem } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const history = useHistory();
  const [albumNames, setAlbumNames] = useState([]);
  const [albumName, setAlbumName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const fetchPhotosHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://authvalstock-default-rtdb.europe-west1.firebasedatabase.app/albums/.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      let loadedAlbums = [];

      for (const key in data) {
        loadedAlbums.push({
          id: key,
          albumName: data[key].id,
        });
      }
      setAlbumNames(loadedAlbums);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    fetchPhotosHandler();
  }, [albumName]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAlbum = (data) => {
    setAlbumName(data);
    history.push("/album", { albumName: data });
    window.location.reload()
    setAnchorEl(null);
  };

  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };
  var imageName = require("../Layout/img/SiteLogo.png");
  return (
    <header className={classes.header}>
      <nav className={classes.navigation}>
        <ul>
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
          <li className={classes.logoItem}>
            <a href="/">
            <img src={imageName}/></a>
          </li>
          {isLoggedIn && (
            <li>
              {/* <Link to='/album'>  */}

              <button onClick={handleClick}>MY ALBUMS</button>

              <div>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {albumNames.map((item) => (
                    <MenuItem
                      key={item.id}
                      onClick={() => handleAlbum(item.id)}
                    >
                      {item.id}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
