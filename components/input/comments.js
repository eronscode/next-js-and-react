import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const notificationCtx = useContext(NotificationContext)


  useEffect(()=>{
    if(showComments){
      fetchComments()
    }
  },[showComments])

  function fetchComments() {
    setLoadingComments(true)
    fetch('/api/comments/'+ eventId)
      .then((response) =>{
        if(response.ok){
          return response.json()
        }
  
        return response.json().then((data) => {
          throw new Error(data.message || 'An error occured')
        })
      })
      .then((data) => {
        setLoadingComments(false)
        setComments(data.comments)
      }).catch((error)=>{
        setLoadingComments(false)
        notificationCtx.showNotification({
          title:'Error!',
          message: error.message || 'Unable to fetch comments',
          status:'error'
        })
      })
  }

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // send data to API
    notificationCtx.showNotification({
      title:'Adding Comment...',
      message:'Your comment is being added. Please wait...',
      status:'pending'
    })
    fetch('/api/comments/'+ eventId, {
      method:'POST',
      body: JSON.stringify(commentData),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if(response.ok){
        return response.json()
      }

      return response.json().then((data) => {
        throw new Error(data.message || 'An error occured')
      })
    }).then(data => {
      fetchComments();
      notificationCtx.showNotification({
        title:'Success!',
        message:'Added Comment Successful',
        status:'success'
      })
    }).catch(function(error) {
      notificationCtx.showNotification({
        title:'Error!',
        message: error.message || 'Some error occured',
        status:'error'
      })
    });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {loadingComments && <h3 className="center">Loading Comments...</h3>}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
