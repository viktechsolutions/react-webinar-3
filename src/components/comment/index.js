import './style.css';
import {memo} from "react";

function Comment(props) {
  const {id, comment} = props;

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
        <div className="Comment__author">{comment.author.profile.name} </div>
        <div className="Comment__date">{formattedDate}</div>
      </div>
      <div className="Comment__text">{comment.text}</div>
    </div>
  )
}

export default memo(Comment);
