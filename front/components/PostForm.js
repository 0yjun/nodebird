import { Button, Input } from 'antd';
import Form from 'antd/lib/form/Form';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { addPost } from '../reducer/post';

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
    dispatch(addPost(text));
  }, [text]);

  const imageInput = useRef(null);
  const onClickImageUpload = useCallback(e => {
    imageInput.current.click();
  }, []);

  return (
    <Form style={{ margin: '10px 0 2opx' }} encType="multipart/form-data" onFinish={onsubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="text입력" />

      <input type="file" multiple ref={imageInput} hidden onClick={onClickImageUpload} />
      <Button onClick={onClickImageUpload}>이미지 업로드</Button>
      <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={addPostLoading}>
        보내기
      </Button>
      <div>
        {/* 
           {imagePaths.map(v => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} style={{ width: '280px' }} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
          
        */}
      </div>
    </Form>
  );
}

export default PostForm;
