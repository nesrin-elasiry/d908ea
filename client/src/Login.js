import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import bubble from './images/bubble.svg';

import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className={'row'}>
      <Grid item className={'sideBar'}>
        <Box component="div" className={'background'}>
          <Box component="div" className={'middleText'}>
            <Box component="img" src={bubble}/>
            <Box component="label">Converse with anyone with any language</Box>
          </Box>
        </Box>
      </Grid>
      <Grid item className={'column'}>
          <Box>
              <Grid container justify="right" item className={'topRightPanel'}>
                <Typography>Don't have an account?</Typography>
                <Button onClick={() => history.push("/register")}>Create account</Button>
              </Grid>
              <Grid justify="left" item className={'rightPanel'}>
                <form onSubmit={handleLogin}>
                  <h1>Welcome Back!</h1>
                  <Grid item xs={8}>
                    <FormControl margin="normal" style={{width: '100%'}} required>
                      <TextField
                        aria-label="username"
                        label="Username"
                        name="username"
                        type="text"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={8}>
                    <FormControl margin="normal" style={{width: '100%'}} required>
                      <TextField
                        label="Password"
                        aria-label="password"
                        type="password"
                        name="password"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={8}>
                    <Box display="flex" justifyContent="center">
                      <Button type="submit" variant="contained" size="large">
                        Login
                      </Button>
                    </Box>
                  </Grid>
                </form>
              </Grid>
          </Box>
        </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
