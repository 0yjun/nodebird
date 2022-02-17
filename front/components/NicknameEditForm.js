import { Input } from 'antd';
import Form from 'antd/lib/form/Form';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducer/user';

function NicknameEditForm() {
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  const style = useMemo(() => ({ marginBottom: '20px', border: '1px solid gray', padding: '20px' }));
  return (
    <Form style={style}>
      <Input.Search
        addonBefore="닉네임"
        enterButton="수정"
        value={nickname}
        onChange={onChangeNickname}
        onSearch={onSubmit}
      />
    </Form>
  );
}

export default NicknameEditForm;
