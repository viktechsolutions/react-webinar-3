import Comment from "../../components/comment";
import useSelector from '../../hooks/use-selector';
import CommentForm from "../../components/comment-form";
import {useParams} from "react-router-dom";
import useInit from "../../hooks/use-init";
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import commentsActions from "../../store-redux/comments/actions";
import shallowequal from "shallowequal";
import {memo, useCallback, useState} from "react";
import treeToList from "../../utils/tree-to-list";
import SideLayout from "../../components/side-layout";
import commentActions from "../../store-redux/comments/actions";

function CommentSection(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const [replyCommentId, setReplyCommentId] = useState(null);
  const [formData, setFormData] = useState({text: ''});
  const [isReplying, setIsReplying] = useState(false);
  const [parentCommentId, setParentCommentId] = useState(null);

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [dispatch, params.id]);


  const select = useSelector(state => ({
    exists: state.session.exists,
    username: state.session.user.profile?.name,
    id: state.session.user._id
  }));

  const selectRedux = useSelectorRedux(state => ({
    comment: state.comments.data,
    article: state.article.data,
  }), shallowequal)

  function createCommentTree(comments, level = 0) {
    let map = {}, node, roots = [], i;

    for (i = 0; i < comments.length; i += 1) {
      map[comments[i]._id] = i; // Карта для отслеживания индексов комментариев
      comments[i].children = [];
    }

    for (i = 0; i < comments.length; i += 1) {
      node = comments[i];
      if (node.parent && comments[map[node.parent._id]]) {
        comments[map[node.parent._id]].children.push(node);
        node.level = comments[map[node.parent._id]].level + 1; // Увеличиваем уровень для дочерних комментариев
      } else {
        roots.push(node);
        node.level = 0; // Корневой уровень для комментария
      }
    }
    return roots;
  }


  const treeComments = createCommentTree(selectRedux.comment?.items || []);
  const flatCommentList = treeToList(treeComments);

  const handleTextChange = (e) => {
    setFormData({...formData, text: e.target.value});
  };

  const callback = {
    onSubmitComment: (e) => {
      e.preventDefault();

      if (formData.text.length) {
        dispatch(
          commentActions.postComment({
            id: params.id,
            text: formData.text,
            type: "article",
            articleId: params.id,
          })
        ).then(() => {
          dispatch(commentsActions.load(params.id));
          setFormData({text: ''});
          setIsReplying(false);
          setReplyCommentId(null);
        }).catch((error) => {
          console.error("Ошибка при отправке комментария:", error);
        });
      }
    },
    onSubmitCommentReply: (e) => {
      e.preventDefault();

      if (formData.text.length) {
        dispatch(
          commentActions.postComment({
            id: replyCommentId,
            text: formData.text,
            type: "comment",
            articleId: params.id,
          })
        ).then(() => {
          dispatch(commentsActions.load(params.id));
          setFormData({text: ''});
          setIsReplying(false);
          setReplyCommentId(null);
        }).catch((error) => {
          console.error("Ошибка при отправке комментария:", error);
        });
      }
    },
    closeReplyForm: (e) => {
      e.preventDefault();
      setFormData({text: ''}); // Очищаем текст формы
      setIsReplying(false);      // Устанавливаем, что больше не отвечаем на комментарий
      setReplyCommentId(null);   // Сбрасываем ID
    },
  };

  function replayHandler(commentId) {
    setReplyCommentId(replyCommentId === commentId ? null : commentId);
    setParentCommentId(commentId);
    setIsReplying(replyCommentId !== commentId);
  }

  return (
    <div>
      <SideLayout padding='large'>
        <h1>Комментарии ({selectRedux.comment.count})</h1>
      </SideLayout>
      {flatCommentList?.map(commentItem => (
        <SideLayout key={commentItem._id} padding='large'>
          <div style={{marginLeft: `${commentItem.level * 10}px`}}>
            <Comment comment={commentItem}/>
            {select.exists && (
              <div>
                <SideLayout padding='top'>
                  <div onClick={() => replayHandler(commentItem._id)}
                       style={{cursor: 'pointer', color: '#0087E9', fontSize: '12px', marginBottom: '10px'}}>
                    Ответить
                  </div>
                </SideLayout>
                {replyCommentId === commentItem._id && (
                  <div>
                    <div style={{marginBottom: '10px', fontSize: '12px', fontWeight: 700}}>Новый ответ</div>
                    <CommentForm
                      id={commentItem._id}
                      text={formData.text}
                      onTextChange={handleTextChange}
                      onSubmit={callback.onSubmitCommentReply}
                      onCancel={callback.closeReplyForm}
                      parentCommentId={commentItem._id}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </SideLayout>
      ))}
      <SideLayout padding='large'>
        <div style={{marginBottom: '10px', fontSize: '12px', fontWeight: 700}}>Новый комментарий</div>

        <CommentForm
          text={formData.text}
          onTextChange={handleTextChange}
          onSubmit={callback.onSubmitComment}
          onCancel={callback.closeReplyForm}
        />
      </SideLayout>


      {!select.exists &&
        <SideLayout padding='large'><p>Войдите, чтобы иметь возможность комментировать</p></SideLayout>}
    </div>
  );
}

export default memo(CommentSection);
