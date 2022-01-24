import React, { useState } from "react";
import { FormControl, FilledInput } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import axios from "axios";

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
  const [imagesFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { postMessage, otherUser, conversationId, user } = props;
  const [open, setOpen] = useState(false);
  let imagesURL: string[] = [];

  //Dialog functionalities
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImage([]);
    setImageFiles([]);
    imagesURL = [];
  };

  const instance = axios.create();
  const handleUpload = async(event) => {
    // submit message and image from dialog
    setLoading(true);
    try{
      await Promise.all(
        imagesFiles.map(async image =>{
          const formData = new FormData();
          formData.append('file', image);
          formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

          let res = await instance.post("https://api.cloudinary.com/v1_1/"+process.env.REACT_APP_CLOUDINARY_NAME+"/auto/upload", formData);

          let data = await res.data;
          imagesURL.push(data.secure_url);
          return true;
        })
      );
      setLoading(false);
      submitForm(text);
    }catch(error){
        console.error(error);
        setLoading(false);
    }
  };

  const selectFile = (event) => {
    var reader = new FileReader();
    setImageFiles([...imagesFiles, event.target.files[0]])
    reader.readAsDataURL(event.target.files[0]);

   reader.onloadend = () => {
      setImage([...images, {photo: reader.result, text: 'photo_'+images.length}]);
    }
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
      attachments: imagesURL,
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
      <Box>
        <Dialog maxWidth='sm' fullWidth={true} open={open} onClose={handleClose}>
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
                  {images.map((item, index) => (
                    <Box
                      key={item.text}
                      component="img"
                      sx={{
                        height: 80,
                        width: 80,
                        marginRight: '5px',
                        borderRadius: '5px',
                      }}
                      alt={item.photo}
                      src={item.photo}
                    />
                  ))}
                </Box>
                </>
              }
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={!images || images.length < 1 || loading} onClick={handleUpload}>Send</Button>
          </DialogActions>
        </Dialog>
      </Box>
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
