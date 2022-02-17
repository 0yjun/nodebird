import produce from 'immer';

export const initialState = {
  /*로그인 정보 */
  loadUserDone: false,
  loadUserLoading: false, //로그인 시도중
  loadUserError: null,
  /*로그인 */
  logInDone: false,
  logInLoading: false, //로그인 시도중
  logInError: null,
  /*로그아웃 */
  logOutDone: false,
  logOutLoading: false, //로그아웃 시도중
  logOutError: false,
  /*회원가입 */
  signUpDone: false,
  signUpLoading: false, //회원가입 시도중
  signUpError: false,
  /*닉네임 */
  changeNicknameDone: false,
  changeNicknameLoading: false, //닉네임변경 시도중
  changeNicknameError: false,
  /*팔로우 */
  followDone: false,
  followLoading: false, //팔로우 시도중
  followError: false,
  /*언팔로우 */
  unfollowDone: false,
  unfollowLoading: false, //언팔로우 시도중
  unfollowError: false,

  me: null,
  signUpData: {},
  loginData: {},
};

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const logInRequestAction = data => {
  return { type: LOG_IN_REQUEST, data };
};

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      /*login*/
      case LOAD_USER_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserDone = false;
        draft.loadUserError = null;
        break;
      case LOAD_USER_SUCCESS:
        draft.loadUserLoading = false;
        draft.me = action.data;
        draft.loadUserDone = true;
        break;
      case LOAD_USER_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserError = action.error;
        break;
      /*login*/
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.me = action.data;
        draft.logInDone = true;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      /*logout*/
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.logOutError = null;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      /*signUp*/
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        draft.signUpError = null;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      /*changeNickname*/
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNickLoading = true;
        draft.changeNickDone = false;
        draft.changeNickError = null;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.me.nickname = action.data.nickanme;
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNickLoading = false;
        draft.changeNickError = action.error;
        break;
      /*following*/
      case FOLLOW_REQUEST:
        draft.followingLoading = true;
        draft.followingDone = false;
        draft.followingError = null;
        break;
      case FOLLOW_SUCCESS:
        draft.followingLoading = false;
        draft.me.Followings.push({ id: action.data });
        draft.followingDone = true;
        draft.followingError = null;
        break;
      case FOLLOW_FAILURE:
        draft.followingLoading = false;
        draft.followingError = action.error;
        break;
      /*following*/
      case UNFOLLOW_REQUEST:
        draft.unfollowingLoading = true;
        draft.unfollowingDone = false;
        draft.unfollowingError = null;
        break;
      case UNFOLLOW_SUCCESS:
        draft.unfollowingLoading = false;
        draft.me.Followings = draft.me.Followings.filter(v => v.id !== action.data);
        draft.unfollowingDone = true;
        draft.unfollowingError = null;
        break;
      case UNFOLLOW_FAILURE:
        draft.unfollowingLoading = false;
        draft.unfollowingError = action.error;
        break;
      /*ect*/
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;
      //return { ...state, me: { ...state.me, Posts: [{ id: action.data }, ...state.me.Posts] } };
      case REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter(v => v.id !== action.data);
        break;
      //return { ...state, me: { ...state.me, Posts: state.me.Posts.filter(v => v.id !== action.data) } };
      default:
        break;
    }
  });
};

export default reducer;
