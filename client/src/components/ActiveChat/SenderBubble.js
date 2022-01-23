import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import { Attachments } from "./index";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginBottom: '10px',
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold"
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
    marginBottom: '10px',
  }
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text } = props;
  const  attachments  = props.attachments || [];

  return (
    <Box className={classes.root}>
      {attachments.length > 1 &&
        <>
        {text !== '' &&
          <Box className={classes.bubble}>
            <Typography className={classes.text}>{text}</Typography>
          </Box>
        }
        <Attachments attachments={attachments}/>
        <Typography className={classes.date}>{time}</Typography>
        </>
      }

      {text !== '' && attachments.length === 0 &&
        <>
        <Typography className={classes.date}>{time}</Typography>
        <Box className={classes.bubble}>
          <Typography className={classes.text}>{text}</Typography>
        </Box>
        </>
      }


      {attachments.length === 1 &&
        <>
        <Typography className={classes.date}>{time}</Typography>
        <Attachments attachments={attachments}/>
        {text !== '' &&
          <Box className={classes.bubble}>
            <Typography className={classes.text}>{text}</Typography>
          </Box>
        }
        </>
      }
    </Box>
  );
};

export default SenderBubble;
