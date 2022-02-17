import { all, delay, fork, takeEvery, put, call } from 'redux-saga/effects';
import Axios from 'axios';
import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  FOLLOW_REQUEST,
  UNFOLLOW_REQUEST,
  UNFOLLOW_FAILURE,
  UNFOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_SUCCESS,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
} from '../reducer/user';

/* load User */
function loadUserAPI() {
  return Axios.get('/user');
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    console.log(action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data,
    });
  }
}

/* login */
function loginAPI(data) {
  return Axios.post('/user/login', data);
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    console.log(action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}
/* logout */
function logoutAPI(data) {
  return Axios.post('/user/logout', data);
}

function* logout(action) {
  try {
    const result = yield call(logoutAPI, action.data);
    console.log(action.data);
    yield put({
      type: LOG_OUT_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data,
    });
  }
}
/* signup*/

function signUpAPI(data) {
  return Axios.post('user', data);
}

function* signup(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log('result : ' + result);
    console.log(action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: SIGN_UP_FAILURE,
      error: error.response.data,
    });
  }
}

/* follow*/

function followAPI(data) {
  return Axios.post('./follow', data);
}

function* follow(action) {
  try {
    //const result = yield call(signUpAPI, action.data);
    yield delay(1000);
    console.log('follow action : ' + action.data);
    console.log(action.data);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: FOLLOW_FAILURE,
      error: error.response.data,
    });
  }
}

/* signup*/
function unfollowApi(data) {
  return Axios.post('user', data);
}

function* unfollow(action) {
  try {
    //const result = yield call(signUpAPI, action.data);
    yield delay(1000);
    console.log('signUp* action : ' + action.data);
    console.log(action.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: error.response.data,
    });
  }
}

/* signup*/
function changeNicknameAPI(data) {
  return Axios.patch('/user/nickname', { nickname: data });
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}
function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
}

function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logout);
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signup);
}

function* watchFollow() {
  yield takeEvery(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeEvery(UNFOLLOW_REQUEST, unfollow);
}

function* watchChangeNickname() {
  yield takeEvery(CHANGE_NICKNAME_REQUEST, changeNickname);
}

export default function* userSaga() {
  console.log('userSaga');
  yield all([
    fork(watchLoadUser),
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchChangeNickname),
  ]);
}
