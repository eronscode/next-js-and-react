import classes from './comment-list.module.css';

function CommentList(props) {
  const { comments } = props;

  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {comments?.map((item) => (
        <li>
          <p>My comment is amazing!</p>
          <div>
            By <address>Maximilian</address>
          </div>
        </li>
      ))}

    </ul>
  );
}

export default CommentList;
