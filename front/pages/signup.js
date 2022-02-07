import { Form, Input, Checkbox, Button } from 'antd';
import Head from 'next/head';

import React, { useCallback } from 'react';
import { useState } from 'react/cjs/react.development';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducer/user';

const SignUp = () => {
  const [email, onChangeEmail] = useInput('');
  const [nickname, onchangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [passwordChk, setPasswordChk] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();
  const { signUpLoading } = useSelector(state => state.user);

  const onChangePasswordChk = useCallback(
    e => {
      setPasswordChk(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback(e => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordChk) {
      return setPasswordError(true);
    }

    if (!term) {
      return setTermError(true);
    }
    console.log(email, password, passwordChk);
    console.log('signUpLoading : ', signUpLoading);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, passwordChk, term]);

  const EerrorMessage = styled.div`
    color: red;
  `;

  return (
    <AppLayout>
      <Head>
        <title>회원가입</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">email</label>
          <br />
          <Input name="user-email" type="email" value={email} required onChange={onChangeEmail}></Input>
        </div>
        <div>
          <label htmlFor="nickname">닉네임</label>
          <br />
          <Input name="nickname" value={nickname} required onChange={onchangeNickname}></Input>
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <br />
          <Input name="password" type="password" value={password} required onChange={onChangePassword}></Input>
        </div>
        <div>
          <label htmlFor="passwordChk">비밀번호확인</label>
          <br />
          <Input name="passwordChk" type="password" value={passwordChk} required onChange={onChangePasswordChk}></Input>
          {passwordError && <EerrorMessage>비밀번호가 일치하지 않습니다.</EerrorMessage>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            약관동의여부
          </Checkbox>
          {termError && <EerrorMessage>약관동의 필수.</EerrorMessage>}
        </div>

        <div style={{ margintop: 10 }}>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            회원가입
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default SignUp;
