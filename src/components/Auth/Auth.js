import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import { useGoogleLogin } from "@react-oauth/google";
import Axios from "axios";
import Icon from "./icon";
import { useHistory } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
const initialStateForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setisSignup] = useState(false);
  const [formData, setFormData] = useState(initialStateForm);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };
  const history = useHistory();
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword); // here i say what i should do in the state variable
  }; //in use state it retruns the data and function that will change it this function is called to take input of how the new data looks like or how it will change
  const switchMode = () => {
    setisSignup((previsSignup) => !previsSignup);
    setShowPassword(false); // here i say set the state variable to a specified value
  };
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const dataObj = await Axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        //console.log(dataObj);
        const token = dataObj?.data.sub + "G";
        const result = dataObj?.data;
        try {
          dispatch({ type: "AUTH", data: { result, token } });
          history.push("./");
        } catch (error) {
          console.log(error);
        }
        /*const { name, sub, picture } = dataObj.data;

        const user = {
          _id: sub,
          _type: "user",
          userName: name,
          image: picture,
        };
        console.log(user);*/
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                startIcon={<Icon />}
                variant="contained"
                onClick={login}
              >
                Sign In with Google
              </Button>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account ? Sign In"
                  : "Dont have an account ? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
