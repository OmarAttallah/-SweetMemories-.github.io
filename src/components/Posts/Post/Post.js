import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
const user = JSON.parse(localStorage.getItem("profile"));

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [likes, setLikes] = useState(post?.likes);
  const userId = user?.token || user?.result?._id;
  const hasLikedPost = likes.find(
    (like) => like === (user?.token || user?.result?._id)
  );
  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };
  const handleLike = async () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(likes.filter((id) => id !== userId));
    } else {
      setLikes([...likes, userId]);
    }
  };
  const Likes = () => {
    if (likes.length > 0)
      return likes.find(
        (like) => like === (user?.token || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" /> &nbsp;
          {likes.length > 2
            ? `you and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;{likes.length}
          {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    return (
      <>
        <ThumbUpAltIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardActionArea onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />

        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>

        <div className={classes.overlay2}>
          {(user?.result?.googleId === post?.creator ||
            user?.token === post?.creator) && (
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          )}
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.token === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(deletePost(post._id));
              window.location.reload();
            }}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
