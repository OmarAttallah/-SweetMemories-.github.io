import { Paper, Button, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
const user = JSON.parse(localStorage.getItem("profile"));
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    if (post) setPostData(post);
  }, [currentId]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          please sign in to create a memory
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {" "}
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>

        <TextField
          name="title"
          variant="outlined"
          label="title"
          fullWidth
          value={postData.title}
          onChange={
            (e) => setPostData({ ...postData, title: e.target.value }) //this will spread the objest and assign a specific value in it each time
          }
        />
        <TextField
          multiline={true}
          minRows={3}
          name="message"
          variant="outlined"
          label="message"
          fullWidth
          value={postData.message}
          onChange={
            (e) => setPostData({ ...postData, message: e.target.value }) //this will spread the objest and assign a specific value in it each time
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="tags"
          fullWidth
          value={postData.tags}
          onChange={
            (e) => setPostData({ ...postData, tags: e.target.value.split(",") }) //this will spread the objest and assign a specific value in it each time
          }
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
