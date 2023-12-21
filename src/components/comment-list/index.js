import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

function CommentList({ comments }) {
  return (
    <div>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CommentList;
