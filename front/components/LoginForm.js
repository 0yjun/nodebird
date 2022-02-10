import { Button, Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/Link';
import styled from 'styled-components';
import { Form } from 'antd';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { logInRequestAction } from '../reducer/user';

const ButtonWrapper = styled.div`
  margintop: 10px;
`;
const FormWrapper = styled(Form)`
  padding: 10px;
`;

function LoginForm() {
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const { logInLoading, logInError } = useSelector(state => state.user);

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, logInError);

  const onSubmitForm = useCallback(() => {
    dispatch(logInRequestAction({ email, password }));
  }, [email, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">email</label>
        <br />
        <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
      </div>
      <div>
        <label htmlFor="password">비멀번호</label>
        <br />
        <Input name="password" type="password" value={password} onChange={onChangePassword} required />
      </div>
      <Button type="primary" htmlType="submit" loading={logInLoading}>
        로그인
      </Button>
      <Link href="/signup">
        <a>
          <Button>회원가입</Button>
        </a>
      </Link>
    </FormWrapper>
  );
}

export default LoginForm;
