import shortid from 'shortid';
import produce from 'immer';
import { faker } from '@faker-js/faker';

export const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  postAdded: false,
  /*loadPost */
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  /*addPost*/
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  /*removePost*/
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  /*addComment */
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const generateDummyPost = number =>
  Array(number)
    .fill()
    .map((v, i) => ({
      id: shortid.generate(),
      Images: [{ src: faker.image.image() }],
      content: faker.lorem.paragraph(),
      User: { id: shortid.generate(), nickname: faker.name.findName() },
      Comments: [
        {
          User: { id: shortid.generate(), nickname: faker.name.findName() },
          content: faker.lorem.sentence(),
        },
      ],
    }));

//initialState.mainPosts = initialState.mainPosts.concat(generateDummyPost(10));

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = data => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = data => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = data => ({
  id: shortid.generate(),
  User: {
    id: 2,
    nickname: 'dummyNickname',
  },
  content: data.content,
  Images: [{ src: '' }],
  Comments: [
    {
      User: { nickname: 'dummy' },
      content: 'dummy',
    },
  ],
});

const dummyComment = data => ({
  id: data.id,
  content: data,
  User: {
    id: 1,
    nickname: 'jun',
  },
});

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      /*loadPost */
      case LOAD_POSTS_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.loadPostError = null;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hasMorePosts = draft.mainPosts.length < 50;
        console.log('length : ', draft.mainPosts.length);
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      /*addPost */
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.addPostError = null;
        draft.mainPosts.unshift(action.data);
        break;

      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      /*removePost */
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        console.log('post reducer action.data:', action.data);
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.removePostError = null;
        draft.mainPosts = draft.mainPosts.filter(v => v.id !== action.data);
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      /*addComment */
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        draft.addCommentError = null;
        const post = draft.mainPosts.find(v => v.id === action.data.PostId);
        post.Comments.unshift(action.data);
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
