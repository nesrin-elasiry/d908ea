import React, { useState } from "react";
import { FormControl, FilledInput } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";

import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, Typography, Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';




const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20
  }
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [images, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const { postMessage, otherUser, conversationId, user } = props;
  const [open, setOpen] = React.useState(false);

  //Dialog functionalities
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImage([]);
  };

  const handleUpload = (event) => {
    // submit message and image from dialog
    submitForm(text);
  };

  const selectFile = async (event) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('upload_preset', 'ml_default');
    let res = await fetch(
      "https://api.cloudinary.com/v1_1/dfsrc1vho/auto/upload",
      {
        method: "post",
        body: formData
      }
    );

    let json = await res.json();
    setImage([...images, json.secure_url ]);
    setLoading(false);
  }

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    //submit message from the outside panel not dialog
    event.preventDefault();
    submitForm(event.target.text.value);
  };

  const submitForm = async (text)=>{
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: text,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: images,
    };
    await postMessage(reqBody);
    setText("");
    handleClose();
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          required
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="upload image dialog"
                onClick={handleClickOpen}
                onMouseDown={handleClickOpen}
                edge="end"
              >
              <AddPhotoAlternateOutlinedIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <div>
        <Dialog maxWidth='sm' fullWidth="true" open={open} onClose={handleClose}>
          <DialogTitle>Send Image</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              placeholder="Type something..."
              value={text}
              onChange={handleChange}
              margin="dense"
              id="message"
              fullWidth
              variant="standard"
            />
            <Box
              sx={{
                marginTop: '30px',
                marginBottom: '15px',
                textAlign: 'center',
              }}>
              <input
                id="btn-upload"
                name="btn-upload"
                style={{ display: 'none' }}
                type="file"
                accept="image/*"
                onChange={selectFile} />
                <label htmlFor="btn-upload">
                  <Button
                    className="btn-choose"
                    variant="outlined"
                    component="span" >
                     Add Image
                  </Button>
                </label>
              </Box>
              {loading &&
                <LinearProgress/>
              }
              {images && images.length>0 &&
                <>
                <Typography variant="h6" className="list-header">
                  Images Preview
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    marginBottom: '5px',
                  }}
                >
                  {images.map((image, index) => (
                    <Box
                      component="img"
                      sx={{
                        height: 80,
                        width: 80,
                        marginRight: '5px',
                        borderRadius: '5px',
                      }}
                      alt={image}
                      src={image}
                    />
                  ))}
                </Box>
                </>
              }
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={!images || images.length < 1} onClick={handleUpload}>Send</Button>
          </DialogActions>
        </Dialog>
      </div>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
