import { Button, Input } from 'antd';
import Form from 'antd/lib/form/Form';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { addPost, ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_FORM_REQUEST, UPLOAD_IMAGES_REQUEST } from '../reducer/post';

function PostForm() {
  const { imagePaths, addPostDone, addPostLoading } = useSelector(state => state.post);
  const dispatch = useDispatch();

  const [text, onChangeText, setText] = useInput('');
  /*게시글 올라갔는지 확인 */
  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onsubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요');
    }

    const formData = new FormData();
    imagePaths.forEach(p => {
      formData.append('image', p);
    });
    formData.append('content', text);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const imageInput = useRef();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback(e => {
    console.log('images ', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, f => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  });

  const onRemoveImage = useCallback(index => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  });
  return (
    <Form style={{ margin: '10px 0 2opx' }} encType="multipart/form-data" onFinish={onsubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="text입력" />

      <input type="file" multiple ref={imageInput} hidden onClick={onClickImageUpload} onChange={onChangeImages} />
      <Button onClick={onClickImageUpload}>이미지 업로드</Button>
      <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={addPostLoading}>
        보내기
      </Button>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={`http://localhost:4000/${v}`} style={{ width: '200px' }} alt={v} />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
}

export default PostForm;
