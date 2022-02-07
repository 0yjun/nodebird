import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducer/post';
import { useEffect } from 'react/cjs/react.development';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const [commentText, onchangeCommentText, setCommentText] = useInput('');
  const id = useSelector(state => state.user.me?.id);
  const { addCommentLoading, addCommentDone } = useSelector(state => state.post);

  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
    if (!commentText) {
      alert('댓글을 입력하세요');
      return false;
    }
    dispatch({ type: ADD_COMMENT_REQUEST, data: { content: commentText, userId: id, postId: post.id } });
  }, [commentText, id]);

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea value={commentText} onChange={onchangeCommentText} rows={4} />
        <Button
          style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }}
          type="primary"
          htmlType="submit"
          loading={addCommentLoading}>
          보내기
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
