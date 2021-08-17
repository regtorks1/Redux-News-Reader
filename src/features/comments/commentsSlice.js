import {createAsnycThunk, createSlice} from '@reduxjs/toolkit';

export const loadCommentsForArticleId = createAyncThunk('comments/loadCommentsForArticleId', async (id) => {
    const response = await fetch(`api/articles/${id}/comments`)
    const json = await response.json()
    return json
})

// Create postCommentForArticleId here.
export const postCommentforArticleId = createAyncThunk('comments/postCommentforArticleId', async(articleId) => {
  {articleId: 1,
  comment: 'This article is great!'
},
  const requestBody = JSON.stringify({comment: 'This article is great!'})
  const response = await fetch(`api/articles/${articleId}/comments`, {
    method: 'POST'
    body: requestBody
  })
 const json = response.json()
 return json
})

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    byArticleId : {},
    isLoadingComents: false,
    failedToLoadComments: false,
    createCommentIsPending: false,
    failedToCreateComment: false
  },
  extraReducers: {
    [loadCommentForArticleId.pending]: (state, action) => {
      state.isLoadingComments = true;
      state.failedToLoadComments = false;
    },
    [loadCommentForArticleId.fulfilled]: (state, action) => {
      const {id} = action.payload
      state.isLoadingComments = false;
      state.failedToLoadComments = false;

      state.byArticleId[action.payload.articleId] = action.payload.comments;
    },
    [loadCommentForArticleId.rejected]: (state, action) => {
      state.isLoadingComments = false;
      state.failedToLoadComments = true;
    },
    [postCommentForArticleId.pending]: (state, action) => {
      state.createCommentIsPending = true;
      state.failedToCreateComment = false;
    },
    [postCommentForArticleId.fulfilled]: (state, action) => {
       state.byArticleId[action.payload.articleId].push(action.payload);
      state.createCommentIsPending = false,
      state.failedToCreateComment = false
    },
    [postCommentForArticleId.rejected]: (state, action) => {
            state.createCommentIsPending = false,
            state.failedToCreateComment = true
    }  
  }
});

export const selectComments = (state) => state.comments.byArticleId;
export const isLoadingComments = (state) => state.comments.isLoadingComments;
export const createCommentIsPending = (state) => state.comments.createCommentIsPending;

export default commentsSlice.reducer;