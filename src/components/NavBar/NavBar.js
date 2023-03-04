import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AppBar, Button, Typography, Toolbar, Avatar } from "@material-ui/core";
import useStyles from "./styles";
import memories from "../../images/memories.png";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
const NavBar = () => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("./");
    setUser(null);
  };
  useEffect(() => {
    //const token = user?.token;
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]); //change when we change the path / route
  console.log(user);
  const goToAuth = () => {
    history.push("/auth");
  };
  return (
    <AppBar className={classes.appBar} position="static" color="default">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Sweet&nbsp;Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="100"
        />
      </div>
      {user ? (
        <div className={classes.profile}>
          <Avatar
            className={classes.purple}
            alt={user.result.name}
            src={user.result.picture}
          >
            {user.result.name.charAt(0)}
          </Avatar>
          <Typography className={classes.userName}>
            {user.result.name}
          </Typography>
          <Button
            variant="contained"
            className={classes.logout}
            color="secondary"
            onClick={logout}
          >
            Sign&nbsp;out
          </Button>
        </div>
      ) : (
        <Button
          className={classes.signIn}
          onClick={goToAuth}
          variant="contained"
          color="primary"
        >
          Sign&nbsp;In
        </Button>
      )}
      <Toolbar className={classes.toolbar}></Toolbar>
    </AppBar>
  );
};

export default NavBar;
