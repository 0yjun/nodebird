import { all, delay, fork, put, takeEvery, takeLatest, call } from 'redux-saga/effects';
import shortid from 'shortid';
import Axios from 'axios';
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  generateDummyPost,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from '../reducer/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducer/user';

/*laodPost */
function loadPostsAPI(data) {
  return Axios.post('/api/posts', data);
}

function* loadPosts(action) {
  try {
    //const result = yield call(loadPostsAPI, action.data);
    yield delay(1000);
    const id = shortid.generate();
    console.log('action.loadposts : ', action.data);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (error) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: error.response.data,
    });
  }
}

/*addPost */
function addPostAPI(data) {
  return Axios.post('/post', { content: data });
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    console.log('result : ', result);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (error) {
    yield put({
      type: ADD_POST_FAILURE,
      data: error.response.data,
    });
  }
}
/*removePost */
function removePostAPI(data) {
  return Axios.post('/api/post', data);
}

function* removePost(action) {
  try {
    //const result = yield call(addPostAPI, action.data);
    console.log('removePost run ');
    yield delay(1000);
    const id = shortid.generate();
    console.log('action.data(removePost) : ', action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: error.response.data,
    });
  }
}

/*addComment */
function addCommentAPI(data) {
  return Axios.post(`/post/${data.id}/comment`, data);
}

function* addComment(action) {
  try {
    console.log('addComment * run');
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchLoadPosts), fork(watchAddPost), fork(watchAddComment), fork(watchRemovePost)]);
}
