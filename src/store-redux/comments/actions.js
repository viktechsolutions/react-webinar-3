export default {

  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего комментария и установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        // Комментарий загружены успешно
        dispatch({type: 'comments/load-success', payload: {data: res.data.result}});

      } catch (e) {
        // Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  postComment: ({ id, text, type, articleId }) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/sendComment-start'});

      const token = localStorage.getItem('token');

      try {
        const res =  await services.api.request({
          url: "/api/v1/comments",
          method: "POST",
          headers: { "X-Token": token },
          body: JSON.stringify({
            text,
            parent: { _id: id, _type: type },
          }),
        });

        // Обработка успешного ответа
        dispatch({type: 'comments/sendComment-success', payload: {data: res.data.result}});
        // Загрузка комментария по идентификатору
        dispatch({type: 'comments/load', payload: {id: articleId}});
      } catch (e) {
        // Обработка ошибок
        dispatch({type: 'comments/sendComment-error'});
      }
    }
  }

}
