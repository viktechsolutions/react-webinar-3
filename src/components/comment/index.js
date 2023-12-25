import './style.css';
import {memo, useEffect, useState} from "react";

function Comment(props) {
  const {isLoggedInUser, comment} = props;

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  const formattedDate = new Date(comment.dateCreate).toLocaleString('ru-RU', options);

  return (
    <div className="Comment">
      <div className="Comment__header">
        <div className="Comment__author">
          {isLoggedInUser && comment.author.profile.name !== isLoggedInUser && (
            <span className="Comment__author">{comment.author.profile.name}</span>
          )}
          {isLoggedInUser && comment.author.profile.name === isLoggedInUser && (
            <span className="Comment__author--logged-in">{comment.author.profile.name}</span>
          )}
        </div>
        <div className="Comment__date">{formattedDate}</div>
      </div>
      <div className="Comment__text">{comment.text}</div>
    </div>
  )
}

export default memo(Comment);
