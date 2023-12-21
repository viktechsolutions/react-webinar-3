import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
function CommentForm({text, onTextChange, onSubmit, onCancel}) {
  return (
    <div className="Comment-form">
      <textarea
        className="Comment-form-text"
        rows="5"
        cols="100"
        value={text}
        onChange={onTextChange}
      ></textarea>
      <div className="Comment-form-buttons">
        <button onClick={onSubmit}>Отправить</button>
        <button onClick={onCancel}>Отменить</button>
      </div>
    </div>
  );
}

CommentForm.propTypes = {
  text: PropTypes.string.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default CommentForm;
