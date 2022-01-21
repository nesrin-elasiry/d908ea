import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import  SideBar  from "./SideBar";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  "@global": {
    'html, body, #root': {
      height: '100%'
    }
  },
  root: {
    width: '100%',
    overflow: 'auto',
    height: '100%'
  },
  column: {
    padding: '10px 40px',
    width: '60%',
    display: 'block',
    '@media screen and (max-width: 481px)' : {
      display: 'inlineBlock',
      float: 'left',
      width: '100%',
    }
  },
  topRightPanel: {
    marginTop: '10px',
    justifyContent: 'right',
    '& p': {
      fontFamily: 'Open Sans',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '19px',
      textAlign: 'center',
      color: '#B0B0B0',
      margin: '18px 30px',
    },
    '& button': {
      background: '#FFFFFF',
      boxShadow: '0px 4px 4px rgb(88 133 196 / 15%)',
      color: '#3A8DFF',
      width: '140px',
      height: '54px',
    }
  },
  rightPanel: {
    paddingTop: '150px',
    paddingLeft: '70px',
    '& h1': {
      fontWeight: '600',
      fontSize: '26px',
      marginBottom: '30px',
    },
    '& button': {
      background: '#3A8DFF',
      borderRadius: '3px',
      color: 'white',
      padding: '10px 40px',
      width: '160px',
      height: '56px',
      marginTop: '40px',
    },
    '& .MuiInput-underline':{
      '&:before':{
        borderBottom: 'solid 1px rgb(213, 223, 238)',
      }
    },
    '& input': {
      boxShadow: '0 0 0 30px white inset',
      '&:-webkitAutofill': {
          '&:hover, &:focus, &:active': {
            boxShadow: '0 0 0 30px white inset',
            fontSize: 'inherit',
          }
      },
      '&:focus-visible, &:focus, &:autofill, &:-internal-autofill-selected, &:-webkit-autofill, &:-internal-autofill-selected':{
        outline: 'none',
        backgroundColor: 'white',
        fontSize: 'inherit',
      }
    },
    '@media screen and (max-width: 481px)' : {
      padding: '50px 0px',
    }
  }
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className={classes.root}>
      <SideBar/>
      <Grid item className={classes.column}>
          <Box>
              <Grid container justify="right" item className={classes.topRightPanel}>
                <Typography>Already have an account?</Typography>
                <Button onClick={() => history.push("/login")}>Login</Button>
              </Grid>
              <Grid justify="left" item className={classes.rightPanel}>
                <form onSubmit={handleRegister}>
                  <Typography component="h1">Create an account.</Typography>
                  <Grid>
                    <Grid item xs={9}>
                      <FormControl style={{width: '100%', marginBottom: '30px'}}>
                        <TextField
                          aria-label="username"
                          label="Username"
                          name="username"
                          type="text"
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={9}>
                      <FormControl style={{width: '100%', marginBottom: '30px'}}>
                        <TextField
                          label="E-mail address"
                          aria-label="e-mail address"
                          type="email"
                          name="email"
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={9}>
                      <FormControl style={{width: '100%', marginBottom: '30px'}} error={!!formErrorMessage.confirmPassword}>
                        <TextField
                          aria-label="password"
                          label="Password"
                          type="password"
                          inputProps={{ minLength: 6 }}
                          name="password"
                          required
                        />
                        <FormHelperText>
                          {formErrorMessage.confirmPassword}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={9}>
                      <FormControl style={{width: '100%'}} error={!!formErrorMessage.confirmPassword}>
                        <TextField
                          label="Confirm Password"
                          aria-label="confirm password"
                          type="password"
                          inputProps={{ minLength: 6 }}
                          name="confirmPassword"
                          required
                        />
                        <FormHelperText>
                          {formErrorMessage.confirmPassword}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={9}>
                      <Box display="flex" justifyContent="center">
                        <Button type="submit" variant="contained" size="large">
                          Create
                        </Button>
                      </Box>
                    </Grid>
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
