import React from 'react';
import proptypes from 'prop-types';
import Link from 'next/Link';
import { Input, Menu, Row, Col } from 'antd';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import { useSelector } from 'react-redux';

const SearchInput = styled(Input.Search)`
  verticalalign: 'middle';
`;

function AppLayout({ children }) {
  const { me } = useSelector(state => state.user);
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="1">
          <Link href="/">
            <a>Home</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Input.Search enterButton />
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://wwww.zerocho.com" target="_blank" rel="norefferer noopener">
            made by
          </a>
        </Col>
      </Row>
    </div>
  );
}

AppLayout.proptypes = {
  children: proptypes.node.isRequired,
};

export default AppLayout;
