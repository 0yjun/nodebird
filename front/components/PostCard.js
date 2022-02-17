import {
  EllipsisOutlined,
  HeartOutlined,
  MessageOutlined,
  HeartTwoTone,
  RetweetOutlined,
} from '@ant-design/icons/lib/icons';
import { Button, Card, Comment, Image, List, Popover } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { Content } from 'antd/lib/layout/layout';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import PostImages from './PostImages';
import Avatar from 'antd/lib/avatar/avatar';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import Link from 'next/link';
import { LIKE_POST_REQUEST, REMOVE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../reducer/post';
import FollowButton from './FollowButton';

function PostCard({ post }) {
  const id = useSelector(state => state.user.me?.id);
  const { removePostLoading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const onLike = useCallback(() => {
    console.log('LIKE_POST_REQUEST');
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);
  const onUnlike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prey => !prey);
  }, []);
  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const liked = post.Likers ? post.Likers.find(v => v.id === id) : null;
  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        key={post.id}
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone twoToneColor="#FF0000" key="heart" onClick={onUnlike} />
          ) : (
            <HeartOutlined onClick={onLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <ButtonGroup>
                {id && post.User.id == id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger" onClick={onRemovePost} loading={removePostLoading}>
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </ButtonGroup>
            }>
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={id && <FollowButton post={post}></FollowButton>}>
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
        <Content />
        <Button></Button>
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizenal"
            dataSource={post.Comments}
            renderItem={item => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={
                    <Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${item.User.id}`}>
                      <a>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    contnet: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likes: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
export default PostCard;
