import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import bubble from './images/bubble.svg';
import background from './images/bg-img.png';
import { makeStyles } from "@material-ui/core/styles";

import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";

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
  sideBar: {
    width: '40%',
    float: 'left',
    position: 'relative',
    backgroundImage: 'url('+background+')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    '@media screen and (max-width: 481px)' : {
      width: '100%',
      height: '40%',
    }
  },
  background: {
    background: 'linear-gradient(180deg, #3A8DFF 0%, #86B9FF 100%)',
    opacity: 0.85,
    height: '100%',
  },
  middleText: {
    position: 'absolute',
    left: '57px',
    right: '57px',
    margin: '0px auto',
    top: '40%',
    bottom: '40%',
    textAlign: 'center',
    display: 'grid',
    '& img': {
      position: 'relative',
      left: '37%',
      bottom: '20px',
    },
    '& p': {
      position: 'relative',
      top: '0px',
      fontWeight: 'normal',
      fontSize: '26px',
      textAlign: 'center',
      color: '#FFFFFF',
      fontFamily: 'Open Sans',
      lineHeight: '40px',
      '@media screen and (max-width: 481px)' : {
        fontSize: '20px',
      }
    }
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
      width: '170px',
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
    <Grid container className={classes.root}>
      <Grid item className={classes.sideBar}>
        <Box component="div" className={classes.background}>
          <Box component="div" className={classes.middleText}>
            <Box component="img" src={bubble}/>
            <Typography>Converse with anyone with any language</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item className={classes.column}>
          <Box>
              <Grid container justify="right" item className={classes.topRightPanel}>
                <Typography>Don't have an account?</Typography>
                <Button onClick={() => history.push("/register")}>Create account</Button>
              </Grid>
              <Grid justify="left" item className={classes.rightPanel}>
                <form onSubmit={handleLogin}>
                  <Typography component="h1">Welcome back!</Typography>
                  <Grid item xs={9}>
                    <FormControl margin="normal" style={{width: '100%'}} required>
                      <TextField
                        aria-label="username"
                        label="Username"
                        name="username"
                        type="text"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={9}>
                    <FormControl margin="normal" style={{width: '100%'}} required>
                      <TextField
                        label="Password"
                        aria-label="password"
                        type="password"
                        name="password"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={9}>
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
