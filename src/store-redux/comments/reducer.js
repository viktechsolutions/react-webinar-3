export const initialState = {
  data: {},
  count: 0,
  newComment: {},
  waiting: false, // признак ожидания загрузки
  comments: []
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, data: {}, waiting: true};

    case "comments/load-success":
      return {...state, data: action.payload.data, count: action.payload.data.count, newComment: action.payload.newComment,  waiting: false};

    case "comments/load-error":
      return {...state, data: {}, waiting: false};

    case "comments/sendComment-start":
      return { ...state, waiting: true};

    case "comments/sendComment-success":
      return {
        ...state,
        comments: [...state.comments, action.payload],
        newCommentId: action.payload._id,
        count: state.count + 1,
        waiting: false
      };

    case "comments/sendComment-error":
      return { ...state, waiting: false};

    default:
      return state;
  }

}

export default reducer;
