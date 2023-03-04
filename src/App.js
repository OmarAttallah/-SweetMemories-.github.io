import React from "react";
import { Container } from "@material-ui/core";
import NavBar from "./components/NavBar/NavBar.js";
import Home from "./components/Home/Home";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Auth from "./components/Auth/Auth.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PostDetails from "./components/PostDetails/PostDetails.jsx";
const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <GoogleOAuthProvider clientId="943559133236-8nsd5ro8ce76k4eo0kehj9a0401k8l3s.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxWidth="xl">
          <NavBar />
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" exact component={PostDetails} />
            <Route
              path="/auth"
              exact
              component={() =>
                user?.result ? <Redirect to="/posts" /> : <Auth />
              }
            />
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
// 1- first we make a route
// 2- we go to controllers to make the function that will contact thr DB
// 3- the we go the axios to make the call to the server
// 4- then we make the action creator for the wanted action
// 5- then we put the case in the reducer
// 6- then we go the component to put the dispatch
