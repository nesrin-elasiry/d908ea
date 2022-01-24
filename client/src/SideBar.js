import React from "react";
import bubble from './images/bubble.svg';
import background from './images/bg-img.png';
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  "@global": {
    'html, body, #root': {
      height: '100%'
    }
  },
  sideBar: {
    width: '40%',
    float: 'left',
    position: 'relative',
    backgroundImage: 'url('+background+')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    '@media screen and (max-width: 530px)' : {
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
      '@media screen and (max-width: 530px)' : {
        fontSize: '20px',
      },
      '@media screen and (min-width: 531px) and (max-width: 770px)' : {
        fontSize: '22px',
        lineHeight: '30px',
      },
    },
    '@media screen and (min-width: 531px) and (max-width: 770px)' : {
      left: '20px',
      right: '20px',
    },
  },
}));

const SideBar = (props) => {
  const classes = useStyles();

  return (
    <Grid item className={classes.sideBar}>
      <Box component="div" className={classes.background}>
        <Box component="div" className={classes.middleText}>
          <Box component="img" src={bubble}/>
          <Typography>Converse with anyone with any language</Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default SideBar;
